const portalLib = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');
const validator = require('./util/validator');

function handleGet(req) {
    let contentId = req.params.contentId;

    if (!contentId && portalLib.getContent()) {
        contentId = portalLib.getContent()._id;
    }

    const errorMessage = validator.validate(contentId, req.params.repository);

    const serviceParams = {};
    if (contentId) {
        serviceParams.contentId = contentId;
    }
    if (req.params.repository) {
        serviceParams.repository = req.params.repository;
    }

    const view = resolve('siteimprove.html');
    const params = {
        widgetId: app.name,
        configServiceUrl: portalLib.serviceUrl({
            service: 'config',
            params: serviceParams
        }),
        hasError: errorMessage.length > 0,
        errorMessage
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}
exports.get = handleGet;
