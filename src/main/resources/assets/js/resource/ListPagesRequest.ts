import * as Q from 'q';
import {JsonResponse} from 'lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {ListPagesJson} from './json/ListPagesJson';
import {PageApi} from '../data/PageApi';

export class ListPagesRequest
    extends SiteimproveRequest<ListPagesJson, PageApi[]> {

    private siteId: number;

    constructor(siteId: number) {
        super(CONFIG.services.pagesUrl);
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId,
            page: 1,
            pageSize: 1000
        };
    }

    sendAndParse(): Q.Promise<PageApi[]> {
        return this.send().then((response: JsonResponse<ListPagesJson>) => {
            const pages = response.getResult();
            const hasPages = !!pages.items && pages.items.length > 0;
            return hasPages ? pages.items.map(pageApi => PageApi.fromJson(pageApi)) : [];
        });
    }

}
