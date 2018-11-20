import {ScoreCard} from './ScoreCard';

export class TogglableScoreCard
    extends ScoreCard {

    constructor(title: string, score: number, overviewCallback: (active: boolean) => void) {
        super(title, score);

        this.overviewButton.setLabel('Show details');

        this.overviewButton.onClicked(() => {
            const active = this.toggleActive();
            overviewCallback(active);
        });
    }

    private toggleActive(): boolean {
        if (this.hasClass('active')) {
            this.removeClass('active');
            this.overviewButton.setLabel('Show details');
            return false;
        } else {
            this.addClass('active');
            this.overviewButton.setLabel('Hide details');
            return true;
        }
    }
}
