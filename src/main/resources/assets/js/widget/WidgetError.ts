import DivEl = api.dom.DivEl;
import {AppStyleHelper} from '../util/AppStyleHelper';

export class WidgetError
    extends DivEl {

    constructor(message: string) {
        super('error');
        this.getEl().setInnerHtml(message);
    }
}
