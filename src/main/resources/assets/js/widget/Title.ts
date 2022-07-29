import * as Q from 'q';
import {StringHelper} from '@enonic/lib-admin-ui/util/StringHelper';
import {DefaultErrorHandler} from '@enonic/lib-admin-ui/DefaultErrorHandler';
import {DivEl} from '@enonic/lib-admin-ui/dom/DivEl';
import {AEl} from '@enonic/lib-admin-ui/dom/AEl';
import {Button} from '@enonic/lib-admin-ui/ui/button/Button';
import {AppStyleHelper} from '../util/AppStyleHelper';
import {DataLine} from './DataLine';

export interface TitleButtonConfig {
    activeTitle: string;
    processingTitle: string;
    processing: boolean;
    clickHandler: () => Q.Promise<boolean>;
}

export class Title
    extends DivEl {

    constructor(url: string) {
        super('title', AppStyleHelper.SITEIMPROVE_PREFIX);

        const link = new AEl('link icon-new-tab');

        link.setUrl(url, '_blank');
        link.setHtml(url);
        this.appendChild(link);
    }

    protected addButton(config: TitleButtonConfig) {
        const makeLabel = (processing: boolean) => processing ? config.processingTitle : config.activeTitle;

        const label = makeLabel(config.processing);
        const processingClass = 'processing';

        const check = new Button(label);
        check.setClass('check');
        check.toggleClass(processingClass, config.processing);
        check.onClicked(() => {
            if (!check.hasClass(processingClass)) {
                config.clickHandler().then((success: boolean) => {
                    check.toggleClass(processingClass, success);
                    check.setLabel(makeLabel(success));
                }).catch((error) => {
                    DefaultErrorHandler.handle(error);
                    check.removeClass(processingClass);
                    check.setLabel(makeLabel(false));
                });
            }
        });
        this.appendChild(check);
    }

    protected addDataLine(name: string, value: string): DataLine | null {
        if (!StringHelper.isBlank(value)) {
            const line = new DataLine(name, value);
            this.appendChild(line);
            return line;
        }
        return null;
    }
}
