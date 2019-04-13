var eventLib = require('/lib/xp/event');
var contentLib = require('/lib/xp/content');
var contextLib = require('/lib/xp/context');

exports.init = function () {
    try {
        eventLib.listener({
            type: 'node.pushed',
            localOnly: true,
            callback: function (event) {
                runInContext(event);
            }
        });

    } catch (e) {
        log.error(e);
    }
};

function publishContent(event) {
    var nodes = (event && event.data && event.data.nodes) ? event.data.nodes : [];

    nodes = nodes.filter(function (node) {
        return hasConfig(getSiteConfig(node));
    }).sort();
    if (nodes.length === 0) {
        return;
    }

    var result = processSiteAndPages(nodes);
    postPublish(result.sites, result.pages);
}

function runInContext(event) {

    var context = contextLib.get();
    return contextLib.run({
        repository: context.repository,
        branch: 'master',
        user: {
            login: 'su',
            userStore: 'system'
        },
        principals: ["role:system.admin"]
    }, function () {
        publishContent(event);
    });
}

function getSiteConfig(node) {
    return contentLib.getSiteConfig({
        key: node.id,
        applicationKey: app.name
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
