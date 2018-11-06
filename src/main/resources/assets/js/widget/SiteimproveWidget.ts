import ContentId = api.content.ContentId;
import DivEl = api.dom.DivEl;
import LoadMask = api.ui.mask.LoadMask;
import DefaultErrorHandler = api.DefaultErrorHandler;
import {WidgetError} from './WidgetError';
import {ListSitesRequest} from '../resource/ListSitesRequest';
import {Site} from '../data/Site';
import * as normalizeUrl from 'normalize-url';

export type SiteimproveWidgetConfig = {
    contentId: ContentId,
    vhost: string,
    errorMessage: string,
}

export class SiteimproveWidget
    extends DivEl {

    private contentId: ContentId;

    private vhost: string;

    private errorMessage: string;

    private loadMask: LoadMask;

    constructor(config: SiteimproveWidgetConfig) {
        super('siteimprove-widget');

        this.contentId = config.contentId;
        this.vhost = config.vhost;
        this.errorMessage = config.errorMessage;

        this.loadMask = new LoadMask(this);

        this.initialize();
    }

    private initialize() {
        this.loadMask.show();

        return this.createErrorMessage().then((error: string) => {
            if (!api.util.StringHelper.isBlank(error)) {
                this.appendChild(new WidgetError(error));
            } else {
                this.getEl().setInnerHtml('Siteimprove widget');
            }
            this.loadMask.hide();
        }).catch(error => {
            DefaultErrorHandler.handle(error);
            this.loadMask.hide();
        });
    }

    private createErrorMessage(): wemQ.Promise<string> {
        if (this.errorMessage) {
            return wemQ(this.errorMessage);
        }

        return new ListSitesRequest().sendAndParse().then((sites: Site[]) => {
            const normalizedVhost = normalizeUrl(this.vhost);
            const siteEnabled = sites.some(site => normalizeUrl(site.getUrl()) === normalizedVhost);
            if (!siteEnabled) {
                return `"${this.vhost}" is not enabled for your Siteimprove account.`;
            }

            return null;
        });
    }

}
