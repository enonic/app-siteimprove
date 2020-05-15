import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {CheckStatusJson} from './json/CheckStatusJson';
import {CheckStatus} from '../data/CheckStatus';

export class CheckStatusRequest
    extends SiteimproveRequest<CheckStatus> {

    constructor(siteId: number, pageId: number) {
        super('checkStatusUrl');
        this.siteId = siteId;
        this.pageId = pageId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId || 0,
            pageId: this.pageId || 0
        };
    }

    protected parseResponse(response: JsonResponse<CheckStatusJson>): CheckStatus {
        return CheckStatus.fromJson(response.getResult());
    }

}
