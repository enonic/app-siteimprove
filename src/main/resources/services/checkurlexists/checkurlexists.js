var httpClient = require('/lib/http-client');

exports.post = function (req) {
    var params = JSON.parse(req.body) || {};
    var url = params.url;

    var response = httpClient.request({
        method: 'HEAD',
        url: url
    });

    var exists = response.status < 400 || response.status >= 500;

    return {
        status: 200,
        body: JSON.stringify({
            exist: exists
        })
    };
};
