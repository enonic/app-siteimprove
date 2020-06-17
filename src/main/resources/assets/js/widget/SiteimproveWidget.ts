import * as Q from 'q';
import {StringHelper} from 'lib-admin-ui/util/StringHelper';
import {DefaultErrorHandler} from 'lib-admin-ui/DefaultErrorHandler';
import {Path} from 'lib-admin-ui/rest/Path';
import {DivEl} from 'lib-admin-ui/dom/DivEl';
import {LoadMask} from 'lib-admin-ui/ui/mask/LoadMask';
import {WidgetError} from './WidgetError';
import {DciOverallScore} from '../data/DciOverallScore';
import {AppStyleHelper} from '../util/AppStyleHelper';
import {SiteimproveValidator, ValidationResult, ValidationType} from '../util/SiteimproveValidator';
import {UrlHelper} from '../util/UrlHelper';
import {PageSummary} from '../data/PageSummary';
import {Data} from '../data/Data';
import {SiteScoreCard} from './SiteScoreCard';
import {PageScoreCard} from './PageScoreCard';
import {CrawlStatus} from '../data/CrawlStatus';
import {SiteTitle} from './SiteTitle';
import {PageTitle} from './PageTitle';
import {CheckStatus} from '../data/CheckStatus';
import {PageReportLinks} from '../data/PageReportLinks';
import {UnindexedPageTitle} from './UnindexedPageTitle';
import {SiteimproveRequest} from '../resource/SiteimproveRequest';
import {DciOverviewRequest} from '../resource/DciOverviewRequest';
import {PageSummaryRequest} from '../resource/PageSummaryRequest';
import {CrawlStatusRequest} from '../resource/CrawlStatusRequest';
import {CheckStatusRequest} from '../resource/CheckStatusRequest';
import {PageReportLinksRequest} from '../resource/PageReportLinksRequest';
import {SiteimproveWidgetConfig} from './SiteimproveWidgetConfig';

export class SiteimproveWidget
    extends DivEl {

    private loadMask: LoadMask;

    constructor() {
        super('widget', AppStyleHelper.SITEIMPROVE_PREFIX);
        this.loadMask = new LoadMask(this);
    }

    initialize(config: SiteimproveWidgetConfig) {
        SiteimproveRequest.setConfig(config);

        this.loadMask.show();

        const {errorMessage, vhost} = config;
        const contentPath = Path.fromString(config.contentPath);

        SiteimproveValidator.validate(errorMessage, vhost, contentPath).then((result: ValidationResult) => {
            const {url, error, siteId, pageId, type} = result;

            if (type === ValidationType.ERROR || !StringHelper.isBlank(error)) {
                this.appendChild(new WidgetError(error));
                return null;
            }

            if (type === ValidationType.SITE) {
                return Q.all([
                    new DciOverviewRequest(siteId).sendAndParse(),
                    new CrawlStatusRequest(siteId).sendAndParse(),
                    new PageReportLinksRequest(siteId).sendAndParse()
            ]).spread((dci: DciOverallScore, crawlStatus: CrawlStatus, links: PageReportLinks) => {
                    this.createSiteTitle(url, siteId, crawlStatus);
                    this.createSiteCards(dci, siteId, links);
                });
            } else if (type === ValidationType.PAGE && pageId !== undefined) {
                return Q.all([
                    new CheckStatusRequest(siteId, pageId).sendAndParse(),
                    new PageSummaryRequest(siteId, pageId).sendAndParse()
                ]).spread((checkStatus: CheckStatus, summary: PageSummary) => {
                    this.createPageTitle(url, siteId, pageId, checkStatus);
                    this.createPageCards(summary, siteId, pageId);
                });
            } else if (type === ValidationType.PAGE) {
                this.createUnindexedPageTitle(url, siteId);
            }
        }).then(() => {
            this.unmask();
        }).catch(error => {
            DefaultErrorHandler.handle(error);
            this.unmask();
        });
    }

    private unmask() {
        this.loadMask.hide();
        this.loadMask.remove();
    }

    private createSiteTitle(url: string, siteId: number, crawlStatus: CrawlStatus) {
        const title = new SiteTitle(url, siteId, crawlStatus);
        this.appendChild(title);
        this.addClass('site');
    }

    private createPageTitle(url: string, siteId: number, pageId: number, checkStatus: CheckStatus) {
        const title = new PageTitle(url, siteId, pageId, checkStatus);
        this.appendChild(title);
        this.addClass('page');
    }

    private createUnindexedPageTitle(url: string, siteId: number) {
        const title = new UnindexedPageTitle(url, siteId);
        this.appendChild(title);
        this.addClass('page');
    }

    private createSiteCards(dci: DciOverallScore, siteId: number, links: PageReportLinks) {
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
            title: 'DCI',
            score: dci.getTotal(),
            url: SiteimproveWidget.createScoreUrl(siteId, 'Dci'),
            data: totalData
        }).addClass('total-score');
        const qa = new SiteScoreCard({
            title: 'QA',
            score: dci.getQA().getTotal(),
            url: links.getQA(),
            data: qaData
        });
        const a11n = new SiteScoreCard({
            title: 'Accessibility',
            score: dci.getAccessibility().getTotal(),
            url: links.getAccessibility(),
            data: a11nData
        });
        const seo = new SiteScoreCard({
            title: 'SEO',
            score: dci.getSEO().getTotal(),
            url: links.getSEO(),
            data: seoData
        });
        this.appendChildren<any>(total, qa, a11n, seo);
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
        total.toggleDetails();
    }

    private static createScoreUrl(siteId: number, dashboardPath: string) {
        return `${UrlHelper.SITEIMPROVE_DASHBOARD}/${dashboardPath}/${siteId}/Overview/Index`;
    }

    private static createPageUrl(siteId: number, pageId: number) {
        return `${UrlHelper.SITEIMPROVE_DASHBOARD}/QualityAssurance/Inspector/${siteId}/${pageId}/Page/Index`;
    }
}
