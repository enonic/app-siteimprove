var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;

    var sitesResult = fetchPageReportLinks(siteId);

    return createResponse({status: 200, entity: JSON.stringify(sitesResult)});
};

function fetchPageReportLinks(siteId) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.PageReportLinksHandler');
    bean.siteId = __.nullOrValue(siteId);
    return __.toNativeObject(bean.execute());
}
