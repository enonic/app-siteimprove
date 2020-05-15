import {Element} from 'lib-admin-ui/dom/Element';
import {Path} from 'lib-admin-ui/rest/Path';
import {SiteimproveWidget} from './widget/SiteimproveWidget';
import {WidgetError} from './widget/WidgetError';
import {SiteimproveWidgetConfig} from './widget/SiteimproveWidgetConfig';

type AppConfigType = {
    config: SiteimproveWidgetConfig
};

declare const SITEIMPROVE: AppConfigType;
const widgetId = SITEIMPROVE.config.widgetId;

(() => {

    const widgetContainer = document.getElementById(`widget-${widgetId}`);

    if (widgetContainer) {
        const container = widgetContainer.getElementsByClassName('siteimprove').item(0);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        const containerEl = Element.fromHtmlElement((container as HTMLElement), true);

        if (SITEIMPROVE.config.errorMessage) {
            const errorEl = new WidgetError(SITEIMPROVE.config.errorMessage);
            containerEl.appendChild(errorEl);
        } else {
            const widget = new SiteimproveWidget();
            containerEl.appendChild(widget);
            widget.initialize(SITEIMPROVE.config);

            widget.render();
        }
    }
})();
