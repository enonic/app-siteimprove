import {DefaultErrorHandler} from '@enonic/lib-admin-ui/DefaultErrorHandler';
import {Exception} from '@enonic/lib-admin-ui/Exception';
import {Title} from './Title';
import {CrawlStatus} from '../data/CrawlStatus';
import {CrawlRequest} from '../resource/CrawlRequest';
import {Job} from '../data/Job';

export class SiteTitle
    extends Title {

    constructor(url: string, siteId: number, crawlStatus: CrawlStatus) {
        super(url);

        if (crawlStatus.isCrawlEnabled()) {
            this.addButton({
                activeTitle: 'Start crawling',
                processingTitle: 'Crawling',
                processing: crawlStatus.isCrawlRunning(),
                clickHandler: () => new CrawlRequest(siteId).sendAndParse().then((result: Job) => {
                    if (!result.isSuccess()) {
                        DefaultErrorHandler.handle(new Exception(result.getMessage()));
                    }
                    return result.isSuccess();
                })
            });
        }

        this.addDataLine('Last crawl', crawlStatus.getLastCrawl().toLocaleString());
        this.addDataLine('Next crawl', crawlStatus.getNextCrawl().toLocaleString());
    }
}
