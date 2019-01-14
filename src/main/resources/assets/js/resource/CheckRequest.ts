import {SiteimproveRequest} from './SiteimproveRequest';
import {JobJson} from './json/JobJson';
import {Job} from '../data/Job';
import JsonResponse = api.rest.JsonResponse;

export class CheckRequest
    extends SiteimproveRequest<JobJson, Job> {

    private siteId: number;

    private pageId: number;

    constructor(siteId: number, pageId: number) {
        super(CONFIG.services.checkUrl);
        this.siteId = siteId;
        this.pageId = pageId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0,
            pageId: this.pageId || 0
        };
    }

    sendAndParse(): wemQ.Promise<Job> {
        return this.send().then((response: JsonResponse<JobJson>) => {
            const result = response.getResult();
            return Job.fromJson(result);
        });
    }

}
