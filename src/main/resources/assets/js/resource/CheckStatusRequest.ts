import * as Q from 'q';
import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {CheckStatusJson} from './json/CheckStatusJson';
import {CheckStatus} from '../data/CheckStatus';

export class CheckStatusRequest
    extends SiteimproveRequest<CheckStatusJson, CheckStatus> {

    private siteId: number;

    private pageId: number;

    constructor(siteId: number, pageId: number) {
        super(CONFIG.services.checkStatusUrl);
        this.siteId = siteId;
        this.pageId = pageId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0,
            pageId: this.pageId || 0
        };
    }

    sendAndParse(): Q.Promise<CheckStatus> {
        return this.send().then((response: JsonResponse<CheckStatusJson>) => {
            const result = response.getResult();
            return CheckStatus.fromJson(result);
        });
    }

}
