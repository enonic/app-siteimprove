const contentLib = require('/lib/xp/content');
const portalLib = require('/lib/xp/portal');

function handleGet(req) {
    let contentId = req.params.contentId;
    let content;
    let site;
    let siteConfig;
    let pageId = -1;
    let contentPath;

    if (!contentId) {
        const content = portalLib.getContent();
        if (content) {
            contentId = content._id;
        }
    }

    if (contentId) {
        content = contentLib.get({key: contentId});
        site = contentLib.getSite({key: contentId});
        contentPath = site ? content._path.slice(content._path.indexOf(site._name) - 1) : content._path;
        siteConfig = contentLib.getSiteConfig({key: contentId, applicationKey: app.name});
        if (siteConfig) {
            pageId = (content.type.indexOf(':site') === -1 && site) ? content._path.replace(site._path, '') : '';
        }
    }

    return {
        status: 200,
        contentType: 'application/json',
        body: {
            widgetId: app.name,
            contentPath,
            pageId,
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
        }
    };
}

exports.get = handleGet;
