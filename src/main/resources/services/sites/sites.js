var createResponse = require('../util/response').createResponse;

exports.post = function (req) {
    var page = req.params.page || 1;
    var pageSize = req.params.page_size || 1000;

    var sitesResult = fetchSites(page, pageSize);

    return createResponse(sitesResult);
};

function fetchSites(page, pageSize) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.ListSitesHandler');
    bean.page = __.nullOrValue(page);
    bean.pageSize = __.nullOrValue(pageSize);
    var result = __.toNativeObject(bean.execute());
    log.info(JSON.stringify(result));
    return result;
}
