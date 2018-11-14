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

export type SiteimproveWidgetConfig = {
    contentPath: Path,
    vhost: string,
    errorMessage: string,
}

export class SiteimproveWidget
    extends DivEl {

    private loadMask: LoadMask;

    private static dashboardHost = 'https://my2.siteimprove.com/';

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
                    this.createCards(dci);
                });
            } else if (result.pageId) {
                // TODO: Render page overview
            }
        }).then(() => {
            this.loadMask.hide();
        }).catch(error => {
            DefaultErrorHandler.handle(error);
            this.loadMask.hide();
        });
    }

    private createCards(dci: DciOverallScore) {
        const total = new ScoreCard('Total Score', dci.getTotal(), this.getTotalOverviewUrl());
        const a11n = new ScoreCard('Accessibility', dci.getAccessibility().getTotal(), this.getAccessibilityOverviewUrl());
        const qa = new ScoreCard('QA', dci.getQA().getTotal(), this.getQAOverviewUrl());
        const seo = new ScoreCard('SEO', dci.getSEO().getTotal(), this.getSEOOverviewUrl());
        this.appendChildren(total, a11n, qa, seo);
    }

    private getTotalOverviewUrl() {
        return `${SiteimproveWidget.dashboardHost}/Dashboard/${this.siteId}/Dci/Index`;
    }

    private getQAOverviewUrl() {
        return `${SiteimproveWidget.dashboardHost}/QualityAssurance/${this.siteId}/Overview/Index`;
    }

    private getAccessibilityOverviewUrl() {
        return `${SiteimproveWidget.dashboardHost}/Accessibility/${this.siteId}/Overview/Index`;
    }

    private getSEOOverviewUrl() {
        return `${SiteimproveWidget.dashboardHost}/SEOv2/${this.siteId}/Overview/Index`;
    }
}
