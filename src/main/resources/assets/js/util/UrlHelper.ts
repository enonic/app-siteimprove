import * as normalizeUrl from 'normalize-url';

export class UrlHelper {

    static normalize(url: string): string {
        return normalizeUrl(url);
    }

    static urlsAreEquals(urlA: string, urlB: string): boolean {
        return normalizeUrl(urlA) === normalizeUrl(urlB);
    }

}
