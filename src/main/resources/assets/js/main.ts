import {getDocumentData} from './util/DocumentHelper';
import {createSiteimproveWidget} from './widget/SiteimproveWidget';

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
        container.appendChild(createSiteimproveWidget());
    }
}, 100);
