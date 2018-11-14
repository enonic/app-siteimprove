import DivEl = api.dom.DivEl;
import Button = api.ui.button.Button;
import SpanEl = api.dom.SpanEl;
import {AppStyleHelper} from '../util/AppStyleHelper';

type Progress = {
    color: string;
    value: number;
}

export class ScoreCard
    extends DivEl {

    private static RADIUS: number = 55;

    constructor(title: string, score: number, url?: string) {
        super('score-card', AppStyleHelper.SITEIMPROVE_PREFIX);

        const titleEl = new DivEl('title').setHtml(title);
        const chartEl = ScoreCard.createChart(score);
        const overviewButton = new Button('Overview').setClass('overview');

        if (url) {
            overviewButton.onClicked(() => {
                window.open(url, '_blank');
            });
        }

        this.appendChildren(
            titleEl,
            chartEl,
            overviewButton
        );
    }

    private static createChart(score: number): DivEl {
        const chartEl = new DivEl('chart-wrapper');

        const scoreEl = new SpanEl('points');
        const scoreValue = score.toFixed(1).toString();
        scoreEl.setHtml(scoreValue);

        chartEl.setHtml(ScoreCard.createCircleSvg(), false);
        chartEl.appendChild(scoreEl);

        const progress = ScoreCard.percentsToProgress(score);
        const circle: SVGCircleElement = chartEl.getEl().getHTMLElement().querySelector('.progress');
        circle.style.stroke = progress.color;
        circle.style.strokeDashoffset = `${progress.value}px`;

        return chartEl;
    }

    private static createCircleSvg(): string {
        const r = ScoreCard.RADIUS;
        const c = Math.PI * (r * 2);

        return `
            <svg class="chart" width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle r="${r}" cx="60" cy="60" fill="transparent" stroke-dasharray="${c}" stroke-dashoffset="0"></circle>
                <circle class="progress" r="${r}" cx="60" cy="60" fill="transparent" stroke-dasharray="${c}" stroke-dashoffset="0" stroke-linecap="round"></circle>
            </svg>
        `;
    }

    private static percentsToProgress(percent: number): Progress {

        const hue = percent.toString(10);
        const color = `hsl(${hue}, 70%, 50%)`;

        const r = ScoreCard.RADIUS;
        const c = Math.PI * (r * 2);
        const value = ((100 - percent) / 100) * c;

        return {color, value};
    }
}
