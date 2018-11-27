var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');

exports.responseProcessor = function (req, res) {

    if (req.mode !== 'live') {
        return res;
    }

    var content = portalLib.getContent();
    var contentId = req.params.contentId;
    if (!contentId) {
        contentId = content._id;
    }
    var siteConfig = contentLib.getSiteConfig({
        key: contentId,
        applicationKey: app.name
    });

    var analyticsCode = siteConfig['analyticsCode'];

    if (!analyticsCode) {
        return res;
    }

    var snippet = '<!-- Siteimprove -->';
    snippet += '<script type="text/javascript">';
    snippet += '(function() {';
    snippet += 'var sz = document.createElement("script"); sz.type = "text/javascript"; sz.async = true;';
    snippet += 'sz.src = "//siteimproveanalytics.com/js/siteanalyze_' + analyticsCode.trim() + '.js";';
    snippet += 'var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(sz, s);';
    snippet += '})();';
    snippet += '</script>';
    snippet += '<!-- End Siteimprove -->';


    var bodyEnd = res.pageContributions.bodyEnd;
    if (!bodyEnd) {
        res.pageContributions.bodyEnd = [];
    }
    else if (typeof(bodyEnd) == 'string') {
        res.pageContributions.bodyEnd = [bodyEnd];
    }

    res.pageContributions.bodyEnd.push(snippet);

    return res;
};
