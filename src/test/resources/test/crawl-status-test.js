var t = require('/lib/xp/testing');

t.mock('/lib/http-client', {
    request: function (params) {
        return {
            "status": 200,
            "message": "",
            "body": "{\"is_crawl_enabled\":true,\"is_crawl_running\":false,\"last_crawl\":\"2020-06-24 01:44:17Z\",\"next_crawl\":\"2020-06-28 22:10:00Z\",\"permission\":\"allowed\",\"_links\":{\"self\":{\"href\":\"https://api.siteimprove.com/v2/sites/7730629732/content/crawl\"}}}",
            "contentType": "application/json; charset=utf-8",
            "headers": {
                "access-control-allow-credentials": "true",
                "cache-control": "private",
                "content-length": "236",
                "content-security-policy": "default-src 'none'",
                "content-type": "application/json; charset=utf-8",
                "date": "Wed, 24 Jun 2020 19:44:48 GMT",
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

exports.testCrawlStatus = function () {
    var siteImproveLib = require('/lib/siteimprove');

    var result = siteImproveLib.crawlStatus('siteId');

    t.assertTrue(result.body.isCrawlEnabled);
    t.assertFalse(result.body.isCrawlRunning);
    t.assertEquals('2020-06-24 01:44:17Z', result.body.lastCrawl);
    t.assertEquals('2020-06-28 22:10:00Z', result.body.nextCrawl);
    t.assertEquals('allowed', result.body.permission);
};
