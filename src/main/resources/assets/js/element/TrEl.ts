import {Element, NewElementBuilder} from 'lib-admin-ui/dom/Element';

export class TrEl
    extends Element {

    constructor(className?: string, prefix?: string) {
        super(new NewElementBuilder().setTagName('tr').setClassName(className, prefix));
    }
}
