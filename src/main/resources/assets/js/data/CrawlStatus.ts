import {CrawlStatusJson} from '../resource/json/CrawlStatusJson';
import {CrawlPermissions} from './crawlstatus/CrawlPermissions';

export class CrawlStatus {

    private crawlEnabled: boolean;

    private crawlRunning: boolean;

    private lastCrawl: Date;

    private nextCrawl: Date;

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

    getLastCrawl(): Date {
        return this.lastCrawl;
    }

    getNextCrawl(): Date {
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

    lastCrawl: Date;

    nextCrawl: Date;

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

    setLastCrawl(lastCrawl: Date): CrawlStatusBuilder {
        this.lastCrawl = lastCrawl;
        return this;
    }

    setNextCrawl(nextCrawl: Date) {
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
        this.lastCrawl = new Date(json.lastCrawl);
        this.nextCrawl = new Date(json.nextCrawl);
        this.permission = CrawlPermissions.fromString(json.permission);

        return this;
    }

    build(): CrawlStatus {
        return new CrawlStatus(this);
    }
}
