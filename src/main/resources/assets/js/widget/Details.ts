import {DivEl} from '@enonic/lib-admin-ui/dom/DivEl';
import {AppStyleHelper} from '../util/AppStyleHelper';
import {Data} from '../data/Data';
import {ProgressLine} from './ProgressLine';

export class Details
    extends DivEl {

    private data: Data[];

    constructor(data: Data[]) {
        super('details', AppStyleHelper.SITEIMPROVE_PREFIX);

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
