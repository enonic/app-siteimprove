import {Path} from 'lib-admin-ui/rest/Path';
import {ResourceRequest} from 'lib-admin-ui/rest/ResourceRequest';
import {ServiceUrl, SiteimproveWidgetConfig} from '../widget/SiteimproveWidgetConfig';

export abstract class SiteimproveRequest<PARSED_TYPE>
    extends ResourceRequest<PARSED_TYPE> {

    static serviceUrls: ServiceUrl;

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

    static setConfig(config: SiteimproveWidgetConfig) {
        this.serviceUrls = config.services;
    }
}
