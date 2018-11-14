import {SiteimproveFetcher} from '../resource/SiteimproveFetcher';
import {UrlHelper} from './UrlHelper';
import Path = api.rest.Path;

export interface ValidationResult {
    error?: string;
    siteId?: number;
    pageId?: number;
}

export class SiteimproveValidator {

    static validate(serverError: string, url: string, path: Path): wemQ.Promise<ValidationResult> {
        if (!api.util.StringHelper.isEmpty(serverError)) {
            return wemQ({error: serverError});
        }

        return SiteimproveFetcher.fetchSiteIdByUrl(url).then((siteId: number) => {
            if (!siteId) {
                const error = `"${url}" is not enabled for your Siteimprove account.`;
                const result: ValidationResult = {error};
                return wemQ(result);
            }

            return SiteimproveValidator.getPageId(url, path, siteId).then((pageId: number) => {
                const result: ValidationResult = {siteId, pageId};
                return result;
            });
        });
    }

    private static getPageId(url: string, path: Path, siteId: number): wemQ.Promise<number> {
        if (!path.hasParent()) {
            return wemQ(null);
        }

        const pageUrl = [UrlHelper.normalize(url), ...path.getElements().slice(1)].join('/');

        return SiteimproveFetcher.fetchPageIdByUrl(pageUrl, siteId);
    }

}
