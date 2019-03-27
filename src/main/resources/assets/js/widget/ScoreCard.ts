import DivEl = api.dom.DivEl;
import Button = api.ui.button.Button;
import SpanEl = api.dom.SpanEl;
import {Card, CardSettings} from './Card';

type Progress = {
    color: string;
    value: number;
}

export interface ScoreCardSettings<T>
    extends CardSettings {
    score: number;
    data?: T[];
}

export abstract class ScoreCard<T>
    extends Card {

    private static RADIUS: number = 65;

    protected overviewButton: Button;

    protected constructor(settings: ScoreCardSettings<T>, className?: string) {
        super(settings, `score-card ${className || ''}`);

        const chartEl = ScoreCard.createChart(settings.score);
        this.appendChild(chartEl);

        if (settings.data) {
            const details = this.createDetails(settings.data);
            const separator = new DivEl('separator');
            this.appendChildren(details, separator);
        }

        this.createButton();
    }

    public toggleDetails() {
        if (this.hasClass('detailed')) {
            this.removeClass('detailed');
        } else {
            this.addClass('detailed');

            const smoothScroll = () => this.getHTMLElement().scrollIntoView({block: 'center', behavior: 'smooth'});
            const relatives = this.getEl().getParent().getChildren();
            if (relatives[relatives.length - 1] === this.getHTMLElement()) {
                // Must wait for the animation end on the last element to do scroll correctly
                setTimeout(smoothScroll, 450);
            } else {
                setTimeout(smoothScroll, 150);
            }
        }

        if (this.overviewButton) {
            this.overviewButton.setLabel(this.hasClass('detailed') ? 'Hide details' : 'Show details');
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
        circle.style.strokeDashoffset = `${Math.PI * (ScoreCard.RADIUS * 2) - 1}px`;

        chartEl.onRendered(() => {
            circle.style.strokeDashoffset = `${progress.value}px`;
        });

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

    protected abstract createDetails(data: T[]): DivEl;
    protected abstract createButton(): void;

    protected static createOverviewButton<T>(that: ScoreCard<T>): Button {
        const overviewButton = new Button('Show details');
        overviewButton.setClass('overview');
        overviewButton.onClicked(that.toggleDetails.bind(that));

        return overviewButton;
    }
}
