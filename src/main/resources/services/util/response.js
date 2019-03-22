exports.createResponse = function createResponse(result) {
    var status = result ? result.status : 500;
    var badCode = status !== 200 && status !== 201 && status !== 202;
    if (badCode) {
        return {
            status: 500,
            contentType: 'application/json',
            body: 'Error reading the siteimprove request.'
        }
    }

    return {
        status: result.status,
        contentType: 'application/json',
        body: result.entity
    }
};
