var t = require('/lib/xp/testing');

t.mock('/lib/http-client', {
    request: function (params) {
        return {
            "status": 200,
            "message": "",
            "body": "{\"id\":32806464392,\"title\":\"Accelerate your digital projects with the Enonic Platform\",\"url\":\"https://enonic.com/\",\"size_bytes\":67323,\"summary\":{\"accessibility\":{\"a_errors\":11,\"a_issues\":62,\"a_warnings\":51,\"aa_errors\":42,\"aa_issues\":68,\"aa_warnings\":26,\"aaa_errors\":44,\"aaa_issues\":44,\"aaa_warnings\":0},\"dci\":{\"total\":92.73},\"page\":{\"check_allowed\":true,\"check_paused\":false,\"checking_now\":false,\"first_seen\":\"2018-09-27 11:09:14Z\",\"last_changed\":\"2020-06-23 22:41:47Z\",\"last_seen\":\"2020-06-23 19:42:02Z\"},\"policy\":{\"high_priority_matching_policies\":0,\"high_priority_pending_checks\":0,\"high_priority_policies\":0,\"matching_policies\":0},\"quality_assurance\":{\"misspellings\":0,\"potential_misspellings\":11},\"seo\":{\"errors\":0,\"needs_review\":0,\"warnings\":1},\"seov2\":{\"content_issues\":5,\"technical_issues\":3,\"ux_issues\":1}},\"_links\":{\"summary\":{\"page\":{\"check\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/content/check/page/32806464392\"}},\"policy\":{\"matching_policies\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/policy/pages/32806464392/matching_policies\"}},\"quality_assurance\":{\"broken_links\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/quality_assurance/links/pages_with_broken_links/32806464392/broken_links\"},\"misspellings\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/quality_assurance/spelling/pages/32806464392/misspellings\"},\"potential_misspellings\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/quality_assurance/spelling/pages/32806464392/potential_misspellings\"},\"referring_pages\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/quality_assurance/inventory/pages/32806464392/referring_pages\"},\"words_to_review\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/quality_assurance/spelling/pages/32806464392/words_to_review\"}}},\"unpublish_impact\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/content/pages/32806464392/unpublish_impact\"},\"self\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/content/pages/32806464392\"}},\"_siteimprove\":{\"accessibility\":{\"page_report\":{\"href\":\"http://my2.siteimprove.com/Inspector/794903/Accessibility/Page?pageId=32806464392&impmd=17A329C4AA9C42B5C173C85D161E063E\"}},\"policy\":{\"page_report\":{\"href\":\"http://my2.siteimprove.com/Inspector/794903/Policy/Page?pageId=32806464392&impmd=17A329C4AA9C42B5C173C85D161E063E\"}},\"quality_assurance\":{\"page_report\":{\"href\":\"http://my2.siteimprove.com/QualityAssurance/794903/PageDetails/Report?impmd=17A329C4AA9C42B5C173C85D161E063E&PageId=32806464392\"}},\"seo\":{\"page_report\":{\"href\":\"http://my2.siteimprove.com/Inspector/794903/SeoV2/Page?pageId=32806464392&impmd=17A329C4AA9C42B5C173C85D161E063E\"}}}}",
            "contentType": "application/json; charset=utf-8",
            "headers": {
                "access-control-allow-credentials": "true",
                "cache-control": "private",
                "content-length": "2673",
                "content-security-policy": "default-src 'none'",
                "content-type": "application/json; charset=utf-8",
                "date": "Wed, 24 Jun 2020 19:44:49 GMT",
                "strict-transport-security": "max-age=15552001; includeSubDomains; preload",
                "vary": "Accept",
                "x-content-type-options": "nosniff",
                "x-frame-options": "DENY",
                "x-rate-limit": "50",
                "x-rate-remaining": "50",
                "x-rate-reset": "0 seconds",
                "x-xss-protection": "1, mode=block"
            },
            "cookies": []
        }
    }
});

exports.testPageSummary = function () {
    var siteImproveLib = require('/lib/siteimprove');

    var result = siteImproveLib.pageSummary(7730629732, 32806464392);

    t.assertEquals(32806464392, result.body.id);
    t.assertEquals('Accelerate your digital projects with the Enonic Platform', result.body.title);
    t.assertEquals('https://enonic.com/', result.body.url);
    t.assertEquals(92.73, result.body.summary.dci.total);
    t.assertEquals('2020-06-23 19:42:02Z', result.body.summary.status.lastSeen);
    t.assertEquals(11, result.body.summary.accessibility.aErrors);
    t.assertEquals(42, result.body.summary.accessibility.aaErrors);
    t.assertEquals(44, result.body.summary.accessibility.aaaErrors);
    t.assertEquals(0, result.body.summary.qa.misspellings);
    t.assertEquals(11, result.body.summary.qa.potentialMisspellings);
    t.assertEquals(5, result.body.summary.seo.contentIssues);
    t.assertEquals(3, result.body.summary.seo.technicalIssues);
    t.assertEquals(1, result.body.summary.seo.uxIssues);
    t.assertEquals(
        'http://my2.siteimprove.com/Inspector/794903/Accessibility/Page?pageId=32806464392&impmd=17A329C4AA9C42B5C173C85D161E063E',
        result.body.siteimproveLinks.accessibility.pageReport.href);
    t.assertEquals('http://my2.siteimprove.com/Inspector/794903/Policy/Page?pageId=32806464392&impmd=17A329C4AA9C42B5C173C85D161E063E',
        result.body.siteimproveLinks.policy.pageReport.href);
    t.assertEquals(
        'http://my2.siteimprove.com/QualityAssurance/794903/PageDetails/Report?impmd=17A329C4AA9C42B5C173C85D161E063E&PageId=32806464392',
        result.body.siteimproveLinks.qa.pageReport.href);
    t.assertEquals('http://my2.siteimprove.com/Inspector/794903/SeoV2/Page?pageId=32806464392&impmd=17A329C4AA9C42B5C173C85D161E063E',
        result.body.siteimproveLinks.seo.pageReport.href);
};
