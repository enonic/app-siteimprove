import {SiteimproveRequest} from './SiteimproveRequest';
import {CrawlStatusJson} from './json/CrawlStatusJson';
import {CrawlStatus} from '../data/CrawlStatus';
import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';

export class CrawlStatusRequest
    extends SiteimproveRequest<CrawlStatus> {

    private siteId: number;

    constructor(siteId: number) {
        super(CONFIG.services.crawlStatusUrl);
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0
        };
    }

    protected parseResponse(response: JsonResponse<CrawlStatusJson>): CrawlStatus {
        return CrawlStatus.fromJson(response.getResult());
    }

}
