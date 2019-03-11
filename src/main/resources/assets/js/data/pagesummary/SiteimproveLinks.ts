import {SiteimproveLinksJson} from '../../resource/json/pagesummary/SiteimproveLinksJson';

export class SiteimproveLinks {

    private accessibility: string;

    private policy: string;

    private qa: string;

    private seo: string;

    constructor(builder: SiteimproveLinksBuilder) {
        this.accessibility = builder.accessibility;
        this.policy = builder.policy;
        this.qa = builder.qa;
        this.seo = builder.seo;
    }

    getAccessibility(): string {
        return this.accessibility;
    }

    getPolicy(): string {
        return this.policy;
    }

    getQA(): string {
        return this.qa;
    }

    getSEO(): string {
        return this.seo;
    }

    clone(): SiteimproveLinks {
        return this.newBuilder().build();
    }

    newBuilder(): SiteimproveLinksBuilder {
        return new SiteimproveLinksBuilder(this);
    }

    static create(): SiteimproveLinksBuilder {
        return new SiteimproveLinksBuilder();
    }

    static fromJson(json: SiteimproveLinksJson): SiteimproveLinks {
        return new SiteimproveLinksBuilder().fromJson(json).build();
    }
}

export class SiteimproveLinksBuilder {

    accessibility: string;

    policy: string;

    qa: string;

    seo: string;

    constructor(links?: SiteimproveLinks) {
        if (links) {
            if (links.getAccessibility() != null) {
                this.accessibility = links.getAccessibility();
            }
            if (links.getPolicy() != null) {
                this.policy = links.getPolicy();
            }
            if (links.getQA() != null) {
                this.qa = links.getQA();
            }
            if (links.getSEO() != null) {
                this.seo = links.getSEO();
            }
        }
    }

    setAccessibility(accessibility: string): SiteimproveLinksBuilder {
        this.accessibility = accessibility;
        return this;
    }

    setPolicy(policy: string): SiteimproveLinksBuilder {
        this.policy = policy;
        return this;
    }

    setQA(qa: string): SiteimproveLinksBuilder {
        this.qa = qa;
        return this;
    }

    setSEO(seo: string): SiteimproveLinksBuilder {
        this.seo = seo;
        return this;
    }

    fromJson(json: SiteimproveLinksJson): SiteimproveLinksBuilder {
        if (json) {
            this.accessibility = json.accessibility.pageReport.href;
            this.policy = json.policy.pageReport.href;
            this.qa = json.qa.pageReport.href;
            this.seo = json.seo.pageReport.href;
        }

        return this;
    }

    build(): SiteimproveLinks {
        return new SiteimproveLinks(this);
    }
}
