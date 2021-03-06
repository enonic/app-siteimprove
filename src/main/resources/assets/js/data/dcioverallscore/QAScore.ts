import {QAScoreJson} from '../../resource/json/dcioverallscore/QAScoreJson';

export class QAScore {

    private content: number;

    private freshness: number;

    private security: number;

    private ux: number;

    private total: number;

    constructor(builder: QAScoreBuilder) {
        this.content = builder.content;
        this.freshness = builder.freshness;
        this.security = builder.security;
        this.ux = builder.ux;
        this.total = builder.total;
    }

    getContent(): number {
        return this.content;
    }

    getFreshness(): number {
        return this.freshness;
    }

    getSecurity(): number {
        return this.security;
    }

    getUx(): number {
        return this.ux;
    }

    getTotal(): number {
        return this.total;
    }

    clone(): QAScore {
        return this.newBuilder().build();
    }

    newBuilder(): QAScoreBuilder {
        return new QAScoreBuilder(this);
    }

    static create(): QAScoreBuilder {
        return new QAScoreBuilder();
    }

    static fromJson(json: QAScoreJson): QAScore {
        return new QAScoreBuilder().fromJson(json).build();
    }
}

export class QAScoreBuilder {

    content: number;

    freshness: number;

    security: number;

    ux: number;

    total: number;

    constructor(qaScore?: QAScore) {
        if (qaScore) {
            if (qaScore.getContent() != null) {
                this.content = qaScore.getContent();
            }
            if (qaScore.getFreshness() != null) {
                this.freshness = qaScore.getFreshness();
            }
            if (qaScore.getSecurity() != null) {
                this.security = qaScore.getSecurity();
            }
            if (qaScore.getUx() != null) {
                this.ux = qaScore.getUx();
            }
            if (qaScore.getTotal() != null) {
                this.total = qaScore.getTotal();
            }
        } else {
            this.content = 0;
            this.freshness = 0;
            this.security = 0;
            this.ux = 0;
            this.total = 0;
        }
    }

    setContent(content: number): QAScoreBuilder {
        this.content = content;
        return this;
    }

    setFreshness(freshness: number): QAScoreBuilder {
        this.freshness = freshness;
        return this;
    }

    setSecurity(security: number): QAScoreBuilder {
        this.security = security;
        return this;
    }

    setUx(ux: number): QAScoreBuilder {
        this.ux = ux;
        return this;
    }

    setTotal(total: number): QAScoreBuilder {
        this.total = total;
        return this;
    }

    fromJson(json: QAScoreJson): QAScoreBuilder {
        if (json) {
            this.content = json.content || 0;
            this.freshness = json.freshness || 0;
            this.security = json.security || 0;
            this.ux = json.ux || 0;
            this.total = json.total || 0;
        }

        return this;
    }

    build(): QAScore {
        return new QAScore(this);
    }
}
