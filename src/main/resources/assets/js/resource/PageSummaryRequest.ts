import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {PageSummaryJson} from './json/PageSummaryJson';
import {PageSummary} from '../data/PageSummary';

export class PageSummaryRequest
    extends SiteimproveRequest<PageSummary> {

    private siteId: number;

    private pageId: number;

    constructor(siteId: number, pageId: number) {
        super(CONFIG.services.pageSummaryUrl);
        this.siteId = siteId;
        this.pageId = pageId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0,
            pageId: this.pageId || 0
        };
    }

    protected parseResponse(response: JsonResponse<PageSummaryJson>): PageSummary {
        return PageSummary.fromJson(response.getResult());
    }
}
