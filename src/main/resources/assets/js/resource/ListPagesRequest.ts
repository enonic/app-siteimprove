import {SiteimproveRequest} from './SiteimproveRequest';
import {ListPagesJson} from './json/ListPagesJson';
import {PageApi} from '../data/PageApi';
import Path = api.rest.Path;
import JsonResponse = api.rest.JsonResponse;

export class ListPagesRequest
    extends SiteimproveRequest<ListPagesJson, PageApi[]> {

    private siteId: number;

    constructor(siteId: number) {
        super(Path.fromString('pages'));
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            site_id: this.siteId,
            page: 1,
            page_size: 1000
        };
    }

    sendAndParse(): wemQ.Promise<PageApi[]> {
        return this.send().then((response: JsonResponse<ListPagesJson>) => {
            const pages = response.getResult();
            const hasPages = !!pages.items && pages.items.length > 0;
            return hasPages ? pages.items.map(pageApi => PageApi.fromJson(pageApi)) : [];
        });
    }

}
