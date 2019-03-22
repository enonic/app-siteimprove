import DivEl = api.dom.DivEl;
import {ScoreCard, ScoreCardSettings} from './ScoreCard';
import {DataCard, DataCardSettings} from './DataCard';

export class PageScoreCard
    extends ScoreCard<DataCardSettings> {

    constructor(settings: ScoreCardSettings<DataCardSettings>) {
        super(settings, 'page-score-card');
    }

    protected createDetails(data: DataCardSettings[]): DivEl {
        const cardWrapper = new DivEl('data-cards-wrapper');
        const cards = data.map(settings => new DataCard(settings));
        cardWrapper.appendChildren(...cards);
        return cardWrapper;
    }

    protected createButton() {
        return;
    }
}
