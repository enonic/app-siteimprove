import * as normalizeUrl from 'normalize-url';

export class UrlHelper {

    static SITEIMPROVE_DASHBOARD: string = 'https://my2.siteimprove.com';

    static normalize(url: string): string {
        return normalizeUrl(url);
    }

    static urlsAreEquals(urlA: string, urlB: string): boolean {
        return normalizeUrl(urlA) === normalizeUrl(urlB);
    }

}
