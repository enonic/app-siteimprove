import {DivEl} from '@enonic/lib-admin-ui/dom/DivEl';
import {SpanEl} from '@enonic/lib-admin-ui/dom/SpanEl';
import {AppStyleHelper} from '../util/AppStyleHelper';

export class ProgressLine
    extends DivEl {

    constructor(title: string, score: number) {
        super('progress-line', AppStyleHelper.SITEIMPROVE_PREFIX);

        const scoreValue = score.toFixed(1).toString();

        const headerEl = new DivEl('header');
        const titleEl = new SpanEl('title').setHtml(title);
        const scoreEl = new SpanEl('score').setHtml(scoreValue);
        headerEl.appendChildren(titleEl, scoreEl);

        const wrapperEl = new DivEl('progress-wrapper');
        const progressEl = new DivEl('progress');
        progressEl.getEl().setWidth(`${scoreValue}%`);
        progressEl.getEl().getHTMLElement().style.backgroundColor = ProgressLine.percentsToColor(score);
        wrapperEl.appendChild(progressEl);

        this.appendChildren(headerEl, wrapperEl);
    }

    private static percentsToColor(percent: number): string {
        const hue = percent.toString(10);
        return `hsl(${hue}, 70%, 50%)`;
    }
}
