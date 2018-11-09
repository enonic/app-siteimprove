import DivEl = api.dom.DivEl;
import Button = api.ui.button.Button;
import SpanEl = api.dom.SpanEl;

export class ScoreCard
    extends DivEl {

    constructor(title: string, score: number) {
        super('siteimprove-score-card');

        const titleEl = new DivEl('siteimprove-score-card__title');
        titleEl.setHtml(title);

        const chartEl = new DivEl('siteimprove-score-card__chart');
        const scoreEl = new SpanEl();
        const scoreValue = score.toFixed(1).toString();
        scoreEl.setHtml(scoreValue);
        chartEl.appendChild(scoreEl);

        const overviewButton = new Button('Overview');
        overviewButton.setClass('siteimprove-score-card__overview');

        this.appendChildren(
            titleEl,
            chartEl,
            overviewButton
        );
    }
}
