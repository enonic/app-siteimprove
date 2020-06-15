var siteImproveLib = require('/lib/siteimprove');

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;
    var pageId = params.pageId;

    return siteImproveLib.checkStatus(siteId, pageId);
};
