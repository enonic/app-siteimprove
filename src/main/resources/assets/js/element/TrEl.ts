import NewElementBuilder = api.dom.NewElementBuilder;

export class TrEl
    extends api.dom.Element {

    constructor(className?: string, prefix?: string) {
        super(new NewElementBuilder().setTagName('tr').setClassName(className, prefix));
    }
}
