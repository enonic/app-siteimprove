import {QASummary} from './QASummary';
import {SEOSummary} from './SEOSummary';
import {SiteimproveSummaryJson} from '../../resource/json/pagesummary/SiteimproveSummaryJson';
import {AccessibilitySummary} from './AccessibilitySummary';

export class SiteimproveSummary {

    private dci: number;

    private lastSeen: Date;

    private accessibility: AccessibilitySummary;

    private qa: QASummary;

    private seo: SEOSummary;

    constructor(builder: SiteimproveSummaryBuilder) {
        this.dci = builder.dci;
        this.lastSeen = builder.lastSeen;
        this.accessibility = builder.accessibility;
        this.qa = builder.qa;
        this.seo = builder.seo;
    }

    getDci(): number {
        return this.dci;
    }

    getLastSeen(): Date {
        return this.lastSeen;
    }

    getAccessibility(): AccessibilitySummary {
        return this.accessibility;
    }

    getQA(): QASummary {
        return this.qa;
    }

    getSEO(): SEOSummary {
        return this.seo;
    }

    clone(): SiteimproveSummary {
        return this.newBuilder().build();
    }

    newBuilder(): SiteimproveSummaryBuilder {
        return new SiteimproveSummaryBuilder(this);
    }

    static create(): SiteimproveSummaryBuilder {
        return new SiteimproveSummaryBuilder();
    }

    static fromJson(json: SiteimproveSummaryJson): SiteimproveSummary {
        return new SiteimproveSummaryBuilder().fromJson(json).build();
    }
}

export class SiteimproveSummaryBuilder {

    dci: number;

    lastSeen: Date;

    accessibility: AccessibilitySummary;

    qa: QASummary;

    seo: SEOSummary;

    constructor(summary?: SiteimproveSummary) {
        if (summary) {
            if (summary.getDci() != null) {
                this.dci = summary.getDci();
            }
            if (summary.getLastSeen() != null) {
                this.lastSeen = summary.getLastSeen();
            }
            if (summary.getAccessibility() != null) {
                this.accessibility = summary.getAccessibility();
            }
            if (summary.getQA() != null) {
                this.qa = summary.getQA();
            }
            if (summary.getSEO() != null) {
                this.seo = summary.getSEO();
            }
        }
    }

    setDci(dci: number) {
        this.dci = dci;
        return this;
    }

    setLastSeen(lastSeen: Date) {
        this.lastSeen = lastSeen;
        return this;
    }

    setAccessibility(accessibility: AccessibilitySummary) {
        this.accessibility = accessibility;
        return this;
    }

    setQA(qa: QASummary) {
        this.qa = qa;
        return this;
    }

    setSEO(seo: SEOSummary) {
        this.seo = seo;
        return this;
    }

    fromJson(json: SiteimproveSummaryJson): SiteimproveSummaryBuilder {
        this.dci = json.dci.total;
        this.lastSeen = new Date(json.status.lastSeen);
        this.accessibility = AccessibilitySummary.fromJson(json.accessibility);
        this.qa = QASummary.fromJson(json.qa);
        this.seo = SEOSummary.fromJson(json.seo);

        return this;
    }

    build(): SiteimproveSummary {
        return new SiteimproveSummary(this);
    }
}

