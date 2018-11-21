import DivEl = api.dom.DivEl;
import {AppStyleHelper} from '../util/AppStyleHelper';
import {Data} from '../data/Data';
import {ProgressLine} from './ProgressLine';

type Progress = {
    color: string;
    value: number;
}

export class DetailsCard
    extends DivEl {

    private data: Data[];

    constructor(data: Data[]) {
        super('details-card', AppStyleHelper.SITEIMPROVE_PREFIX);

        this.updateLines(data);
    }


    updateLines(data: Data[]) {
        if (this.data !== data) {
            this.data = data;
            this.getChildren().slice(1).forEach(line => line.remove());
            const lines = data.map((el: Data) => new ProgressLine(el.name, el.value));
            this.appendChildren(...lines);
        }
    }


}
