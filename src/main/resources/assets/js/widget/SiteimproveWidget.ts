import ContentId = api.content.ContentId;
import DivEl = api.dom.DivEl;
import LoadMask = api.ui.mask.LoadMask;
import DefaultErrorHandler = api.DefaultErrorHandler;
import {WidgetError} from './WidgetError';
import {ListSitesRequest} from '../resource/ListSitesRequest';
import {Site} from '../data/Site';
import * as normalizeUrl from 'normalize-url';
import {DciOverviewRequest} from '../resource/DciOverviewRequest';
import {DciOverallScore} from '../data/DciOverallScore';
import {ScoreCard} from './ScoreCard';

export type SiteimproveWidgetConfig = {
    contentId: ContentId,
    vhost: string,
    errorMessage: string,
}

export class SiteimproveWidget
    extends DivEl {

    private contentId: ContentId;

    private vhost: string;

    private siteId: number;

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

        return this.validate().then((error: string) => {
            if (!api.util.StringHelper.isBlank(error)) {
                this.appendChild(new WidgetError(error));
                return null;
            }
            return new DciOverviewRequest(this.siteId).sendAndParse().then((dci: DciOverallScore) => {
                this.createCards(dci);
            });
        }).then(() => {
            this.loadMask.hide();
        }).catch(error => {
            DefaultErrorHandler.handle(error);
            this.loadMask.hide();
        });
    }

    private validate(): wemQ.Promise<string> {
        if (this.errorMessage) {
            return wemQ(this.errorMessage);
        }

        return new ListSitesRequest().sendAndParse().then((sites: Site[]) => {
            const normalizedVhost = normalizeUrl(this.vhost);
            const siteEnabled = sites.some((site: Site) => {
                if (normalizeUrl(site.getUrl()) === normalizedVhost) {
                    this.siteId = site.getId();
                    return true;
                }
                return false;
            });
            if (!siteEnabled) {
                return `"${this.vhost}" is not enabled for your Siteimprove account.`;
            }

            return null;
        });
    }

    private createCards(dci: DciOverallScore) {
        const total = new ScoreCard('Total Score', dci.getTotal());
        const a11n = new ScoreCard('Accessibility', dci.getAccessibility().getTotal());
        const qa = new ScoreCard('QA', dci.getQA().getTotal());
        const seo = new ScoreCard('SEO', dci.getSEO().getTotal());
        this.appendChildren(total, a11n, qa, seo);
    }

}
