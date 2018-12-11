var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;
    var page = params.page || 1;
    var pageSize = params.pageSize || 1000;

    var sitesResult = fetchPages(siteId, page, pageSize);

    return createResponse(sitesResult);
};

function fetchPages(siteId, page, pageSize) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.ListPagesHandler');
    bean.page = __.nullOrValue(page);
    bean.pageSize = __.nullOrValue(pageSize);
    bean.siteId = __.nullOrValue(siteId);
    return __.toNativeObject(bean.execute());
}
