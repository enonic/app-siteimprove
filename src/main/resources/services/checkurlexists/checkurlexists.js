var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var url = params.url;

    var sitesResult = fetchCheckUrlExists(url);

    return createResponse(sitesResult);
};

function fetchCheckUrlExists(url) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.CheckUrlExistsHandler');
    bean.url = __.nullOrValue(url);
    return __.toNativeObject(bean.execute());
}
