import {SiteimproveRequest} from './SiteimproveRequest';
import {JobJson} from './json/JobJson';
import {Job} from '../data/Job';
import JsonResponse = api.rest.JsonResponse;

export class CheckByUrlRequest
    extends SiteimproveRequest<JobJson, Job> {

    private siteId: number;

    private url: string;

    constructor(siteId: number, url: string) {
        super(CONFIG.services.checkByUrlUrl);
        this.url = url;
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0,
            url: this.url || ''
        };
    }

    sendAndParse(): wemQ.Promise<Job> {
        return this.send().then((response: JsonResponse<JobJson>) => {
            const result = response.getResult();
            return Job.fromJson(result);
        });
    }

}
