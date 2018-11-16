import {PageSummaryJson} from '../resource/json/PageSummaryJson';
import {SiteimproveLinks} from './SiteimproveLinks';
import {SiteimproveSummary} from './SiteimproveSummary';

export class PageSummary {

    private id: number;

    private title: string;

    private url: string;

    private summary: SiteimproveSummary;

    private siteimproveLinks: SiteimproveLinks;

    constructor(builder: PageSummaryBuilder) {
        this.id = builder.id;
        this.title = builder.title;
        this.url = builder.url;
        this.summary = builder.summary;
        this.siteimproveLinks = builder.siteimproveLinks;
    }

    getId(): number {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getUrl(): string {
        return this.url;
    }

    getSummary(): SiteimproveSummary {
        return this.summary;
    }

    getSiteimproveLinks(): SiteimproveLinks {
        return this.siteimproveLinks;
    }

    clone(): PageSummary {
        return this.newBuilder().build();
    }

    newBuilder(): PageSummaryBuilder {
        return new PageSummaryBuilder(this);
    }

    static create(): PageSummaryBuilder {
        return new PageSummaryBuilder();
    }

    static fromJson(json: PageSummaryJson): PageSummary {
        return new PageSummaryBuilder().fromJson(json).build();
    }
}

export class PageSummaryBuilder {

    id: number;

    title: string;

    url: string;

    summary: SiteimproveSummary;

    siteimproveLinks: SiteimproveLinks;

    constructor(pageSummary?: PageSummary) {
        if (pageSummary) {
            if (pageSummary.getId() != null) {
                this.id = pageSummary.getId();
            }
            if (pageSummary.getTitle() != null) {
                this.title = pageSummary.getTitle();
            }
            if (pageSummary.getUrl() != null) {
                this.url = pageSummary.getUrl();
            }
            if (pageSummary.getSummary() != null) {
                this.summary = pageSummary.getSummary();
            }
            if (pageSummary.getSiteimproveLinks() != null) {
                this.siteimproveLinks = pageSummary.getSiteimproveLinks();
            }
        }
    }

    setId(id: number): PageSummaryBuilder {
        this.id = id;
        return this;
    }

    setTitle(title: string): PageSummaryBuilder {
        this.title = title;
        return this;
    }

    setUrl(url: string): PageSummaryBuilder {
        this.url = url;
        return this;
    }

    setSummary(summary: SiteimproveSummary) {
        this.summary = summary;
        return this;
    }

    setSiteimproveLinks(siteimproveLinks: SiteimproveLinks) {
        this.siteimproveLinks = siteimproveLinks;
        return this;
    }

    fromJson(json: PageSummaryJson): PageSummaryBuilder {
        this.id = json.id;
        this.title = json.title;
        this.url = json.url;
        this.summary = SiteimproveSummary.fromJson(json.summary);
        this.siteimproveLinks = SiteimproveLinks.fromJson(json.siteimproveLinks);

        return this;
    }

    build(): PageSummary {
        return new PageSummary(this);
    }
}
