var t = require('/lib/xp/testing');

t.mock('/lib/http-client', {
    request: function (params) {
        return {
            "status": 200,
            "message": "",
            "body": "{\"items\":[{\"id\":123456,\"title\":\"Accelerate your digital projects with the Enonic Platform\",\"url\":\"https://enonic.com/\",\"_links\":{\"details\":{\"href\":\"https://api.siteimprove.com/v2/sites/123456/content/pages/654321\"}}}],\"total_items\":1,\"total_pages\":1,\"links\":{\"self\":{\"href\":\"https://api.siteimprove.com/v2/sites/123456/content/pages?page_size=10\"}}}",
            "contentType": "application/json; charset=utf-8",
            "headers": {
                "access-control-allow-credentials": "true",
                "cache-control": "private",
                "content-length": "84359",
                "content-security-policy": "default-src 'none'",
                "content-type": "application/json; charset=utf-8",
                "date": "Wed, 24 Jun 2020 19:44:48 GMT",
                "strict-transport-security": "max-age=15552001; includeSubDomains; preload",
                "vary": "Accept",
                "x-content-type-options": "nosniff",
                "x-frame-options": "DENY",
                "x-rate-limit": "50",
                "x-rate-remaining": "47",
                "x-rate-reset": "0 seconds",
                "x-xss-protection": "1, mode=block"
            },
            "cookies": []
        }
    }
});

exports.testListPages = function () {
    var siteImproveLib = require('/lib/siteimprove');

    var result = siteImproveLib.listPages('123456', 1, 10);

    t.assertTrue(result.body.items);
    t.assertEquals(1, result.body.items.length);

    t.assertEquals(123456, result.body.items[0].id);
    t.assertEquals('Accelerate your digital projects with the Enonic Platform', result.body.items[0].title);
    t.assertEquals('https://enonic.com/', result.body.items[0].url);
    t.assertEquals('https://enonic.com/', result.body.items[0].url);
};
