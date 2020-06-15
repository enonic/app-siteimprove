var t = require('/lib/xp/testing');

t.mock('/lib/http-client', {
    request: function (params) {
        return {
            status: 200,
            body: JSON.stringify({
                items: [
                    {
                        id: 7730629732,
                        site_name: 'Enonic AS',
                        url: 'https://enonic.com/',
                        pages: 354,
                        policies: 6,
                        product: [
                            'quality_assurance',
                            'accessibility',
                            'seo',
                            'policy'
                        ],
                        _links: {
                            site: {
                                href: 'https://api.siteimprove.com/v2/sites/7730629732'
                            }
                        }
                    }
                ]
            })
        }
    }
});

exports.testListSites = function () {
    var siteImproveLib = require('/lib/siteimprove');

    var result = siteImproveLib.listSites(1, 10);

    var items = result.body.items;

    t.assertEquals(1, items.length);
    t.assertEquals(7730629732, items[0].id);
    t.assertEquals('https://enonic.com/', items[0].url);
};
