import {Path} from 'lib-admin-ui/rest/Path';
import {ResourceRequest} from 'lib-admin-ui/rest/ResourceRequest';

export abstract class SiteimproveRequest<PARSED_TYPE>
    extends ResourceRequest<PARSED_TYPE> {

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
