exports.createResponse = function createResponse(result) {
    if (!result) {
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
