import ResourceRequest = api.rest.ResourceRequest;
import Path = api.rest.Path;

export abstract class SiteimproveRequest<RAW_JSON_TYPE, PARSED_TYPE>
    extends ResourceRequest<RAW_JSON_TYPE, PARSED_TYPE> {

    private apiPath: Path;

    constructor(apiPath: Path) {
        super();
        this.setMethod('POST');
        this.apiPath = apiPath;
    }

    getRestPath(): Path {
        return Path.fromParent(super.getRestPath(), 'siteimprove')
    }

    getRequestPath(): Path {
        return Path.fromParent(this.getRestPath(), this.apiPath.toString());
    }
}
