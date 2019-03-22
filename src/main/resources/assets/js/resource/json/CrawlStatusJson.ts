export interface CrawlStatusJson {
    isCrawlEnabled: boolean;
    isCrawlRunning: boolean;
    lastCrawl: string;
    nextCrawl: string;
    permission: string;
}
