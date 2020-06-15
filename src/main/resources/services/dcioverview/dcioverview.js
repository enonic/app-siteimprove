var siteImproveLib = require('/lib/siteimprove');

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;

    return siteImproveLib.dciOverview(siteId);
};
