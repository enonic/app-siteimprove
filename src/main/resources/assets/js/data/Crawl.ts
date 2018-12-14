import {CrawlJson} from '../resource/json/CrawlJson';

export class Crawl {

    private statusCode: number;

    private success: boolean;

    private message: string;

    constructor(builder: CrawlBuilder) {
        this.statusCode = builder.statusCode;
        this.success = builder.success;
        this.message = builder.message;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    isSuccess(): boolean {
        return this.success;
    }

    getMessage(): string {
        return this.message;
    }

    clone(): Crawl {
        return this.newBuilder().build();
    }

    newBuilder(): CrawlBuilder {
        return new CrawlBuilder(this);
    }

    static create(): CrawlBuilder {
        return new CrawlBuilder();
    }

    static fromJson(json: CrawlJson): Crawl {
        return new CrawlBuilder().fromJson(json).build();
    }
}

export class CrawlBuilder {

    statusCode: number;

    success: boolean;

    message: string;

    constructor(pageNextCrawl?: Crawl) {
        if (pageNextCrawl) {
            if (pageNextCrawl.getStatusCode() != null) {
                this.statusCode = pageNextCrawl.getStatusCode();
            }
            if (pageNextCrawl.isSuccess() != null) {
                this.success = pageNextCrawl.isSuccess();
            }
            if (pageNextCrawl.getMessage() != null) {
                this.message = pageNextCrawl.getMessage();
            }
        }
    }

    setStatusCode(statusCode: number): CrawlBuilder {
        this.statusCode = statusCode;
        return this;
    }

    setSuccess(success: boolean): CrawlBuilder {
        this.success = success;
        return this;
    }

    setMessage(message: string): CrawlBuilder {
        this.message = message;
        return this;
    }

    fromJson(json: CrawlJson): CrawlBuilder {
        this.statusCode = json.statusCode;
        this.success = json.success;
        this.message = json.message;

        return this;
    }

    build(): Crawl {
        return new Crawl(this);
    }
}
