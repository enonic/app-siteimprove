import {PageApiJson} from '../resource/json/PageApiJson';

export class PageApi {

    private id: number;

    private title: string;

    private url: string;

    constructor(builder: PageApiBuilder) {
        this.id = builder.id;
        this.title = builder.title;
        this.url = builder.url;
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

    clone(): PageApi {
        return this.newBuilder().build();
    }

    newBuilder(): PageApiBuilder {
        return new PageApiBuilder(this);
    }

    static create(): PageApiBuilder {
        return new PageApiBuilder();
    }

    static fromJson(json: PageApiJson): PageApi {
        return new PageApiBuilder().fromJson(json).build();
    }
}

export class PageApiBuilder {

    id: number;

    title: string;

    url: string;

    constructor(site?: PageApi) {
        if (site) {
            if (site.getId() != null) {
                this.id = site.getId();
            }
            if (site.getTitle() != null) {
                this.title = site.getTitle();
            }
            if (site.getUrl() != null) {
                this.url = site.getUrl();
            }
        }
    }

    setId(id: number): PageApiBuilder {
        this.id = id;
        return this;
    }

    setTitle(title: string): PageApiBuilder {
        this.title = title;
        return this;
    }

    setUrl(url: string): PageApiBuilder {
        this.url = url;
        return this;
    }

    fromJson(json: PageApiJson): PageApiBuilder {
        this.id = json.id;
        this.title = json.title;
        this.url = json.url;

        return this;
    }

    build(): PageApi {
        return new PageApi(this);
    }
}
