var siteImproveLib = require('/lib/siteimprove');

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;
    var url = params.url;

    return siteImproveLib.checkByUrl(siteId, url);
};
