import {Element} from 'lib-admin-ui/dom/Element';
import {Path} from 'lib-admin-ui/rest/Path';
import {SiteimproveWidget} from './widget/SiteimproveWidget';
import {WidgetError} from './widget/WidgetError';

type ConfigType = {
    widgetId: string;
    errorMessage: string;
    vhost: string;
    contentPath: string
};

declare const CONFIG: ConfigType;
const widgetId = CONFIG.widgetId;

(() => {

    const widgetContainer = document.getElementById(`widget-${widgetId}`);

    if (widgetContainer) {
        const container = widgetContainer.getElementsByClassName('siteimprove').item(0);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        const containerEl = Element.fromHtmlElement((container as HTMLElement), true);

        if (CONFIG.errorMessage) {
            const errorEl = new WidgetError(CONFIG.errorMessage);
            containerEl.appendChild(errorEl);
        } else {
            const widget = new SiteimproveWidget();
            containerEl.appendChild(widget);
            widget.initialize({
                contentPath: Path.fromString(CONFIG.contentPath),
                vhost: CONFIG.vhost,
                errorMessage: CONFIG.errorMessage
            });

            widget.render();
        }
    }
})();
