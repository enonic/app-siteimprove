import DivEl = api.dom.DivEl;
import LoadMask = api.ui.mask.LoadMask;
import DefaultErrorHandler = api.DefaultErrorHandler;
import Path = api.rest.Path;
import AEl = api.dom.AEl;
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
import {DetailsCard} from './DetailsCard';
import {Data} from '../data/Data';

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
                    this.createTitle(result.url);
                    this.createSiteCards(dci);
                });
            } else if (result.pageId) {
                return new PageSummaryRequest(result.siteId, result.pageId).sendAndParse().then((summary: PageSummary) => {
                    this.createTitle(result.url);
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

    private createTitle(url: string) {
        const title = new DivEl('url');
        const link = new AEl('link');

        link.setUrl(url, '_blank');
        link.setTitle(url);
        title.appendChild(link);
        link.getEl().setInnerHtml(url);

        this.appendChild(title);
    }

    private createSiteCards(dci: DciOverallScore) {
        const details = new DetailsCard('Site score details', []);

        const createDetailsToggler = (data: Data[]) => (active: boolean) => {
            if (active) {
                details.updateLines(data);
            }
            this.toggleClass('detailed', active);
        };

        const totalData: Data[] = [
            {name: 'Quality Assurance', value: dci.getQA().getTotal()},
            {name: 'Accessibility', value: dci.getAccessibility().getTotal()},
            {name: 'SEO', value: dci.getSEO().getTotal()}
        ];

        const total = new TogglableScoreCard('Total Score', dci.getTotal(), createDetailsToggler(totalData));
        const qa = new TogglableScoreCard('QA', dci.getQA().getTotal(), createDetailsToggler([]));
        const a11n = new TogglableScoreCard('Accessibility', dci.getAccessibility().getTotal(), createDetailsToggler([]));
        const seo = new TogglableScoreCard('SEO', dci.getSEO().getTotal(), createDetailsToggler([]));
        this.appendChildren<any>(total, qa, a11n, seo, details);
        this.addClass('site');
    }

    private createPageCards(summary: PageSummary, siteId: number, pageId: number) {
        const total = new LinkableScoreCard('Total Score', summary.getSummary().getDci(), SiteimproveWidget.createPageUrl(siteId, pageId));
        const lastSeen = new DataLine('Last seen', summary.getSummary().getLastSeen().toLocaleString());
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
