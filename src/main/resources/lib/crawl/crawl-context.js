var sitesAndPages = [];

exports.setSitesAndPages = function (value) {
    if (value !== null) {
        sitesAndPages.push(value);
    }
};

exports.getSitesAndPages = function () {
    return sitesAndPages;
};
