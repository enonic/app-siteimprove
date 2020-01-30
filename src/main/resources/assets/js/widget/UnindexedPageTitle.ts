import {DefaultErrorHandler} from 'lib-admin-ui/DefaultErrorHandler';
import {Exception} from 'lib-admin-ui/Exception';
import {Title} from './Title';
import {Job} from '../data/Job';
import {CheckByUrlRequest} from '../resource/CheckByUrlRequest';

export class UnindexedPageTitle
    extends Title {

    constructor(url: string, siteId: number) {
        super(url);
        const config = {
            activeTitle: 'Check content',
            processingTitle: 'Checking',
            processing: true,
            clickHandler: () => new CheckByUrlRequest(siteId, url).sendAndParse().then((result: Job) => {
                if (!result.isSuccess()) {
                    DefaultErrorHandler.handle(new Exception(result.getMessage()));
                }
                return result.isSuccess();
            })
        };
        this.addButton(config);

        config.clickHandler().catch(DefaultErrorHandler.handle);
    }
}
