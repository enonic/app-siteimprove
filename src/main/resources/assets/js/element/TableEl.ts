import NewElementBuilder = api.dom.NewElementBuilder;

export class TableEl
    extends api.dom.Element {

    constructor(className?: string, prefix?: string) {
        super(new NewElementBuilder().setTagName('table').setClassName(className, prefix));
    }
}
