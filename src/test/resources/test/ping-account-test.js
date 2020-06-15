var t = require('/lib/xp/testing');

t.mock('/lib/http-client', {
    request: function (params) {
        return {
            "status": 200,
            "message": "",
            "body": "{\"status\":\"OK\",\"_links\":{\"self\":{\"href\":\"https://api.siteimprove.com/v2/ping/account\"}}}",
            "contentType": "application/json; charset=utf-8",
            "headers": {
                "access-control-allow-credentials": "true",
                "cache-control": "private",
                "content-length": "88",
                "content-security-policy": "default-src 'none'",
                "content-type": "application/json; charset=utf-8",
                "date": "Wed, 24 Jun 2020 19:44:45 GMT",
                "strict-transport-security": "max-age=15552001; includeSubDomains; preload",
                "vary": "Accept",
                "x-content-type-options": "nosniff",
                "x-frame-options": "DENY",
                "x-rate-limit": "50",
                "x-rate-remaining": "49",
                "x-rate-reset": "0 seconds",
                "x-xss-protection": "1, mode=block"
            },
            "cookies": []
        }
    }
});

exports.testPingAccount = function () {
    var siteImproveLib = require('/lib/siteimprove');

    var result = siteImproveLib.pingAccount();

    t.assertTrue(result);
};
