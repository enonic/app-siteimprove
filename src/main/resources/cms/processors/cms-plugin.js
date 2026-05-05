var portalLib = require('/lib/xp/portal');

exports.responseProcessor = function (req, res) {
    if (req.mode !== 'live') {
        return res;
    }

    const siteConfig = portalLib.getSiteConfig();
    if (!siteConfig) {
        return res;
    }

    const analyticsCode = siteConfig['analyticsCode'] ? siteConfig['analyticsCode'].trim() : '';
    if (analyticsCode !== '') {
        var snippet = '<!-- Siteimprove -->';
        snippet += '<script type="text/javascript">';
        snippet += '(function() {';
        snippet += 'var sz = document.createElement("script"); sz.type = "text/javascript"; sz.async = true;';
        snippet += 'sz.src = "//siteimproveanalytics.com/js/siteanalyze_' + analyticsCode + '.js";';
        snippet += 'var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(sz, s);';
        snippet += '})();';
        snippet += '</script>';
        snippet += '<!-- End Siteimprove -->';

        var bodyEnd = res.pageContributions.bodyEnd;
        if (!bodyEnd) {
            res.pageContributions.bodyEnd = [];
        } else if (typeof (bodyEnd) == 'string') {
            res.pageContributions.bodyEnd = [bodyEnd];
        }

        res.pageContributions.bodyEnd.push(snippet);
    }

    let contentId = req.params.contentId;
    if (!contentId) {
        const content = portalLib.getContent();
        if (content) {
            contentId = content._id;
        }
    }
    if (!contentId) {
        return res;
    }

    const pageIdMetaTag = '<meta name="pageID" content="' + contentId + '">';
    const headEnd = res.pageContributions.headEnd;
    if (!headEnd) {
        res.pageContributions.headEnd = [];
    } else if (typeof (headEnd) == 'string') {
        res.pageContributions.headEnd = [headEnd];
    }

    res.pageContributions.headEnd.push(pageIdMetaTag);

    return res;
};
