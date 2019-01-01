exports.normalizeUrl = function normalizeUrl(url) {
    var normalizedUrl = url.toLowerCase();
    var endsWithSlash = normalizedUrl.lastIndexOf('/') === (normalizedUrl.length - 1);
    return endsWithSlash ? normalizedUrl.slice(0, -1) : normalizedUrl;
};
