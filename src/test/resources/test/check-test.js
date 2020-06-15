var t = require('/lib/xp/testing');

t.mock('/lib/http-client', {
    request: function (params) {
        return {
            "status": 202,
            "message": "",
            "body": "{\"success\":true,\"status_code\":0,\"message\":\"OK. Check ordered\"}",
            "contentType": "application/json; charset=utf-8",
            "headers": {
                "access-control-allow-credentials": "true",
                "cache-control": "private",
                "content-length": "66",
                "content-security-policy": "default-src 'none'",
                "content-type": "application/json; charset=utf-8",
                "date": "Wed, 24 Jun 2020 21:35:55 GMT",
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

exports.testCheck = function () {
    var siteImproveLib = require('/lib/siteimprove');

    var result = siteImproveLib.check(123456, 654321);

    t.assertTrue(result.body.success);
    t.assertEquals(0, result.body.statusCode);
    t.assertEquals('OK. Check ordered', result.body.message);
};
