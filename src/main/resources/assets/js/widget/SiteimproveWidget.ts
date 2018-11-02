import ContentId = api.content.ContentId;
import DivEl = api.dom.DivEl;
import {WidgetError} from './WidgetError';

export type SiteimproveWidgetConfig = {
    contentId: ContentId,
    errorMessage: string
}

export class SiteimproveWidget
    extends DivEl {

    private contentId: ContentId;

    constructor(config: SiteimproveWidgetConfig) {
        super('siteimprove-widget');
        this.contentId = config.contentId;

        const {errorMessage} = config;

        if (!api.util.StringHelper.isBlank(errorMessage)) {
            this.appendChild(new WidgetError(errorMessage));
        } else {
            this.getEl().setInnerHtml('Siteimprove widget');
        }
    }
}
