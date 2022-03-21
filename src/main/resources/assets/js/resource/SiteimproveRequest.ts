import {Path} from 'lib-admin-ui/rest/Path';
import {ResourceRequest} from 'lib-admin-ui/rest/ResourceRequest';
import {JSONObject, JSONValue} from 'lib-admin-ui/types';

export abstract class SiteimproveRequest<PARSED_TYPE>
    extends ResourceRequest<PARSED_TYPE> {

    static serviceUrls: JSONValue;

    private readonly apiPath: string;

    protected siteId: number;

    protected pageId: number;

    protected constructor(apiPath: string) {
        super();
        if (!SiteimproveRequest.serviceUrls || !SiteimproveRequest.serviceUrls[apiPath]) {
            throw `Service Url for '${apiPath}' not found in widget config`;
        }
        this.setMethod('POST');
        this.apiPath = SiteimproveRequest.serviceUrls[apiPath];
    }

    getRequestPath(): Path {
        return Path.fromString(this.apiPath);
    }

    static setConfig(config: JSONObject) {
        this.serviceUrls = config.services;
    }
}
