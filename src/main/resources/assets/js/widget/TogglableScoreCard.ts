import {ScoreCard} from './ScoreCard';

export class TogglableScoreCard
    extends ScoreCard {

    constructor(title: string, score: number, overviewCallback: (that: TogglableScoreCard) => void) {
        super(title, score);

        this.overviewButton.setLabel('Show details');

        this.overviewButton.onClicked(() => {
            this.toggleActive();
            overviewCallback(this);
        });
    }

    private toggleActive() {
        if (this.hasClass('active')) {
            this.removeClass('active');
            this.overviewButton.setLabel('Show details');
        } else {
            this.addClass('active');
            this.overviewButton.setLabel('Hide details');
        }
    }
}
