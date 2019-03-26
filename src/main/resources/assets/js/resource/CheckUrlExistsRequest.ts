import {SiteimproveRequest} from './SiteimproveRequest';
import {CheckUrlExistsJson} from './json/CheckUrlExistsJson';
import {CheckUrlExists} from '../data/CheckUrlExists';
import JsonResponse = api.rest.JsonResponse;

export class CheckUrlExistsRequest
    extends SiteimproveRequest<CheckUrlExistsJson, CheckUrlExists> {

    private url: string;

    constructor(url: string) {
        super(CONFIG.services.checkUrlExistsUrl);
        this.url = url;
    }

    getParams(): Object {
        return {
            url: this.url
        };
    }

    sendAndParse(): wemQ.Promise<CheckUrlExists> {
        return this.send().then((response: JsonResponse<CheckUrlExistsJson>) => {
            const result = response.getResult();
            return CheckUrlExists.fromJson(result);
        });
    }

}
