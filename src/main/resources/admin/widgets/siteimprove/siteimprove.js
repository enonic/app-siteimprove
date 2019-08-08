var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var validator = require('./util/validator');

function handleGet(req) {

    var contentId = req.params.contentId;

    if (!contentId && portalLib.getContent()) {
        contentId = portalLib.getContent()._id;
    }

    if (!contentId) {
        return {
            contentType: 'text/html',
            body: '<widget class="error">No content selected</widget>'
        };
    }

    var content = contentLib.get({key: contentId});
    var site = contentLib.getSite({key: contentId});
    var siteConfig = contentLib.getSiteConfig({key: contentId, applicationKey: app.name});
    var pageId = (content.type.indexOf(':site') === -1 && site) ? content._path.replace(site._path, '') : '';
    var errorMessage = validator.validate(contentId);
    var contentPath = site ? content._path.slice(content._path.indexOf(site._name) - 1) : content._path;

    var view = resolve('siteimprove.html');
    var params = {
        widgetId: app.name,
        contentId: contentId,
        contentPath: contentPath,
        errorMessage: errorMessage,
        pageId: siteConfig ? pageId : -1,
        vhost: siteConfig ? siteConfig.vhost : '',
        services: {
            sitesUrl: portalLib.serviceUrl({service: 'sites'}),
            pagesUrl: portalLib.serviceUrl({service: 'pages'}),
            dciOverviewUrl: portalLib.serviceUrl({service: 'dcioverview'}),
            pageSummaryUrl: portalLib.serviceUrl({service: 'pagesummary'}),
            crawlStatusUrl: portalLib.serviceUrl({service: 'crawlstatus'}),
            crawlUrl: portalLib.serviceUrl({service: 'crawl'}),
            checkStatusUrl: portalLib.serviceUrl({service: 'checkstatus'}),
            checkUrl: portalLib.serviceUrl({service: 'check'}),
            checkByUrlUrl: portalLib.serviceUrl({service: 'checkbyurl'}),
            linksUrl: portalLib.serviceUrl({service: 'links'}),
            checkUrlExistsUrl: portalLib.serviceUrl({service: 'checkurlexists'})
        }
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}
exports.get = handleGet;
