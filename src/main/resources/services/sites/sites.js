var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var page = params.page || 1;
    var pageSize = params.pageSize || 1000;

    var sitesResult = fetchSites(page, pageSize);

    return createResponse(sitesResult);
};

function fetchSites(page, pageSize) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.ListSitesHandler');
    bean.page = __.nullOrValue(page);
    bean.pageSize = __.nullOrValue(pageSize);
    return __.toNativeObject(bean.execute());
}
