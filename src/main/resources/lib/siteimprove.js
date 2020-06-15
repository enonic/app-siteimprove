var httpClientLib = require('/lib/http-client');

function resolveStatus(httpStatus) {
    return Math.floor(httpStatus / 100);
}

function is2xx(httpStatus) {
    return resolveStatus(httpStatus) === 2;
}

function is4xx(httpStatus) {
    return resolveStatus(httpStatus) === 4;
}

function sendAndReceive(method, options) {
    if (options.path === undefined || options.path === null || options.path === '') {
        throw new Error('The \"path\" parameter is not specified');
    }

    var requestParams = {
        url: 'https://api.siteimprove.com/v2/' + options.path,
        contentType: 'application/json',
        method: method,
        headers: {
            'Accept': 'application/json'
        },
        auth: {
            user: app.config['siteimprove.username'],
            password: app.config['siteimprove.apikey']
        }
    };

    if (options.params !== undefined && options.params !== null) {
        requestParams.queryParams = options.params;
    }

    return httpClientLib.request(requestParams);
}

function get(options) {
    return sendAndReceive('GET', options);
}

function post(options) {
    return sendAndReceive('POST', options);
}

function addQueryParam(parameter, value, holder) {
    if (value !== undefined && value !== null) {
        holder[parameter] = value;
    }
}

function translateBadResponse(response) {
    var httpStatus = response.status;

    if (is4xx(httpStatus)) {
        var responseAsJson = JSON.parse(response.body);
        return translateBadStatusCode(httpStatus) + (responseAsJson.message != null ? ' ' + responseAsJson.message : '');
    } else {
        return translateBadStatusCode(httpStatus);
    }
}

function translateBadStatusCode(code) {
    switch (code) {
    case 400:
        return 'Bad Request. Invalid json was sent.';
    case 401:
        return 'Authentication failed. Please check that API key and username are valid.';
    case 403:
        return 'Forbidden. You provided invalid or revoked API key or do not have read/write access.';
    case 404:
        return 'Not Found. Id used in the request was inaccurate or you do not have permission to view/edit it.';
    case 429:
        return 'Too Many Requests. You hit a rate limit for the API.';
    case 503:
        return 'Service Unavailable. The Siteimprove API is overloaded or down for maintenance.';
    default:
        return 'Something went wrong while executing Siteimprove API call.'
    }
}

function processResponse(response, successCallback) {
    try {
        if (is2xx(response.status)) {
            if (successCallback === undefined || successCallback === null) {
                return {
                    status: response.status,
                    body: JSON.parse(response.body)
                }
            } else {
                return successCallback.call(this, response);
            }
        } else {
            return {
                status: response.status,
                body: JSON.stringify({
                    message: translateBadResponse(response)
                })
            }
        }
    } catch (e) {
        return {
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
                message: 'Error reading the siteimprove request.'
            })
        }
    }
}

function PageSummaryParser() {

    this.createSummary = function (originalValue) {
        var result = {};

        if (originalValue.dci) {
            result.dci = originalValue.dci;
        }

        if (originalValue.page && originalValue.page.last_seen) {
            result.status = {
                lastSeen: originalValue.page.last_seen
            };
        }

        if (originalValue.accessibility) {
            result.accessibility = this.createAccessibility(originalValue.accessibility);
        }
        if (originalValue.quality_assurance) {
            result.qa = this.createQualityAssurance(originalValue.quality_assurance);
        }
        if (originalValue.seov2) {
            result.seo = this.createSeo(originalValue.seov2);
        }

        return result;
    };

    this.createAccessibility = function (originalValue) {
        var result = {};

        if (originalValue.a_errors !== undefined) {
            result.aErrors = originalValue.a_errors;
        }
        if (originalValue.aa_errors !== undefined) {
            result.aaErrors = originalValue.aa_errors;
        }
        if (originalValue.aaa_errors !== undefined) {
            result.aaaErrors = originalValue.aaa_errors;
        }

        return result;
    };

    this.createQualityAssurance = function (originalValue) {
        var result = {};

        if (originalValue.misspellings !== undefined) {
            result.misspellings = originalValue.misspellings;
        }
        if (originalValue.potential_misspellings !== undefined) {
            result.potentialMisspellings = originalValue.potential_misspellings;
        }

        return result;
    };

    this.createSeo = function (originalValue) {
        var result = {};

        if (originalValue.content_issues !== undefined) {
            result.contentIssues = originalValue.content_issues;
        }
        if (originalValue.technical_issues !== undefined) {
            result.technicalIssues = originalValue.technical_issues;
        }
        if (originalValue.ux_issues !== undefined) {
            result.uxIssues = originalValue.ux_issues;
        }

        return result;
    };

    this.createSiteImproveLinks = function (originalValue) {
        var result = {};

        if (originalValue.accessibility) {
            result.accessibility = this.createPageReport(originalValue.accessibility)
        }
        if (originalValue.policy) {
            result.policy = this.createPageReport(originalValue.policy)
        }
        if (originalValue.quality_assurance) {
            result.qa = this.createPageReport(originalValue.quality_assurance)
        }
        if (originalValue.seo) {
            result.seo = this.createPageReport(originalValue.seo)
        }

        return result;
    };

    this.createPageReport = function (holder) {
        return {
            pageReport: this.createHrefJson(holder.page_report)
        }
    };

    this.createHrefJson = function (holder) {
        return {
            href: holder.href
        }
    };
}

