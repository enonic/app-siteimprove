import {ScoreCard} from './ScoreCard';

export class LinkableScoreCard
    extends ScoreCard {

    constructor(title: string, score: number, url: string) {
        super(title, score);

        this.overviewButton.onClicked(() => {
            window.open(url, '_blank');
        });
    }
}
