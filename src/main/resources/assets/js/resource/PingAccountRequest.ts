import {SiteimproveRequest} from './SiteimproveRequest';
import Path = api.rest.Path;
import JsonResponse = api.rest.JsonResponse;

export class PingAccountRequest
    extends SiteimproveRequest {

    constructor() {
        super(Path.fromString('ping/account'));
    }

    getParams(): Object {
        return {};
    }

    sendAndParse(): wemQ.Promise<any> {

        return this.send().then((response: JsonResponse<any>) => {
            return response;
        });
    }

}
