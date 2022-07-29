import {JsonResponse} from '@enonic/lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {PageSummaryJson} from './json/PageSummaryJson';
import {PageSummary} from '../data/PageSummary';

export class PageSummaryRequest
    extends SiteimproveRequest<PageSummary> {

    constructor(siteId: number, pageId: number) {
        super('pageSummaryUrl');
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
