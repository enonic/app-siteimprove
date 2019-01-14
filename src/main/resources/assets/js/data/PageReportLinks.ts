import {PageReportLinksJson} from '../resource/json/PageReportLinksJson';

export class PageReportLinks {

    private qa: string;

    private accessibility: string;

    private seo: string;

    constructor(builder: CrawlBuilder) {
        this.qa = builder.qa;
        this.accessibility = builder.accessibility;
        this.seo = builder.seo;
    }

    getQA(): string {
        return this.qa;
    }

    getAccessibility(): string {
        return this.accessibility;
    }

    getSEO(): string {
        return this.seo;
    }

    clone(): PageReportLinks {
        return this.newBuilder().build();
    }

    newBuilder(): CrawlBuilder {
        return new CrawlBuilder(this);
    }

    static create(): CrawlBuilder {
        return new CrawlBuilder();
    }

    static fromJson(json: PageReportLinksJson): PageReportLinks {
        return new CrawlBuilder().fromJson(json).build();
    }
}

export class CrawlBuilder {

    qa: string;

    accessibility: string;

    seo: string;

    constructor(pageNextCrawl?: PageReportLinks) {
        if (pageNextCrawl) {
            if (pageNextCrawl.getQA() != null) {
                this.qa = pageNextCrawl.getQA();
            }
            if (pageNextCrawl.getAccessibility() != null) {
                this.accessibility = pageNextCrawl.getAccessibility();
            }
            if (pageNextCrawl.getSEO() != null) {
                this.seo = pageNextCrawl.getSEO();
            }
        }
    }

    setQA(qa: string): CrawlBuilder {
        this.qa = qa;
        return this;
    }

    setAccessibility(accessibility: string): CrawlBuilder {
        this.accessibility = accessibility;
        return this;
    }

    setSEO(seo: string): CrawlBuilder {
        this.seo = seo;
        return this;
    }

    fromJson(json: PageReportLinksJson): CrawlBuilder {
        this.qa = json.qa;
        this.accessibility = json.accessibility;
        this.seo = json.seo;

        return this;
    }

    build(): PageReportLinks {
        return new PageReportLinks(this);
    }
}
