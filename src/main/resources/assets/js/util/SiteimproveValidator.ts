import {SiteimproveFetcher} from '../resource/SiteimproveFetcher';
import {UrlHelper} from './UrlHelper';
import {CheckUrlExistsRequest} from '../resource/CheckUrlExistsRequest';
import {CheckUrlExists} from '../data/CheckUrlExists';
import Path = api.rest.Path;

export enum ValidationType {
    SITE,
    PAGE,
    ERROR
}

export interface ValidationResult {
    error?: string;
    siteId?: number;
    pageId?: number;
    url?: string;
    type: ValidationType;
}

type AsyncVR = wemQ.Promise<ValidationResult>;
type GenericAsyncVR<T> = wemQ.Promise<ValidationResult | T>;

export class SiteimproveValidator {

    static validate(serverError: string, url: string, path: Path): GenericAsyncVR<GenericAsyncVR<AsyncVR>> {
        if (!api.util.StringHelper.isEmpty(serverError)) {
            return wemQ({error: serverError, type: ValidationType.ERROR});
        }

        return SiteimproveFetcher.fetchSiteIdByUrl(url).then((siteId: number) => {
            if (!siteId) {
                const error = `"${url}" is not enabled for your Siteimprove account.`;
                return {error, type: ValidationType.ERROR};
            }

            if (path.hasParent()) {

                const pageUrl = [UrlHelper.normalize(url), ...path.getElements().slice(1)].join('/');
                const error = `Siteimprove statistics are not available for "${pageUrl}".`;

                return SiteimproveFetcher.fetchPageIdByUrl(pageUrl, siteId).then((pageId: number) => {
                    if (pageId == null) {
                        return new CheckUrlExistsRequest(pageUrl).sendAndParse().then((result: CheckUrlExists) => {
                            if (result.isExist()) {
                                return {siteId, url: pageUrl, type: ValidationType.PAGE};
                            } else {
                                return {error, type: ValidationType.PAGE};
                            }
                        });
                    } else {
                        return {siteId, pageId, url: pageUrl, type: ValidationType.PAGE};
                    }
                });
            }

            return {siteId, url: UrlHelper.normalize(url), type: ValidationType.SITE};
        });
    }
}
