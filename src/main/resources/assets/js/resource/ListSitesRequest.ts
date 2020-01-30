import * as Q from 'q';
import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {ListSitesJson} from './json/ListSitesJson';
import {Site} from '../data/Site';

export class ListSitesRequest
    extends SiteimproveRequest<ListSitesJson, Site[]> {

    constructor() {
        super(CONFIG.services.sitesUrl);
    }

    getParams(): Object {
        return {
            page: 1,
            pageSize: 1000
        };
    }

    sendAndParse(): Q.Promise<Site[]> {
        return this.send().then((response: JsonResponse<ListSitesJson>) => {
            const sites = response.getResult();
            const hasSites = !!sites.items && sites.items.length > 0;
            return hasSites ? sites.items.map(site => Site.fromJson(site)) : [];
        });
    }

}
