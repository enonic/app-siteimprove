var contentLib = require('/lib/xp/content');
var url = require('./url');

function isAppConfigured() {
    var hasUsername = !!app.config['siteimprove.username'];
    var hasApiKey = !!app.config['siteimprove.apikey'];
    return hasUsername && hasApiKey;
}

function isAppHasAccess() {
    var bean = __.newBean('com.enonic.app.siteimprove.resource.PingAccountHandler');
    return __.toNativeObject(bean.execute());
}

function isValidVirtualHost(vhost) {
    return url.isValidUrl(vhost);
}

exports.validate = function validate(contentId) {
    try {
        var isSite = !!contentLib.getSite({key: contentId});

        if (!isSite) {
            return 'Content is not a site.'
        }

        var siteConfig = contentLib.getSiteConfig({
            key: contentId,
            applicationKey: app.name
        });
        var content = contentLib.get({
            key: contentId,
            branch: 'master'
        });
        var vhost = siteConfig ? siteConfig.vhost : null;

        if (!siteConfig) {
            return 'Siteimprove app is not added to the site.';
        } else if (!content) {
            return 'Content is not published';
        } if (!isAppConfigured()) {
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
        var msg = (error && error.message) ? error.message : error;
        return 'Server error: ' + (msg || 'Something went wrong.');
    }
};
