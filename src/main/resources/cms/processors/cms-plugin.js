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
        var snippet = `<!-- Siteimprove --><script async src="https://siteimproveanalytics.com/js/siteanalyze_${analyticsCode}.js"></script><!-- End Siteimprove -->`;

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
