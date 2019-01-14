var eventLib = require('/lib/xp/event');
var contentLib = require('/lib/xp/content');

exports.init = function () {
    try {
        eventLib.listener({
            type: 'node.pushed',
            localOnly: true,
            callback: function (event) {
                var nodes = (event && event.data && event.data.nodes) ? event.data.nodes : [];

                nodes = nodes.filter(function (node) {
                    return hasConfig(getSiteConfig(node));
                }).sort();
                var result = processSiteAndPages(nodes);
                logObject(result);
                postPublish(result.sites, result.pages);
                // fetch sites and normalize them
                // compare with normalized sites from result, filter
                // run crawl on sites
                // compare each normalized page with sites, filter
                // fetch all pages by id's and concat array
                // find pages by id and run check
            }
        });

    } catch (e) {
        log.error(e);
    }
};

function getSiteConfig(node) {
    return contentLib.getSiteConfig({
        key: node.id,
        applicationKey: 'com.enonic.app.siteimprove'
    });
}

function getSite(node) {
    return contentLib.getSite({key: node.id});
}

function getContent(node) {
    return contentLib.get({key: node.id});
}

function hasConfig(siteConfig) {
    return !!siteConfig && !!siteConfig.vhost;
}

// Assuming nodes are sorted by path
function processSiteAndPages(nodes) {
    if (nodes.length > 0) {
        var pages = [];

        var firstNode = nodes[0];
        var site = getSite(firstNode);
        var siteId = site._id;
        var sitePath = site._path;
        var siteUrl = getSiteConfig(firstNode).vhost;

        var isFirstSite = firstNode.id === siteId;
        var hasSiteData = !!(sitePath && siteUrl);

        var remainingNodes = nodes.filter(function (node) {
            var isAnotherGroup = node.path.indexOf(firstNode.path) < 0;
            var isAllPagesInGroup = !isAnotherGroup && !isFirstSite;

            if (isAllPagesInGroup && hasSiteData) {
                var pagePath = getContent(node)._path;
                if (pagePath) {
                    pages.push(pagePath.replace(sitePath, siteUrl));
                }
            }
            return isAnotherGroup;
        });

        var result = processSiteAndPages(remainingNodes) || {};

        return {
            sites: (isFirstSite ? [siteUrl] : []).concat(result.sites || []),
            pages: (isFirstSite ? [] : pages).concat(result.pages || [])
        };
    }
    return null;
}

function postPublish(sites, pages) {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.PostPublishHandler');
    bean.sites = sites || [];
    bean.pages = pages || [];
    return __.toNativeObject(bean.execute());
}

function logObject(o) {
    log.info(JSON.stringify(o));
}
