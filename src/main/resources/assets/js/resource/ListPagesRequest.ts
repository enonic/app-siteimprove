import {JsonResponse} from '@enonic/lib-admin-ui/rest/JsonResponse';
import {SiteimproveRequest} from './SiteimproveRequest';
import {ListPagesJson} from './json/ListPagesJson';
import {PageApi} from '../data/PageApi';

export class ListPagesRequest
    extends SiteimproveRequest<PageApi[]> {

    constructor(siteId: number) {
        super('pagesUrl');
        this.siteId = siteId;
    }

    getParams(): Object {
        return {
            siteId: this.siteId,
            page: 1,
            pageSize: 1000
        };
    }

    protected parseResponse(response: JsonResponse<ListPagesJson>): PageApi[] {
        const pages: ListPagesJson = response.getResult();
        const hasPages: boolean = !!pages.items && pages.items.length > 0;
        return hasPages ? pages.items.map(pageApi => PageApi.fromJson(pageApi)) : [];
    }
}
