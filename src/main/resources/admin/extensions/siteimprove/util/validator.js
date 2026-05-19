const contentLib = require('/lib/xp/content');
const contextLib = require('/lib/xp/context');
const url = require('./url');
const siteImproveLib = require('/lib/siteimprove');

function isAppConfigured() {
    const hasUsername = !!app.config['siteimprove.username'];
    const hasApiKey = !!app.config['siteimprove.apikey'];
    return hasUsername && hasApiKey;
}

function isAppHasAccess() {
    try {
        return siteImproveLib.pingAccount();
    } catch (e) {
        return false;
    }
}

function isValidVirtualHost(vhost) {
    return url.isValidUrl(vhost);
}

exports.validate = function validate(contentId, repository) {
    try {
        if (!contentId) {
            return 'No content selected.'
        }

        const inMaster = function (fn) {
            return contextLib.run({
                branch: 'master',
                repository: repository,
            }, fn);
        };

        const isSite = inMaster(function () {
            return !!contentLib.getSite({ key: contentId });
        });

        if (!isSite) {
            return 'Content is not a site.'
        }

        const siteConfig = inMaster(function () {
            return contentLib.getSiteConfig({
                key: contentId,
                applicationKey: app.name
            });
        });
        const content = inMaster(function () {
            return contentLib.get({ key: contentId });
        });
        const vhost = siteConfig ? siteConfig.vhost : null;

        if (!siteConfig) {
            return 'Siteimprove app is not added to the site.';
        } else if (!content) {
            return 'Content is not published';
        }
        if (!isAppConfigured()) {
            return 'API key and/or username are not found in the Siteimprove app config.';
        } else if (!isAppHasAccess()) {
            return 'App has no access to the Siteimprove API.';
        } else if (!vhost) {
            return 'Virtual host is not found in the Siteimprove app config.';
        } else if (!isValidVirtualHost(vhost)) {
            return 'Virtual host in the Siteimprove app config is not a valid URL (' + vhost + ').';
        }
        return '';
    } catch (error) {
        const msg = (error && error.message) ? error.message : error;
        return 'Server error: ' + (msg || 'Something went wrong.');
    }
};
