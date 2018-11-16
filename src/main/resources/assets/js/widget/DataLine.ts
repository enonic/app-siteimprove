import DivEl = api.dom.DivEl;
import SpanEl = api.dom.SpanEl;
import {AppStyleHelper} from '../util/AppStyleHelper';
import {Data} from '../data/Data';

export class DataLine
    extends DivEl {

    constructor(data: Data) {
        super('data-line', AppStyleHelper.SITEIMPROVE_PREFIX);

        const name = new SpanEl('name').setHtml(data.name);
        const value = new SpanEl('value').setHtml(`${data.value}`);

        this.appendChildren(
            name,
            value
        );
    }
}
