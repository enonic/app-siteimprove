import {DciOverallScoreJson} from '../resource/json/DciOverallScoreJson';
import {QAScore} from './dcioverallscore/QAScore';
import {SEOScore} from './dcioverallscore/SEOScore';
import {AccessibilityScore} from './dcioverallscore/AccessibilityScore';

export class DciOverallScore {

    private accessibility: AccessibilityScore;

    private qa: QAScore;

    private seo: SEOScore;

    private total: number;

    constructor(builder: DciOverallScoreBuilder) {
        this.accessibility = builder.accessibility;
        this.qa = builder.qa;
        this.seo = builder.seo;
        this.total = builder.total;
    }

    getAccessibility(): AccessibilityScore {
        return this.accessibility;
    }

    getQA(): QAScore {
        return this.qa;
    }

    getSEO(): SEOScore {
        return this.seo;
    }

    getTotal(): number {
        return this.total;
    }

    clone(): DciOverallScore {
        return this.newBuilder().build();
    }

    newBuilder(): DciOverallScoreBuilder {
        return new DciOverallScoreBuilder(this);
    }

    static create(): DciOverallScoreBuilder {
        return new DciOverallScoreBuilder();
    }

    static fromJson(json: DciOverallScoreJson): DciOverallScore {
        return new DciOverallScoreBuilder().fromJson(json).build();
    }
}

export class DciOverallScoreBuilder {

    accessibility: AccessibilityScore;

    qa: QAScore;

    seo: SEOScore;

    total: number;

    constructor(dciOverallScore?: DciOverallScore) {
        if (dciOverallScore) {
            if (dciOverallScore.getAccessibility() != null) {
                this.accessibility = dciOverallScore.getAccessibility();
            }
            if (dciOverallScore.getQA() != null) {
                this.qa = dciOverallScore.getQA();
            }
            if (dciOverallScore.getSEO() != null) {
                this.seo = dciOverallScore.getSEO();
            }
            if (dciOverallScore.getTotal() != null) {
                this.total = dciOverallScore.getTotal();
            }
        }
    }

    setAccessibility(accessibility: AccessibilityScore): DciOverallScoreBuilder {
        this.accessibility = accessibility;
        return this;
    }

    setQA(qa: QAScore): DciOverallScoreBuilder {
        this.qa = qa;
        return this;
    }

    setSEO(seo: SEOScore): DciOverallScoreBuilder {
        this.seo = seo;
        return this;
    }

    setTotal(total: number): DciOverallScoreBuilder {
        this.total = total;
        return this;
    }

    fromJson(json: DciOverallScoreJson): DciOverallScoreBuilder {
        this.accessibility = AccessibilityScore.fromJson(json.accessibility);
        this.qa = QAScore.fromJson(json.qa);
        this.seo = SEOScore.fromJson(json.seo);
        this.total = json.total || 0;

        return this;
    }

    build(): DciOverallScore {
        return new DciOverallScore(this);
    }
}
