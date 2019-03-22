var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;

    var sitesResult = fetchCrawl(siteId);

    return createResponse(sitesResult);
};

function fetchCrawl(siteId) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.CrawlHandler');
    bean.siteId = __.nullOrValue(siteId);
    return __.toNativeObject(bean.execute());
}
