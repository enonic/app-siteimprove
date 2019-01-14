var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;
    var pageId = params.pageId;

    var sitesResult = fetchCheckStatus(siteId, pageId);

    return createResponse(sitesResult);
};

function fetchCheckStatus(siteId, pageId) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.CheckStatusHandler');
    bean.siteId = __.nullOrValue(siteId);
    bean.pageId = __.nullOrValue(pageId);
    return __.toNativeObject(bean.execute());
}
