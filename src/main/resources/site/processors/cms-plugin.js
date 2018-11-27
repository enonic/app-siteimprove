var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');

exports.responseProcessor = function (req, res) {
    var contentId = req.params.contentId;
    if (!contentId) {
        contentId = portalLib.getContent()._id;
    }
    var siteConfig = contentLib.getSiteConfig({
        key: contentId,
        applicationKey: app.name
    });
    var trackingID = siteConfig['vhost'] || '';

    var pageUrl = '';

    if (req.mode !== 'preview') {
        return res;
    }


    var snippet = '<!-- Siteimprove -->';
    snippet += '<script async src=\'https://cdn.siteimprove.net/cms/overlay.js\'></script>'
    snippet += '<script>'
    snippet += 'var _si = window._si || []; _si.push([\'input\', "http://enonic.com/pricing",'
    snippet += '\'01138618b01d406798ad1a985f013b8d\', function() { console.log(\'Inputted specific Domain url to Siteimprove\'); }])'
    snippet += '</script>'
    snippet += '<!-- End Siteimprove -->';

    var headEnd = res.pageContributions.headEnd;
    if (!headEnd) {
        res.pageContributions.headEnd = [];
    }
    else if (typeof(headEnd) == 'string') {
        res.pageContributions.headEnd = [headEnd];
    }

    res.pageContributions.headEnd.push(snippet);
    return res;
};
