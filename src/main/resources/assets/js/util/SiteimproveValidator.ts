import {SiteimproveFetcher} from '../resource/SiteimproveFetcher';
import {UrlHelper} from './UrlHelper';
import Path = api.rest.Path;

export interface ValidationResult {
    error?: string;
    siteId?: number;
    pageId?: number;
    url?: string;
}

export class SiteimproveValidator {

    static validate(serverError: string, url: string, path: Path): wemQ.Promise<ValidationResult> {
        if (!api.util.StringHelper.isEmpty(serverError)) {
            return wemQ({error: serverError});
        }

        return SiteimproveFetcher.fetchSiteIdByUrl(url).then((siteId: number) => {
            let result: ValidationResult;
            if (!siteId) {
                const error = `"${url}" is not enabled for your Siteimprove account.`;
                result = {error};
                return wemQ(result);
            }

            if (path.hasParent()) {

                const pageUrl = [UrlHelper.normalize(url), ...path.getElements().slice(1)].join('/');
                const error = `Siteimprove statistics are not available for "${pageUrl}".`;

                return SiteimproveFetcher.fetchPageIdByUrl(pageUrl, siteId).then((pageId: number) => {

                    result = pageId == null ? {error} : {siteId, pageId, url: pageUrl};
                    return result;
                });
            }

            result = {siteId, url: UrlHelper.normalize(url)};
            return wemQ(result);
        });
    }
}
