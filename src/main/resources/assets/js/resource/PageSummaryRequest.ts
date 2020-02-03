import * as Q from 'q';
import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {PageSummaryJson} from './json/PageSummaryJson';
import {PageSummary} from '../data/PageSummary';

export class PageSummaryRequest
    extends SiteimproveRequest<PageSummaryJson, PageSummary> {

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

    sendAndParse(): Q.Promise<PageSummary> {
        return this.send().then((response: JsonResponse<PageSummaryJson>) => {
            const result = response.getResult();
            return PageSummary.fromJson(result);
        });
    }

}
