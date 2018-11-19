import DivEl = api.dom.DivEl;
import LoadMask = api.ui.mask.LoadMask;
import DefaultErrorHandler = api.DefaultErrorHandler;
import Path = api.rest.Path;
import {WidgetError} from './WidgetError';
import {DciOverviewRequest} from '../resource/DciOverviewRequest';
import {DciOverallScore} from '../data/DciOverallScore';
import {AppStyleHelper} from '../util/AppStyleHelper';
import {SiteimproveValidator, ValidationResult} from '../util/SiteimproveValidator';
import {UrlHelper} from '../util/UrlHelper';
import {PageSummaryRequest} from '../resource/PageSummaryRequest';
import {PageSummary} from '../data/PageSummary';
import {DataLine} from './DataLine';
import {DataCard} from './DataCard';
import {LinkableScoreCard} from './LinkableScoreCard';
import {TogglableScoreCard} from './TogglableScoreCard';

export type SiteimproveWidgetConfig = {
    contentPath: Path,
    vhost: string,
    errorMessage: string,
}

export class SiteimproveWidget
    extends DivEl {

    private loadMask: LoadMask;

    constructor(config: SiteimproveWidgetConfig) {
        super('widget', AppStyleHelper.SITEIMPROVE_PREFIX);

        this.loadMask = new LoadMask(this);

        this.initialize(config);
    }

    private initialize(config: SiteimproveWidgetConfig) {
        this.loadMask.show();

        const {errorMessage, vhost, contentPath} = config;

        SiteimproveValidator.validate(errorMessage, vhost, contentPath).then((result: ValidationResult) => {
            if (!api.util.StringHelper.isBlank(result.error)) {
                this.appendChild(new WidgetError(result.error));
                return null;
            }

            if (result.siteId && !result.pageId) {
                return new DciOverviewRequest(result.siteId).sendAndParse().then((dci: DciOverallScore) => {
                    this.createSiteCards(dci);
                });
            } else if (result.pageId) {
                return new PageSummaryRequest(result.siteId, result.pageId).sendAndParse().then((summary: PageSummary) => {
                    this.createPageCards(summary, result.siteId, result.pageId);
                });
            }
        }).then(() => {
            this.loadMask.hide();
        }).catch(error => {
            DefaultErrorHandler.handle(error);
            this.loadMask.hide();
        });
    }

    private createSiteCards(dci: DciOverallScore) {
        const toggleDetails = () => {
            this.toggleClass('detailed');
        };
        const total = new TogglableScoreCard('Total Score', dci.getTotal(), toggleDetails);
        const a11n = new TogglableScoreCard('Accessibility', dci.getAccessibility().getTotal(), toggleDetails);
        const qa = new TogglableScoreCard('QA', dci.getQA().getTotal(), toggleDetails);
        const seo = new TogglableScoreCard('SEO', dci.getSEO().getTotal(), toggleDetails);
        this.appendChildren(total, a11n, qa, seo);
        this.addClass('site');
    }

    private createPageCards(summary: PageSummary, siteId: number, pageId: number) {
        const total = new LinkableScoreCard('Total Score', summary.getSummary().getDci(), SiteimproveWidget.createPageUrl(siteId, pageId));
        const lastSeen = new DataLine({name: 'Last seen', value: summary.getSummary().getLastSeen().toLocaleString()});
        const metadata = new DivEl('metadata');

        const a11n = new DataCard('Accessibility', summary.getSummary().getAccessibility().toData(),
            summary.getSiteimproveLinks().getAccessibility());
        const qa = new DataCard('QA', summary.getSummary().getQA().toData(), summary.getSiteimproveLinks().getQA());
        const seo = new DataCard('SEO', summary.getSummary().getSEO().toData(), summary.getSiteimproveLinks().getSEO());

        metadata.appendChildren(a11n, qa, seo);
        this.appendChildren(total, lastSeen, metadata);
        this.addClass('page');
    }

    private static createScoreUrl(siteId: number, dashboardPath: string) {
        return `${UrlHelper.SITEIMPROVE_DASHBOARD}/${dashboardPath}/${siteId}/Dci/Index`;
    }

    private static createPageUrl(siteId: number, pageId: number) {
        return `${UrlHelper.SITEIMPROVE_DASHBOARD}/QualityAssurance/Inspector/${siteId}/${pageId}/Page/Index`;
    }
}
