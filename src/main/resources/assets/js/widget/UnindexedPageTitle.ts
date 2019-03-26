import {Title} from './Title';
import {Job} from '../data/Job';
import {CheckByUrlRequest} from '../resource/CheckByUrlRequest';
import DefaultErrorHandler = api.DefaultErrorHandler;
import Exception = api.Exception;

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
