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
import {Data} from '../data/Data';
import {SiteScoreCard} from './SiteScoreCard';
import {PageScoreCard} from './PageScoreCard';
import {CrawlStatusRequest} from '../resource/CrawlStatusRequest';
import {CrawlStatus} from '../data/CrawlStatus';
import {SiteTitle} from './SiteTitle';
import {PageTitle} from './PageTitle';
import {CheckStatus} from '../data/CheckStatus';
import {CheckStatusRequest} from '../resource/CheckStatusRequest';

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
            const {url, error, siteId, pageId} = result;

            if (!api.util.StringHelper.isBlank(error)) {
                this.appendChild(new WidgetError(error));
                return null;
            }

            if (siteId && !pageId) {
                return wemQ.all([
                    new DciOverviewRequest(siteId).sendAndParse(),
                    new CrawlStatusRequest(siteId).sendAndParse()
                ]).spread((dci: DciOverallScore, crawlStatus: CrawlStatus) => {
                    this.createSiteTitle(url, siteId, crawlStatus);
                    this.createSiteCards(dci, siteId);
                });
            } else if (pageId) {
                return wemQ.all([
                    new PageSummaryRequest(siteId, pageId).sendAndParse(),
                    new CheckStatusRequest(siteId, pageId).sendAndParse()
                ]).spread((summary: PageSummary, checkStatus: CheckStatus) => {
                    this.createPageTitle(url, siteId, pageId, checkStatus);
                    this.createPageCards(summary, siteId, pageId);
                });
            }
        }).then(() => {
            this.loadMask.hide();
        }).catch(error => {
            DefaultErrorHandler.handle(error);
            this.loadMask.hide();
        });
    }

    private createSiteTitle(url: string, siteId: number, crawlStatus: CrawlStatus) {
        const title = new SiteTitle(url, siteId, crawlStatus);
        this.appendChild(title);
    }

    private createPageTitle(url: string, siteId: number, pageId: number, checkStatus: CheckStatus) {
        const title = new PageTitle(url, siteId, pageId, checkStatus);
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

        const total = new SiteScoreCard({
            title: 'Total Score',
            score: dci.getTotal(),
            url: SiteimproveWidget.createScoreUrl(siteId, 'Dashboard'),
            data: totalData
        }).addClass('total-score');
        const qa = new SiteScoreCard({
            title: 'QA',
            score: dci.getQA().getTotal(),
            url: SiteimproveWidget.createScoreUrl(siteId, 'QualityAssurance'),
            data: qaData
        });
        const a11n = new SiteScoreCard({
            title: 'Accessibility',
            score: dci.getAccessibility().getTotal(),
            url: SiteimproveWidget.createScoreUrl(siteId, 'Accessibility'),
            data: a11nData
        });
        const seo = new SiteScoreCard({
            title: 'SEO',
            score: dci.getSEO().getTotal(),
            url: SiteimproveWidget.createScoreUrl(siteId, 'SEOv2'),
            data: seoData
        });
        this.appendChildren<any>(total, qa, a11n, seo);
        this.addClass('site');
    }

    private createPageCards(summary: PageSummary, siteId: number, pageId: number) {
        const a11nSettings = {
            title: 'Accessibility',
            data: summary.getSummary().getAccessibility().toData(),
            url: summary.getSiteimproveLinks().getAccessibility()
        };
        const qaSettings = {
            title: 'QA',
            data: summary.getSummary().getQA().toData(),
            url: summary.getSiteimproveLinks().getQA()
        };
        const seoSettings = {
            title: 'SEO',
            data: summary.getSummary().getSEO().toData(),
            url: summary.getSiteimproveLinks().getSEO()
        };

        const total = new PageScoreCard({
            title: 'Total Score',
            score: summary.getSummary().getDci(),
            url: SiteimproveWidget.createPageUrl(siteId, pageId),
            data: [qaSettings, a11nSettings, seoSettings]
        });

        this.appendChild(total);
        this.addClass('page');
        total.toggleDetails();
    }

    private static createScoreUrl(siteId: number, dashboardPath: string) {
        return `${UrlHelper.SITEIMPROVE_DASHBOARD}/${dashboardPath}/${siteId}/Dci/Index`;
    }

    private static createPageUrl(siteId: number, pageId: number) {
        return `${UrlHelper.SITEIMPROVE_DASHBOARD}/QualityAssurance/Inspector/${siteId}/${pageId}/Page/Index`;
    }
}
