import {SiteimproveWidget} from './widget/SiteimproveWidget';
import Path = api.rest.Path;

type ConfigType = {
    currentWidget: {
        id: string;
        errorMessage: string;
        vhost: string;
        contentPath: string;
    }
};

declare const CONFIG: ConfigType;

window['HTMLImports'].whenReady(function() {

    const widgetId = CONFIG.currentWidget.id;
    const widgetContainer = document.getElementById(`widget-${widgetId}`);

    if (widgetContainer) {
        const container = widgetContainer.getElementsByClassName('siteimprove').item(0);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        const containerEl = api.dom.Element.fromHtmlElement((container as HTMLElement), true);

        const widget = new SiteimproveWidget({
            contentPath: Path.fromString(CONFIG.currentWidget.contentPath),
            vhost: CONFIG.currentWidget.vhost,
            errorMessage: CONFIG.currentWidget.errorMessage
        });
        containerEl.appendChild(widget);
        containerEl.render();
    }

});
