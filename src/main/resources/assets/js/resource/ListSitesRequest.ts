import {JsonResponse} from '@enonic/lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {ListSitesJson} from './json/ListSitesJson';
import {Site} from '../data/Site';

export class ListSitesRequest
    extends SiteimproveRequest<Site[]> {

    constructor() {
        super('sitesUrl');
    }

    getParams(): Object {
        return {
            page: 1,
            pageSize: 1000
        };
    }

    protected parseResponse(response: JsonResponse<ListSitesJson>): Site[] {
        const sites: ListSitesJson = response.getResult();
        const hasSites: boolean = !!sites.items && sites.items.length > 0;
        return hasSites ? sites.items.map(site => Site.fromJson(site)) : [];
    }
}
