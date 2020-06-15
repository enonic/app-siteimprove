var cronLib = require('/lib/cron');
var siteImproveLib = require('/lib/siteimprove');
var crawlCtx = require('/lib/crawl/crawl-context');
var bean = __.newBean('com.enonic.app.siteimprove.handler.SiteImproveUrlHandler');

require('/lib/crawl/crawl').init();

function compareUrls(firstUrl, secondUrl) {
    return __.toNativeObject(bean.compareUrls(firstUrl, secondUrl));
}

function processSites(givenSites, allSites) {
    if (givenSites !== null && givenSites.length > 0) {
        var siteToCrawlIds = givenSites.map(function (siteUrl) {
            var siteId = null;

            for (var index = 0; index < allSites.length; index++) {
                if (compareUrls(siteUrl, allSites[index].url)) {
                    siteId = allSites[index].id;
                    break;
                }
            }

            return siteId !== null ? siteId : null;
        }).filter(function (el, i, a) {
            return el !== null && a.indexOf(el) === i;
        });

        siteToCrawlIds.forEach(function (siteId) {
            try {
                siteImproveLib.crawl(siteId);
            } catch (e) {
                log.error(e.message);
            }
        });
    }
}

function processPages(givenPages, allSites) {
    var pageOfSites = givenPages.map(function (pageUrl) {
        var siteId = null;

        for (var index = 0; index < allSites.length; index++) {
            if (pageUrl.indexOf(allSites[index].url) !== -1) {
                siteId = allSites[index].id;
                break;
            }
        }

        if (siteId !== null) {
            return {
                siteId: siteId,
                pageUrl: pageUrl
            };
        }

        return null;
    }).filter(function (el, i, a) {
        return el !== null && a.indexOf(el) === i;
    });

    var allPages = pageOfSites.map(function (pageOfSite) {
        var response = siteImproveLib.listPages(pageOfSite.siteId, 1, 1000);

        return response.body.items !== undefined ? response.body.items : [];
    }).filter(function (el, i, a) {
        return el !== undefined && el !== null && a.indexOf(el) === i;
    }).reduce(function (accumulator, items) {
        return accumulator.concat(items);
    }, []);

    pageOfSites.forEach(function (pageOfSite) {
        var pageId = null;

        for (var i = 0; i < allPages.length; i++) {
            if (compareUrls(pageOfSite.pageUrl, allPages[i].url)) {
                pageId = allPages[i].id;
                break;
            }
        }

        if (pageId !== null) {
            try {
                siteImproveLib.check(pageOfSite.siteId, pageId);
            } catch (e) {
                log.error(e.message);
            }
        }
    });
}

function postPublish(sites, pages) {
    var areSitesNotSpecified = sites === undefined || sites === null || sites.length === 0;
    var arePagesNotSpecified = pages === undefined || pages === null || pages.length === 0;

    if (areSitesNotSpecified && arePagesNotSpecified) {
        return true;
    }

    var listSites = siteImproveLib.listSites(1, 1000).body.items;

    var allSites = listSites !== undefined ? listSites : [];

    try {
        if (sites !== null && sites.length > 0) {
            processSites(sites, allSites);
        }

        if (pages !== null && pages.length > 0) {
            processPages(pages, allSites);
        }

        return true;
    } catch (e) {
        return false;
    }
}

cronLib.schedule({
    name: 'crawlTask',
    delay: 1000,
    fixedDelay: 10000,
    callback: function () {
        var sitesAndPages = crawlCtx.getSitesAndPages();

        if (sitesAndPages) {
            sitesAndPages.forEach(function (eventTuple, index, array) {
                postPublish(eventTuple.sites, eventTuple.pages);

                array.splice(index, 1);
            });
        }
    }
});
