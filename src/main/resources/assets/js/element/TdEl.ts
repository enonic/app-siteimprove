import NewElementBuilder = api.dom.NewElementBuilder;

export class TdEl
    extends api.dom.Element {

    constructor(className?: string, prefix?: string) {
        super(new NewElementBuilder().setTagName('td').setClassName(className, prefix));
    }
}
