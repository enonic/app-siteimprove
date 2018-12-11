import {SiteimproveRequest} from './SiteimproveRequest';
import {ListSitesJson} from './json/ListSitesJson';
import {Site} from '../data/Site';
import Path = api.rest.Path;
import JsonResponse = api.rest.JsonResponse;

export class ListSitesRequest
    extends SiteimproveRequest<ListSitesJson, Site[]> {

    constructor() {
        super(Path.fromString('sites'));
    }

    getParams(): Object {
        return {
            page: 1,
            page_size: 1000
        };
    }

    sendAndParse(): wemQ.Promise<Site[]> {
        return this.send().then((response: JsonResponse<ListSitesJson>) => {
            const sites = response.getResult();
            const hasSites = !!sites.items && sites.items.length > 0;
            return hasSites ? sites.items.map(site => Site.fromJson(site)) : [];
        });
    }

    getRequestPath(): Path {
        return Path.fromString(CONFIG.services.sitesUrl);
    }
}
