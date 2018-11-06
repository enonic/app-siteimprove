import {getDocumentData} from './util/DocumentHelper';
import {SiteimproveWidget} from './widget/SiteimproveWidget';
import ContentId = api.content.ContentId;

type ConfigType = {
    errorMessage: string;
    vhost: string;
};
declare const CONFIG: ConfigType;

const {uid, contentId} = getDocumentData();
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
            contentId: new ContentId(contentId),
            vhost: CONFIG.vhost,
            errorMessage: CONFIG.errorMessage
        });
        containerEl.appendChild(widget);
        containerEl.render();

    }
}, 100);
