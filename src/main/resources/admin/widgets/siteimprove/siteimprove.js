var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var validator = require('./util/validator');

function handleGet(req) {
    var uid = req.params.uid;

    var contentId = req.params.contentId;
    if (!contentId) {
        contentId = portalLib.getContent()._id;
    }

    var content = contentLib.get({key: contentId});
    var site = contentLib.getSite({key: contentId});
    var siteConfig = contentLib.getSiteConfig({key: contentId, applicationKey: app.name});
    var pageId = (content.type.indexOf(':site') === -1 && site) ? content._path.replace(site._path, '') : '';
    var errorMessage = validator.validate(contentId);

    var view = resolve('siteimprove.html');
    var params = {
        uid: uid,
        contentId: contentId,
        contentPath: content._path,
        errorMessage: errorMessage,
        pageId: siteConfig ? pageId : -1,
        vhost: siteConfig ? siteConfig.vhost : '',
        services: {
            sitesUrl: portalLib.serviceUrl({service: 'sites'})
        }
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}
exports.get = handleGet;
