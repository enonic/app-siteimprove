var siteImproveLib = require('/lib/siteimprove');

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var page = params.page || 1;
    var pageSize = params.pageSize || 1000;

    return siteImproveLib.listSites(page, pageSize);
};
