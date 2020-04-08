import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {DciOverallScoreJson} from './json/DciOverallScoreJson';
import {DciOverallScore} from '../data/DciOverallScore';

export class DciOverviewRequest
    extends SiteimproveRequest<DciOverallScore> {

    private siteId: number;

    constructor(siteId: number) {
        super(CONFIG.services.dciOverviewUrl);
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0
        };
    }

    protected parseResponse(response: JsonResponse<DciOverallScoreJson>): DciOverallScore {
        return DciOverallScore.fromJson(response.getResult());
    }

}
