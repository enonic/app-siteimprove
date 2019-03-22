import {SEOScoreJson} from '../../resource/json/dcioverallscore/SEOScoreJson';

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
        } else {
            this.content = 0;
            this.mobile = 0;
            this.technical = 0;
            this.ux = 0;
            this.total = 0;
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
        if (json) {
            this.content = json.content || 0;
            this.mobile = json.mobile || 0;
            this.technical = json.technical || 0;
            this.ux = json.ux || 0;
            this.total = json.total || 0;
        }

        return this;
    }

    build(): SEOScore {
        return new SEOScore(this);
    }
}
