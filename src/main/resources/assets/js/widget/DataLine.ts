import {DivEl} from '@enonic/lib-admin-ui/dom/DivEl';
import {SpanEl} from '@enonic/lib-admin-ui/dom/SpanEl';
import {StringHelper} from '@enonic/lib-admin-ui/util/StringHelper';
import {AppStyleHelper} from '../util/AppStyleHelper';

export class DataLine
    extends DivEl {

    private valueEl: SpanEl;

    constructor(name: string, value: string) {
        super('data-line', AppStyleHelper.SITEIMPROVE_PREFIX);

        const nameEl = new SpanEl('name').setHtml(name);
        this.valueEl = new SpanEl('value').setHtml(value);

        this.appendChildren(
            nameEl,
            this.valueEl
        );
    }

    update(value: string) {
        if (!StringHelper.isBlank(value)) {
            this.valueEl.setHtml(value);
        }
    }
}
