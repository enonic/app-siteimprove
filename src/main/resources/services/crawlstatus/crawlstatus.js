var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;

    var sitesResult = fetchCrawlStatus(siteId);

    return createResponse(sitesResult);
};

function fetchCrawlStatus(siteId) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.CrawlStatusHandler');
    bean.siteId = __.nullOrValue(siteId);
    return __.toNativeObject(bean.execute());
}
