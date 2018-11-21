import DivEl = api.dom.DivEl;
import AEl = api.dom.AEl;
import {AppStyleHelper} from '../util/AppStyleHelper';

export class Card
    extends DivEl {

    constructor(title: string, url: string, className?: string) {
        super(`card ${className || ''}`, AppStyleHelper.SITEIMPROVE_PREFIX);

        const titleEl = Card.createTitle(title, url);

        this.appendChildren(titleEl);
    }

    private static createTitle(title: string, url: string): DivEl {
        const titleEl = new DivEl('title');
        const linkEl = new AEl('link icon icon-new-tab');
        linkEl.setHtml(title);
        linkEl.setUrl(url, '_blank');
        titleEl.appendChild(linkEl);

        return titleEl;
    }
}
