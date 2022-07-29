import {Element, NewElementBuilder} from '@enonic/lib-admin-ui/dom/Element';

export class TableEl
    extends Element {

    constructor(className?: string, prefix?: string) {
        super(new NewElementBuilder().setTagName('table').setClassName(className, prefix));
    }
}
