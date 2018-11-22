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
import {Data} from '../data/Data';
import {ScoreCard} from './ScoreCard';

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
                    this.createSiteCards(dci, result.siteId);
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
        const title = new DivEl('title');
        const link = new AEl('link icon icon-new-tab');

        link.setUrl(url, '_blank');
        link.setHtml(url);
        title.appendChild(link);

        this.appendChild(title);
    }

    private createSiteCards(dci: DciOverallScore, siteId: number) {
        const totalData: Data[] = [
            {name: 'Quality Assurance', value: dci.getQA().getTotal()},
            {name: 'Accessibility', value: dci.getAccessibility().getTotal()},
            {name: 'SEO', value: dci.getSEO().getTotal()}
        ];
        const qaData: Data[] = [
            {name: 'Content', value: dci.getQA().getContent()},
            {name: 'Freshness', value: dci.getQA().getFreshness()},
            {name: 'Security', value: dci.getQA().getSecurity()},
            {name: 'UX', value: dci.getQA().getUx()}
        ];
        const a11nData: Data[] = [
            {name: 'Error pages', value: dci.getAccessibility().getErrorPages()},
            {name: 'Errors', value: dci.getAccessibility().getErrors()},
            {name: 'Warnings', value: dci.getAccessibility().getWarnings()}
        ];
        const seoData: Data[] = [
            {name: 'Content', value: dci.getSEO().getContent()},
            {name: 'Mobile', value: dci.getSEO().getMobile()},
            {name: 'Technical', value: dci.getSEO().getTechnical()},
            {name: 'UX', value: dci.getSEO().getUx()}
        ];

        const total = new ScoreCard({
            title: 'Total Score',
            score: dci.getTotal(),
            url: SiteimproveWidget.createScoreUrl(siteId, 'Dashboard'),
            data: totalData
        });
        const qa = new ScoreCard({
            title: 'QA',
            score: dci.getQA().getTotal(),
            url: SiteimproveWidget.createScoreUrl(siteId, 'QualityAssurance'),
            data: qaData
        });
        const a11n = new ScoreCard({
            title: 'Accessibility',
            score: dci.getAccessibility().getTotal(),
            url: SiteimproveWidget.createScoreUrl(siteId, 'Accessibility'),
            data: a11nData
        });
        const seo = new ScoreCard({
            title: 'SEO',
            score: dci.getSEO().getTotal(),
            url: SiteimproveWidget.createScoreUrl(siteId, 'SEOv2'),
            data: seoData
        });
        this.appendChildren<any>(total, qa, a11n, seo);
        this.addClass('site');
    }

    private createPageCards(summary: PageSummary, siteId: number, pageId: number) {
        const total = new ScoreCard({
            title: 'Total Score',
            score: summary.getSummary().getDci(),
            url: SiteimproveWidget.createPageUrl(siteId, pageId)
        });
        const lastSeen = new DataLine('Last checked', summary.getSummary().getLastSeen().toLocaleString());
        const metadata = new DivEl('metadata');

        const a11n = new DataCard({
            title: 'Accessibility',
            data: summary.getSummary().getAccessibility().toData(),
            url: summary.getSiteimproveLinks().getAccessibility()
        });
        const qa = new DataCard({
            title: 'QA',
            data: summary.getSummary().getQA().toData(),
            url: summary.getSiteimproveLinks().getQA()
        });
        const seo = new DataCard({
            title: 'SEO',
            data: summary.getSummary().getSEO().toData(),
            url: summary.getSiteimproveLinks().getSEO()
        });

        metadata.appendChildren(a11n, qa, seo);
        this.appendChildren(lastSeen, total, metadata);
        this.addClass('page');
    }

    private static createScoreUrl(siteId: number, dashboardPath: string) {
        return `${UrlHelper.SITEIMPROVE_DASHBOARD}/${dashboardPath}/${siteId}/Dci/Index`;
    }

    private static createPageUrl(siteId: number, pageId: number) {
        return `${UrlHelper.SITEIMPROVE_DASHBOARD}/QualityAssurance/Inspector/${siteId}/${pageId}/Page/Index`;
    }
}
