var t = require('/lib/xp/testing');

t.mock('/lib/http-client', {
    request: function (params) {
        return {
            "status": 200,
            "message": "",
            "body": "{\"accessibility\":{\"errorpages\":0.00,\"errors\":94.24,\"total\":65.62,\"warnings\":84.11},\"qa\":{\"content\":81.08,\"freshness\":100.00,\"security\":100.00,\"total\":94.78,\"ux\":96.60},\"seo\":{\"content\":91.71,\"mobile\":76.00,\"technical\":88.68,\"total\":87.42,\"ux\":93.83},\"total\":82.60,\"_links\":{\"history\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/dci/history\"},\"self\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/dci/overview\"}}}",
            "contentType": "application/json; charset=utf-8",
            "headers": {
                "access-control-allow-credentials": "true",
                "cache-control": "private",
                "content-length": "435",
                "content-security-policy": "default-src 'none'",
                "content-type": "application/json; charset=utf-8",
                "date": "Wed, 24 Jun 2020 19:44:48 GMT",
                "strict-transport-security": "max-age=15552001; includeSubDomains; preload",
                "vary": "Accept",
                "x-content-type-options": "nosniff",
                "x-frame-options": "DENY",
                "x-rate-limit": "50",
                "x-rate-remaining": "48",
                "x-rate-reset": "0 seconds",
                "x-xss-protection": "1, mode=block"
            },
            "cookies": []
        }
    }
});

exports.testDciOverview = function () {
    var siteImproveLib = require('/lib/siteimprove');

    var result = siteImproveLib.dciOverview('siteId');

    t.assertTrue(result.body.accessibility);
    t.assertEquals(65.62, result.body.accessibility.total);

    t.assertTrue(result.body.qa);
    t.assertEquals(94.78, result.body.qa.total);

    t.assertTrue(result.body.seo);
    t.assertEquals(87.42, result.body.seo.total);

    t.assertTrue(result.body.total);
    t.assertEquals(82.6, result.body.total);
};
