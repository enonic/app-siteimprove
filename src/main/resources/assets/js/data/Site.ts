import {SiteJson} from '../resource/json/SiteJson';

export class Site {

    private id: number;

    private name: string;

    private url: string;

    private pages: number;

    private policies: number;

    private product: string[];

    constructor(builder: SiteBuilder) {
        this.id = builder.id;
        this.name = builder.name;
        this.url = builder.url;
        this.pages = builder.pages;
        this.policies = builder.policies;
        this.product = builder.product;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getUrl(): string {
        return this.url;
    }

    getPages(): number {
        return this.pages;
    }

    getPolicies(): number {
        return this.policies;
    }

    getProduct(): string[] {
        return this.product;
    }

    clone(): Site {
        return this.newBuilder().build();
    }

    newBuilder(): SiteBuilder {
        return new SiteBuilder(this);
    }

    static create(): SiteBuilder {
        return new SiteBuilder();
    }

    static fromJson(json: SiteJson): Site {
        return new SiteBuilder().fromJson(json).build();
    }
}

export class SiteBuilder {

    id: number;

    name: string;

    url: string;

    pages: number;

    policies: number;

    product: string[];

    constructor(site?: Site) {
        if (site) {
            if (site.getId() != null) {
                this.id = site.getId();
            }
            if (site.getName() != null) {
                this.name = site.getName();
            }
            if (site.getUrl() != null) {
                this.url = site.getUrl();
            }
            if (site.getPages() != null) {
                this.pages = site.getPages();
            }
            if (site.getPolicies() != null) {
                this.policies = site.getPolicies();
            }
            if (site.getProduct() != null) {
                this.product = site.getProduct();
            }
        }
    }

    setId(id: number): SiteBuilder {
        this.id = id;
        return this;
    }

    setName(name: string): SiteBuilder {
        this.name = name;
        return this;
    }

    setUrl(url: string): SiteBuilder {
        this.url = url;
        return this;
    }

    setPages(pages: number): SiteBuilder {
        this.pages = pages;
        return this;
    }

    setPolicies(policies: number): SiteBuilder {
        this.policies = policies;
        return this;
    }

    setProduct(product: string[]): SiteBuilder {
        this.product = product;
        return this;
    }

    fromJson(json: SiteJson): SiteBuilder {
        this.id = json.id;
        this.name = json.site_name;
        this.url = json.url;
        this.pages = json.pages;
        this.policies = json.policies;
        this.product = json.product;

        return this;
    }

    build(): Site {
        return new Site(this);
    }
}
