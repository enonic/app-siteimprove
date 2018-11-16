import DivEl = api.dom.DivEl;
import Button = api.ui.button.Button;
import {AppStyleHelper} from '../util/AppStyleHelper';
import {TableEl} from '../element/TableEl';
import {TrEl} from '../element/TrEl';
import {TdEl} from '../element/TdEl';
import {Data} from '../data/Data';

export class DataCard
    extends DivEl {

    constructor(title: string, dataList: Data[], url?: string) {
        super('data-card', AppStyleHelper.SITEIMPROVE_PREFIX);

        const titleEl = new DivEl('title').setHtml(title);
        const dataTableEl = DataCard.createDataTable(dataList);

        this.appendChildren(
            titleEl,
            dataTableEl
        );

        if (url) {
            const overviewButton = new Button('Overview').setClass('overview');
            overviewButton.onClicked(() => {
                window.open(url, '_blank');
            });
            this.appendChild(overviewButton);
        }
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
