import DivEl = api.dom.DivEl;
import LoadMask = api.ui.mask.LoadMask;
import DefaultErrorHandler = api.DefaultErrorHandler;
import Path = api.rest.Path;
import {WidgetError} from './WidgetError';
import {DciOverviewRequest} from '../resource/DciOverviewRequest';
import {DciOverallScore} from '../data/DciOverallScore';
import {ScoreCard} from './ScoreCard';
import {AppStyleHelper} from '../util/AppStyleHelper';
import {SiteimproveValidator, ValidationResult} from '../util/SiteimproveValidator';
import {UrlHelper} from '../util/UrlHelper';
import {PageSummaryRequest} from '../resource/PageSummaryRequest';
import {PageSummary} from '../data/PageSummary';

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
                    this.createSiteCards(dci, result.siteId);
                });
            } else if (result.pageId) {
                return new PageSummaryRequest(result.siteId, result.pageId).sendAndParse().then((score: PageSummary) => {
                    // this.createSiteCards(score, result.siteId);
                });
            }
        }).then(() => {
            this.loadMask.hide();
        }).catch(error => {
            DefaultErrorHandler.handle(error);
            this.loadMask.hide();
        });
    }

    private createSiteCards(dci: DciOverallScore, siteId: number) {
        const total = new ScoreCard('Total Score', dci.getTotal(), SiteimproveWidget.createScoreUrl(siteId, 'Dashboard'));
        const a11n = new ScoreCard('Accessibility', dci.getAccessibility().getTotal(),
            SiteimproveWidget.createScoreUrl(siteId, 'Accessibility'));
        const qa = new ScoreCard('QA', dci.getQA().getTotal(), SiteimproveWidget.createScoreUrl(siteId, 'QualityAssurance'));
        const seo = new ScoreCard('SEO', dci.getSEO().getTotal(), SiteimproveWidget.createScoreUrl(siteId, 'SEOv2'));
        this.appendChildren(total, a11n, qa, seo);
    }

    private createPageCards(score: /*PageSummary*/any, siteId: number, pageId: number) {
        // const total = new ScoreCard('Total Score', dci.getTotal(), SiteimproveWidget.createScoreUrl(siteId, 'Dashboard'));
        // const a11n = new ScoreCard('Accessibility', dci.getAccessibility().getTotal(), SiteimproveWidget.createScoreUrl(siteId, 'Accessibility'));
        // const qa = new ScoreCard('QA', dci.getQA().getTotal(), SiteimproveWidget.createScoreUrl(siteId, 'QualityAssurance'));
        // const seo = new ScoreCard('SEO', dci.getSEO().getTotal(), SiteimproveWidget.createScoreUrl(siteId, 'SEOv2'));
        // this.appendChildren(total, a11n, qa, seo);
    }

    private static createScoreUrl(siteId: number, dashboardPath: string) {
        return `${UrlHelper.SITEIMPROVE_DASHBOARD}/${dashboardPath}/${siteId}/Dci/Index`;
    }
}
