import {DivEl} from '@enonic/lib-admin-ui/dom/DivEl';

export class WidgetError
    extends DivEl {

    constructor(message: string) {
        super('error');
        this.getEl().setInnerHtml(message);
    }
}
