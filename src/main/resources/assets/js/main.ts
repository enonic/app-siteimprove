import {SiteimproveWidget} from './widget/SiteimproveWidget';
import Path = api.rest.Path;

type ConfigType = {
    widgetId: string;
    errorMessage: string;
    vhost: string;
    contentPath: string
};

declare const CONFIG: ConfigType;

window['HTMLImports'].whenReady(function() {

    const widgetId = CONFIG.widgetId;
    const widgetContainer = document.getElementById(`widget-${widgetId}`);

    if (widgetContainer) {
        const container = widgetContainer.getElementsByClassName('siteimprove').item(0);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        const containerEl = api.dom.Element.fromHtmlElement((container as HTMLElement), true);

        const widget = new SiteimproveWidget({
            contentPath: Path.fromString(CONFIG.contentPath),
            vhost: CONFIG.vhost,
            errorMessage: CONFIG.errorMessage
        });
        containerEl.appendChild(widget);
        containerEl.render();
    }

});
