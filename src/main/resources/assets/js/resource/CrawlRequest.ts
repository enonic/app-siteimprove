import {SiteimproveRequest} from './SiteimproveRequest';
import {CrawlJson} from './json/CrawlJson';
import {Crawl} from '../data/Crawl';
import JsonResponse = api.rest.JsonResponse;

export class CrawlRequest
    extends SiteimproveRequest<CrawlJson, Crawl> {

    private siteId: number;

    constructor(siteId: number) {
        super(CONFIG.services.crawlUrl);
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0
        };
    }

    sendAndParse(): wemQ.Promise<Crawl> {
        return this.send().then((response: JsonResponse<CrawlJson>) => {
            const result = response.getResult();
            return Crawl.fromJson(result);
        });
    }

}
