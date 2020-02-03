import {DivEl} from 'lib-admin-ui/dom/DivEl';
import {Data} from '../data/Data';
import {Details} from './Details';
import {ScoreCard, ScoreCardSettings} from './ScoreCard';

export class SiteScoreCard
    extends ScoreCard<Data> {

    constructor(settings: ScoreCardSettings<Data>) {
        super(settings, 'site-score-card');
    }

    protected createDetails(data: Data[]): DivEl {
        return new Details(data);
    }

    protected createButton() {
        this.overviewButton = ScoreCard.createOverviewButton<Data>(this);
        this.appendChild(this.overviewButton);
    }
}
