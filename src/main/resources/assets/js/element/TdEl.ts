import {Element, NewElementBuilder} from '@enonic/lib-admin-ui/dom/Element';

export class TdEl
    extends Element {

    constructor(className?: string, prefix?: string) {
        super(new NewElementBuilder().setTagName('td').setClassName(className, prefix));
    }
}
