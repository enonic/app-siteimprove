import ResourceRequest = api.rest.ResourceRequest;
import Path = api.rest.Path;

export abstract class SiteimproveRequest<RAW_JSON_TYPE, PARSED_TYPE>
    extends ResourceRequest<RAW_JSON_TYPE, PARSED_TYPE> {

    private apiPath: string;

    constructor(apiPath: string) {
        super();
        this.setMethod('POST');
        this.apiPath = apiPath;
    }

    getRequestPath(): Path {
        return Path.fromString(this.apiPath);
    }
}
