import {JsonResponse} from '@enonic/lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {PageReportLinksJson} from './json/PageReportLinksJson';
import {PageReportLinks} from '../data/PageReportLinks';

export class PageReportLinksRequest
    extends SiteimproveRequest<PageReportLinks> {

    constructor(siteId: number) {
        super('linksUrl');
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0
        };
    }

    protected parseResponse(response: JsonResponse<PageReportLinksJson>): PageReportLinks {
        return PageReportLinks.fromJson(response.getResult());
    }

}
