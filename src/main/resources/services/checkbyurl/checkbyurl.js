var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;
    var url = params.url;

    var sitesResult = fetchCheckByUrl(siteId, url);

    return createResponse(sitesResult);
};

function fetchCheckByUrl(siteId, url) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.CheckByUrlHandler');
    bean.siteId = __.nullOrValue(siteId);
    bean.url = __.nullOrValue(url);
    return __.toNativeObject(bean.execute());
}
