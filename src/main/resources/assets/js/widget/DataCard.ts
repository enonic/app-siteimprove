import {TableEl} from '../element/TableEl';
import {TrEl} from '../element/TrEl';
import {TdEl} from '../element/TdEl';
import {Data} from '../data/Data';
import {Card} from './Card';

export class DataCard
    extends Card {

    constructor(title: string, dataList: Data[], url: string) {
        super(title, url, 'data-card');

        const dataTableEl = DataCard.createDataTable(dataList);

        this.appendChild(dataTableEl);
    }

    private static createDataTable(dataList: Data[]): TableEl {
        const dataTableEl = new TableEl('data-table');
        dataTableEl.getEl().setAttribute('cellspacing', '0');

        dataList.forEach((data: Data) => {
            const row = new TrEl();
            const name = new TdEl('name').setHtml(data.name);
            const value = new TdEl('value').setHtml(`${data.value}`);
            row.appendChildren(name, value);
            dataTableEl.appendChild(row);
        });

        return dataTableEl;
    }
}
