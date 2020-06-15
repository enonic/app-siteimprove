var t = require('/lib/xp/testing');

t.mock('/lib/http-client', {
    request: function (params) {
        return {
            "status": 200,
            "message": "",
            "body": "{\"id\":32806466916,\"title\":\"Flexible and predictable pricing model - Enonic\",\"url\":\"https://enonic.com/pricing\",\"check_allowed\":true,\"check_paused\":false,\"checking_now\":false,\"first_seen\":\"2019-08-02 23:31:06Z\",\"last_changed\":\"2020-06-24 01:43:02Z\",\"last_seen\":\"2020-06-23 19:42:02Z\",\"_links\":{\"self\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/content/check/page/32806466916\"}}}",
            "contentType": "application/json; charset=utf-8",
            "headers": {
                "access-control-allow-credentials": "true",
                "cache-control": "private",
                "content-length": "391",
                "content-security-policy": "default-src 'none'",
                "content-type": "application/json; charset=utf-8",
                "date": "Wed, 24 Jun 2020 21:29:29 GMT",
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

exports.testCheckStatus = function () {
    var siteImproveLib = require('/lib/siteimprove');

    var result = siteImproveLib.checkStatus(7730629732, 32806464392);

    t.assertTrue(result.body.checkAllowed);
    t.assertFalse(result.body.checkingNow);
    t.assertEquals('2020-06-23 19:42:02Z', result.body.lastSeen);
};
