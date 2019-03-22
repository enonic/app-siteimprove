import {SiteimproveRequest} from './SiteimproveRequest';
import {CrawlStatusJson} from './json/CrawlStatusJson';
import {CrawlStatus} from '../data/CrawlStatus';
import JsonResponse = api.rest.JsonResponse;

export class CrawlStatusRequest
    extends SiteimproveRequest<CrawlStatusJson, CrawlStatus> {

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

    sendAndParse(): wemQ.Promise<CrawlStatus> {
        return this.send().then((response: JsonResponse<CrawlStatusJson>) => {
            const result = response.getResult();
            return CrawlStatus.fromJson(result);
        });
    }

}
