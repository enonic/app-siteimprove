import DivEl = api.dom.DivEl;

export class WidgetError
    extends DivEl {

    constructor(message: string) {
        super('siteimprove-error');
        this.getEl().setInnerHtml(message);
    }
}
