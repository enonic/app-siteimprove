import {getDocumentData} from './util/DocumentHelper';
import {SiteimproveWidget} from './widget/SiteimproveWidget';
import Path = api.rest.Path;

const {uid} = getDocumentData();
const id = `siteimproveid_${uid}`;

// Wait until the widget container is copied from the `<link/> to the actual document
const intervalId = setInterval(() => {
    const container = document.getElementById(id);
    if (container) {
        clearInterval(intervalId);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        const containerEl = api.dom.Element.fromHtmlElement(container, true);

        const widget = new SiteimproveWidget({
            contentPath: Path.fromString(CONFIG.contentPath),
            vhost: CONFIG.vhost,
            errorMessage: CONFIG.errorMessage
        });
        containerEl.appendChild(widget);
        containerEl.render();
    }
}, 100);
