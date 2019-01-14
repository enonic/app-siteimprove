import {SiteimproveRequest} from './SiteimproveRequest';
import {PageReportLinksJson} from './json/PageReportLinksJson';
import {PageReportLinks} from '../data/PageReportLinks';
import JsonResponse = api.rest.JsonResponse;

export class PageReportLinksRequest
    extends SiteimproveRequest<PageReportLinksJson, PageReportLinks> {

    private siteId: number;

    constructor(siteId: number) {
        super(CONFIG.services.linksUrl);
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0
        };
    }

    sendAndParse(): wemQ.Promise<PageReportLinks> {
        return this.send().then((response: JsonResponse<PageReportLinksJson>) => {
            const result = response.getResult();
            return PageReportLinks.fromJson(result);
        });
    }

}
