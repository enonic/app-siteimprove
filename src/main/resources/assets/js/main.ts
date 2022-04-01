import {Element} from 'lib-admin-ui/dom/Element';
import {SiteimproveWidget} from './widget/SiteimproveWidget';
import {CONFIG} from 'lib-admin-ui/util/Config';

(async () => {
    const configServiceUrl = document.currentScript?.getAttribute('data-config-service-url');
    if (!configServiceUrl) {
        throw 'Unable to fetch widget config';
    }

    await CONFIG.init(`${configServiceUrl}`);
    const widgetContainer = document.getElementById(`widget-${CONFIG.getString('widgetId')}`);

    if (widgetContainer) {
        const container = widgetContainer.getElementsByClassName('siteimprove').item(0);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        const containerEl = Element.fromHtmlElement((container as HTMLElement), true);

        const widget = new SiteimproveWidget();
        containerEl.appendChild(widget);
        widget.initialize(CONFIG.getConfig());
        widget.render();
    }
})();
