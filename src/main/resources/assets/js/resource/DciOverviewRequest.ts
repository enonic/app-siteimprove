import * as Q from 'q';
import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {DciOverallScoreJson} from './json/DciOverallScoreJson';
import {DciOverallScore} from '../data/DciOverallScore';

export class DciOverviewRequest
    extends SiteimproveRequest<DciOverallScoreJson, DciOverallScore> {

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

    sendAndParse(): Q.Promise<DciOverallScore> {
        return this.send().then((response: JsonResponse<DciOverallScoreJson>) => {
            const result = response.getResult();
            return DciOverallScore.fromJson(result);
        });
    }

}
