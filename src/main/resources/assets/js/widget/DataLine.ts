import DivEl = api.dom.DivEl;
import SpanEl = api.dom.SpanEl;
import {AppStyleHelper} from '../util/AppStyleHelper';

export class DataLine
    extends DivEl {

    constructor(name: string, value: string) {
        super('data-line', AppStyleHelper.SITEIMPROVE_PREFIX);

        const nameEl = new SpanEl('name').setHtml(name);
        const valueEl = new SpanEl('value').setHtml(value);

        this.appendChildren(
            nameEl,
            valueEl
        );
    }
}
