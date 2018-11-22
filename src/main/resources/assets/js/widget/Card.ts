import DivEl = api.dom.DivEl;
import AEl = api.dom.AEl;
import {AppStyleHelper} from '../util/AppStyleHelper';

export interface CardSettings {
    title: string;
    url: string;
}

export class Card
    extends DivEl {

    constructor(settings: CardSettings, className?: string) {
        super(`card ${className || ''}`, AppStyleHelper.SITEIMPROVE_PREFIX);

        const titleEl = Card.createTitle(settings.title, settings.url);

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
