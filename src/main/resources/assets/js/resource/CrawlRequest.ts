import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {JobJson} from './json/JobJson';
import {Job} from '../data/Job';

export class CrawlRequest
    extends SiteimproveRequest<Job> {

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

    protected parseResponse(response: JsonResponse<JobJson>): Job {
        return Job.fromJson(response.getResult());
    }

}
