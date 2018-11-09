import {SEOScoreJson} from '../resource/json/SEOScoreJson';

export class SEOScore {

    private content: number;

    private mobile: number;

    private technical: number;

    private ux: number;

    private total: number;

    constructor(builder: SEOScoreBuilder) {
        this.content = builder.content;
        this.mobile = builder.mobile;
        this.technical = builder.technical;
        this.ux = builder.ux;
        this.total = builder.total;
    }

    getContent(): number {
        return this.content;
    }

    getMobile(): number {
        return this.mobile;
    }

    getTechnical(): number {
        return this.technical;
    }

    getUx(): number {
        return this.ux;
    }

    getTotal(): number {
        return this.total;
    }

    clone(): SEOScore {
        return this.newBuilder().build();
    }

    newBuilder(): SEOScoreBuilder {
        return new SEOScoreBuilder(this);
    }

    static create(): SEOScoreBuilder {
        return new SEOScoreBuilder();
    }

    static fromJson(json: SEOScoreJson): SEOScore {
        return new SEOScoreBuilder().fromJson(json).build();
    }
}

export class SEOScoreBuilder {

    content: number;

    mobile: number;

    technical: number;

    ux: number;

    total: number;

    constructor(seoScore?: SEOScore) {
        if (seoScore) {
            if (seoScore.getContent() != null) {
                this.content = seoScore.getContent();
            }
            if (seoScore.getMobile() != null) {
                this.mobile = seoScore.getMobile();
            }
            if (seoScore.getTechnical() != null) {
                this.technical = seoScore.getTechnical();
            }
            if (seoScore.getUx() != null) {
                this.ux = seoScore.getUx();
            }
            if (seoScore.getTotal() != null) {
                this.total = seoScore.getTotal();
            }
        }
    }

    setContent(content: number): SEOScoreBuilder {
        this.content = content;
        return this;
    }

    setMobile(mobile: number): SEOScoreBuilder {
        this.mobile = mobile;
        return this;
    }

    setTechnical(technical: number): SEOScoreBuilder {
        this.technical = technical;
        return this;
    }

    setUx(ux: number): SEOScoreBuilder {
        this.ux = ux;
        return this;
    }

    setTotal(total: number): SEOScoreBuilder {
        this.total = total;
        return this;
    }

    fromJson(json: SEOScoreJson): SEOScoreBuilder {
        this.content = json.content;
        this.mobile = json.mobile;
        this.technical = json.technical;
        this.ux = json.ux;
        this.total = json.total;

        return this;
    }

    build(): SEOScore {
        return new SEOScore(this);
    }
}
