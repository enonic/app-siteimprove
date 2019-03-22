var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;

    var sitesResult = fetchDciOverview(siteId);

    return createResponse(sitesResult);
};

function fetchDciOverview(siteId) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.DciOverviewHandler');
    bean.siteId = __.nullOrValue(siteId);
    return __.toNativeObject(bean.execute());
}
