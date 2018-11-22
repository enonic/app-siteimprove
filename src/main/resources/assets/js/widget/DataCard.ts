import {TableEl} from '../element/TableEl';
import {TrEl} from '../element/TrEl';
import {TdEl} from '../element/TdEl';
import {Data} from '../data/Data';
import {Card, CardSettings} from './Card';

export interface DataCardSettings
    extends CardSettings {
    data: Data[];
}

export class DataCard
    extends Card {

    constructor(settings: DataCardSettings) {
        super(settings, 'data-card');

        const dataTableEl = DataCard.createDataTable(settings.data);

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
