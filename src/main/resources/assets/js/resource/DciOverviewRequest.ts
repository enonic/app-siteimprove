import {SiteimproveRequest} from './SiteimproveRequest';
import {DciOverallScoreJson} from './json/DciOverallScoreJson';
import {DciOverallScore} from '../data/DciOverallScore';
import Path = api.rest.Path;
import JsonResponse = api.rest.JsonResponse;

export class DciOverviewRequest
    extends SiteimproveRequest<DciOverallScoreJson, DciOverallScore> {

    private siteId: number;

    constructor(siteId: number) {
        super(Path.fromString('dci/overview'));
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            site_id: this.siteId || 0
        };
    }

    sendAndParse(): wemQ.Promise<DciOverallScore> {
        return this.send().then((response: JsonResponse<DciOverallScoreJson>) => {
            const result = response.getResult();
            return DciOverallScore.fromJson(result);
        });
    }

}
