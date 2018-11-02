export abstract class WebElement {

    protected element: Element;

    protected abstract createElement(): Element;

    public getElement(): Element {
        if (!this.element) {
            this.element = this.createElement();
        }
        return this.element;
    }
}
