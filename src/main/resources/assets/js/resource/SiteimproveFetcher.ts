import {ListSitesRequest} from './ListSitesRequest';
import {Site} from '../data/Site';
import {ListPagesRequest} from './ListPagesRequest';
import {PageApi} from '../data/PageApi';
import {UrlHelper} from '../util/UrlHelper';

type SiteOrPageApi = Site | PageApi;

export class SiteimproveFetcher {

    static fetchSiteIdByUrl(url: string): wemQ.Promise<number | null> {
        return new ListSitesRequest().sendAndParse().then((sites: Site[]) => {
            return SiteimproveFetcher.findIdForUrl(url, sites);
        });
    }

    static fetchPageIdByUrl(url: string, siteId: number): wemQ.Promise<number> {
        return new ListPagesRequest(siteId).sendAndParse().then((pages: PageApi[]) => {
            return SiteimproveFetcher.findIdForUrl(url, pages);
        });
    }

    private static findIdForUrl(url: string, data: SiteOrPageApi[]) {
        let id = null;

        data.some((el: SiteOrPageApi) => {
            if (UrlHelper.urlsAreEquals(el.getUrl(), url)) {
                id = el.getId();
                return true;
            }
            return false;
        });

        return id;
    }
}
