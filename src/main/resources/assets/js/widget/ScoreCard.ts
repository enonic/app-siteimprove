import DivEl = api.dom.DivEl;
import Button = api.ui.button.Button;
import SpanEl = api.dom.SpanEl;
import {Card, CardSettings} from './Card';
import {Data} from '../data/Data';
import {Details} from './Details';

type Progress = {
    color: string;
    value: number;
}

export interface ScoreCardSettings
    extends CardSettings {
    score: number;
    data?: Data[];
}

export class ScoreCard
    extends Card {

    private static RADIUS: number = 65;

    protected overviewButton: Button;

    constructor(settings: ScoreCardSettings) {
        super(settings, 'score-card');

        const chartEl = ScoreCard.createChart(settings.score);
        this.appendChild(chartEl);

        if (settings.data) {
            const details = ScoreCard.createDetails(settings.data);
            const separator = new DivEl('separator');
            this.appendChildren(details, separator);
        }

        this.overviewButton = ScoreCard.createOverviewButton(this);
        this.appendChild(this.overviewButton);
    }

    private toggleDetails(): boolean {
        if (this.hasClass('detailed')) {
            this.removeClass('detailed');
            this.overviewButton.setLabel('Show details');
            return false;
        } else {
            this.addClass('detailed');
            this.overviewButton.setLabel('Hide details');
            return true;
        }
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
            <svg class="chart" width="140" height="140" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle r="${r}" cx="70" cy="70" fill="transparent" stroke-dasharray="${c}" stroke-dashoffset="0"></circle>
                <circle class="progress" r="${r}" cx="70" cy="70" fill="transparent" stroke-dasharray="${c}" stroke-dashoffset="0" stroke-linecap="round"></circle>
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

    private static createDetails(data: Data[]): Details {
        return new Details(data);
    }

    private static createOverviewButton(that: ScoreCard): Button {
        const overviewButton = new Button('Show details');
        overviewButton.setClass('overview');
        overviewButton.onClicked(that.toggleDetails.bind(that));

        return overviewButton;
    }
}
