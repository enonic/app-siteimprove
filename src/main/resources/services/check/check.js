var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;
    var pageId = params.pageId;

    var sitesResult = fetchCheck(siteId, pageId);

    return createResponse(sitesResult);
};

function fetchCheck(siteId, pageId) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.CheckHandler');
    bean.siteId = __.nullOrValue(siteId);
    bean.pageId = __.nullOrValue(pageId);
    return __.toNativeObject(bean.execute());
}
