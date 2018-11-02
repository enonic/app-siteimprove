var contentLib = require('/lib/xp/content');

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
    return vhost.startsWith('http://') || vhost.startsWith('https://');
}

exports.validate = function validate(contentId) {
    try {
        var siteConfig = contentLib.getSiteConfig({
            key: contentId,
            applicationKey: app.name
        });
        var vhost = siteConfig ? siteConfig.vhost : null;

        if (!siteConfig) {
            return 'Siteimprove app is not added to the site.'
        } else if (!isAppConfigured()) {
            return 'API key and/or username are not found in the Siteimprove app config.';
        } else if (!isAppHasAccess()) {
            return 'App has no access to the Siteimprove API.';
        } else if (!vhost) {
            return 'Virtual host is not found in the Siteimprove app config.';
        } else if (!isValidVirtualHost(vhost)) {
            return 'Virtual host in the Siteimprove app config should start with "http://" or "https://" (' + vhost + ')';
        }
        return '';
    } catch (error) {
        var msg = (error && error.message) ? error.message : error;
        return 'Server error: ' + (msg || 'Something went wrong.');
    }
};
