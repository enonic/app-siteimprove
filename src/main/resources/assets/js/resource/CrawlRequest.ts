import {SiteimproveRequest} from './SiteimproveRequest';
import {JobJson} from './json/JobJson';
import {Job} from '../data/Job';
import JsonResponse = api.rest.JsonResponse;

export class CrawlRequest
    extends SiteimproveRequest<JobJson, Job> {

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

    sendAndParse(): wemQ.Promise<Job> {
        return this.send().then((response: JsonResponse<JobJson>) => {
            const result = response.getResult();
            return Job.fromJson(result);
        });
    }

}
