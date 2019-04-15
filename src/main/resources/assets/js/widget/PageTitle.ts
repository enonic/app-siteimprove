import {Title} from './Title';
import {Job} from '../data/Job';
import {CheckStatus} from '../data/CheckStatus';
import {CheckRequest} from '../resource/CheckRequest';
import DefaultErrorHandler = api.DefaultErrorHandler;
import Exception = api.Exception;

export class PageTitle
    extends Title {

    constructor(url: string, siteId: number, pageId: number, checkStatus: CheckStatus) {
        super(url);

        if (checkStatus.isCheckAllowed()) {
            this.addButton({
                activeTitle: 'Check content',
                processingTitle: 'Checking',
                processing: checkStatus.isCheckingNow(),
                clickHandler: () => new CheckRequest(siteId, pageId).sendAndParse().then((result: Job) => {
                    if (!result.isSuccess()) {
                        DefaultErrorHandler.handle(new Exception(result.getMessage()));
                    }
                    return result.isSuccess();
                })
            });
        }

        const lastSeen = checkStatus.getLastSeen();
        const validDate = lastSeen != null && !isNaN(lastSeen.getDate());
        if (validDate) {
            this.addDataLine('Last checked', checkStatus.getLastSeen().toLocaleString());
        }
    }
}
