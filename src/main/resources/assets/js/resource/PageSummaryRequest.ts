import {SiteimproveRequest} from './SiteimproveRequest';
import {PageSummaryJson} from './json/PageSummaryJson';
import {PageSummary} from '../data/PageSummary';
import Path = api.rest.Path;
import JsonResponse = api.rest.JsonResponse;

export class PageSummaryRequest
    extends SiteimproveRequest<PageSummaryJson, PageSummary> {

    private siteId: number;

    private pageId: number;

    constructor(siteId: number, pageId: number) {
        super(Path.fromString('page/summary'));
        this.siteId = siteId;
        this.pageId = pageId;
    }

    getParams(): Object {
        return {
            site_id: this.siteId || 0,
            page_id: this.pageId || 0
        };
    }

    sendAndParse(): wemQ.Promise<PageSummary> {
        return this.send().then((response: JsonResponse<PageSummaryJson>) => {
            const result = response.getResult();
            return PageSummary.fromJson(result);
        });
    }

}
