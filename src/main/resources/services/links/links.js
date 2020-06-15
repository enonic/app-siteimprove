var siteImproveLib = require('/lib/siteimprove');

function findRootPage(siteId) {
    var response = siteImproveLib.listPages(siteId, null, 1000);

    var items = response.body.items;

    if (items === undefined || items === null || items.length === 0) {
        return null;
    }

    var rootPage = items[0];
    for (var index = 1; index < items.length; index++) {
        if (items[index].url.length < rootPage.url.length) {
            rootPage = items[index];
        }
    }

    return rootPage;
}

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var siteId = params.siteId;

    var rootPage = findRootPage(siteId);

    if (rootPage == null) {
        return null;
    }

    return siteImproveLib.pageSummary(siteId, rootPage.id, function (response) {
        var siteImprove = JSON.parse(response.body)._siteimprove;

        var body = {};

        if (siteImprove.accessibility) {
            body.accessibility = siteImprove.accessibility.page_report.href;
        }
        if (siteImprove.quality_assurance) {
            body.qa = siteImprove.quality_assurance.page_report.href;
        }
        if (siteImprove.seo) {
            body.seo = siteImprove.seo.page_report.href;
        }

        return {
            status: response.status,
            body: body
        }
    });
};
