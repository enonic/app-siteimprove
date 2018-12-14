import {CrawlStatusJson} from '../resource/json/CrawlStatusJson';
import {CrawlPermissions} from './crawlstatus/CrawlPermissions';

export class CrawlStatus {

    private crawlEnabled: boolean;

    private crawlRunning: boolean;

    private lastCrawl: string;

    private nextCrawl: string;

    private permission: CrawlPermissions;

    constructor(builder: CrawlStatusBuilder) {
        this.crawlEnabled = builder.crawlEnabled;
        this.crawlRunning = builder.crawlRunning;
        this.lastCrawl = builder.lastCrawl;
        this.nextCrawl = builder.nextCrawl;
        this.permission = builder.permission;
    }

    isCrawlEnabled(): boolean {
        return this.crawlEnabled;
    }

    isCrawlRunning(): boolean {
        return this.crawlRunning;
    }

    getLastCrawl(): string {
        return this.lastCrawl;
    }

    getNextCrawl(): string {
        return this.nextCrawl;
    }

    getPermission(): CrawlPermissions {
        return this.permission;
    }

    clone(): CrawlStatus {
        return this.newBuilder().build();
    }

    newBuilder(): CrawlStatusBuilder {
        return new CrawlStatusBuilder(this);
    }

    static create(): CrawlStatusBuilder {
        return new CrawlStatusBuilder();
    }

    static fromJson(json: CrawlStatusJson): CrawlStatus {
        return new CrawlStatusBuilder().fromJson(json).build();
    }
}

export class CrawlStatusBuilder {

    crawlEnabled: boolean;

    crawlRunning: boolean;

    lastCrawl: string;

    nextCrawl: string;

    permission: CrawlPermissions;

    constructor(pageNextCrawl?: CrawlStatus) {
        if (pageNextCrawl) {
            if (pageNextCrawl.isCrawlEnabled() != null) {
                this.crawlEnabled = pageNextCrawl.isCrawlEnabled();
            }
            if (pageNextCrawl.isCrawlRunning() != null) {
                this.crawlRunning = pageNextCrawl.isCrawlRunning();
            }
            if (pageNextCrawl.getLastCrawl() != null) {
                this.lastCrawl = pageNextCrawl.getLastCrawl();
            }
            if (pageNextCrawl.getNextCrawl() != null) {
                this.nextCrawl = pageNextCrawl.getNextCrawl();
            }
            if (pageNextCrawl.getPermission() != null) {
                this.permission = pageNextCrawl.getPermission();
            }
        }
    }

    setCrawlEnabled(crawlEnabled: boolean): CrawlStatusBuilder {
        this.crawlEnabled = crawlEnabled;
        return this;
    }

    setCrawlRunning(crawlRunning: boolean): CrawlStatusBuilder {
        this.crawlRunning = crawlRunning;
        return this;
    }

    setLastCrawl(lastCrawl: string): CrawlStatusBuilder {
        this.lastCrawl = lastCrawl;
        return this;
    }

    setNextCrawl(nextCrawl: string) {
        this.nextCrawl = nextCrawl;
        return this;
    }

    setPermission(permission: CrawlPermissions) {
        this.permission = permission;
        return this;
    }

    fromJson(json: CrawlStatusJson): CrawlStatusBuilder {
        this.crawlEnabled = json.isCrawlEnabled;
        this.crawlRunning = json.isCrawlRunning;
        this.lastCrawl = json.lastCrawl;
        this.nextCrawl = json.nextCrawl;
        this.permission = CrawlPermissions.fromString(json.permission);

        return this;
    }

    build(): CrawlStatus {
        return new CrawlStatus(this);
    }
}