PageSummaryParser.prototype.parse = function (response) {
    var responseAsJson = JSON.parse(response.body);

    var result = {
        id: responseAsJson.id,
        title: responseAsJson.title,
        url: responseAsJson.url
    };

    if (responseAsJson.summary) {
        result.summary = this.createSummary(responseAsJson.summary);
    }

    if (responseAsJson._siteimprove) {
        result.siteimproveLinks = this.createSiteImproveLinks(responseAsJson._siteimprove);
    }

    return result;
};

function defaultCheckCallback(response) {
    var responseAsJson = JSON.parse(response.body);

    return {
        status: response.status,
        body: {
            message: responseAsJson.message,
            statusCode: responseAsJson.status_code,
            success: responseAsJson.success
        }
    }
}

exports.pingAccount = function () {
    var response = get({
        path: 'ping/account'
    });

    return is2xx(response.status);
};

exports.listSites = function (page, pageSize, callback) {
    var response = get({
        path: 'sites',
        params: {
            page: page,
            page_size: pageSize
        }
    });

    return processResponse(response, callback);
};

exports.crawl = function (siteId, callback) {
    var response = post({
        path: 'sites/' + siteId + '/content/crawl'
    });

    var successCallback = callback ? callback : defaultCheckCallback;

    return processResponse(response, successCallback);
};

exports.crawlStatus = function (siteId, callback) {
    var response = get({
        path: 'sites/' + siteId + '/content/crawl'
    });

    var successCallback = callback ? callback : function (response) {
        var responseAsJson = JSON.parse(response.body);

        return {
            status: response.status,
            body: {
                isCrawlEnabled: responseAsJson.is_crawl_enabled,
                isCrawlRunning: responseAsJson.is_crawl_running,
                lastCrawl: responseAsJson.last_crawl,
                nextCrawl: responseAsJson.next_crawl,
                permission: responseAsJson.permission
            }
        }
    };

    return processResponse(response, successCallback);
};

exports.listPages = function (siteId, page, pageSize, callback) {
    var params = {};

    addQueryParam('page', page, params);
    addQueryParam('page_size', pageSize, params);

    var response = get({
        path: 'sites/' + siteId + '/content/pages',
        params: params
    });

    return processResponse(response, callback);
};

exports.check = function (siteId, pageId, callback) {
    var response = post({
        path: 'sites/' + siteId + '/content/check/page/' + pageId
    });

    var successCallback = callback ? callback : defaultCheckCallback;

    return processResponse(response, successCallback);
};

exports.pageSummary = function (siteId, pageId, callback) {
    var response = get({
        path: 'sites/' + siteId + '/content/pages/' + pageId
    });

    var successCallback = callback ? callback : function (response) {
        return {
            status: response.status,
            body: new PageSummaryParser().parse(response)
        }
    };

    return processResponse(response, successCallback);
};


exports.checkByUrl = function (siteId, url, callback) {
    var response = post({
        path: 'sites/' + siteId + '/content/check/page',
        params: {
            url: url
        }
    });

    var successCallback = callback ? callback : defaultCheckCallback;

    return processResponse(response, successCallback);
};

exports.checkStatus = function (siteId, pageId, callback) {
    var response = get({
        path: 'sites/' + siteId + '/content/check/page/' + pageId
    });

    var successCallback = callback ? callback : function (response) {
        var responseAsJson = JSON.parse(response.body);

        return {
            status: response.status,
            body: {
                checkAllowed: responseAsJson.check_allowed,
                checkingNow: responseAsJson.checking_now,
                lastSeen: responseAsJson.last_seen
            }
        }
    };

    return processResponse(response, successCallback);
};

exports.dciOverview = function (siteId, callback) {
    var response = get({
        path: 'sites/' + siteId + '/dci/overview'
    });

    return processResponse(response, callback);
};
