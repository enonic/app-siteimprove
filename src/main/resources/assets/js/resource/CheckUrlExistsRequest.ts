import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {CheckUrlExistsJson} from './json/CheckUrlExistsJson';
import {CheckUrlExists} from '../data/CheckUrlExists';

export class CheckUrlExistsRequest
    extends SiteimproveRequest<CheckUrlExists> {

    private url: string;

    constructor(url: string) {
        super('checkUrlExistsUrl');
        this.url = url;
    }

    getParams(): Object {
        return {
            url: this.url
        };
    }

    protected parseResponse(response: JsonResponse<CheckUrlExistsJson>): CheckUrlExists {
        return CheckUrlExists.fromJson(response.getResult());
    }
}
