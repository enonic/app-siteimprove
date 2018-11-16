import {AccessibilitySummaryJson} from '../resource/json/pagesummary/AccessibilitySummaryJson';

export class AccessibilitySummary {

    private aErrors: number;

    private aaErrors: number;

    private aaaErrors: number;

    constructor(builder: AccessibilitySummaryBuilder) {
        this.aErrors = builder.aErrors;
        this.aaErrors = builder.aaErrors;
        this.aaaErrors = builder.aaaErrors;
    }

    getAErrors(): number {
        return this.aErrors;
    }

    getAaErrors(): number {
        return this.aaErrors;
    }

    getAaaErrors(): number {
        return this.aaaErrors;
    }

    clone(): AccessibilitySummary {
        return this.newBuilder().build();
    }

    newBuilder(): AccessibilitySummaryBuilder {
        return new AccessibilitySummaryBuilder(this);
    }

    static create(): AccessibilitySummaryBuilder {
        return new AccessibilitySummaryBuilder();
    }

    static fromJson(json: AccessibilitySummaryJson): AccessibilitySummary {
        return new AccessibilitySummaryBuilder().fromJson(json).build();
    }
}

export class AccessibilitySummaryBuilder {

    aErrors: number;

    aaErrors: number;

    aaaErrors: number;

    constructor(summary?: AccessibilitySummary) {
        if (summary) {
            if (summary.getAErrors() != null) {
                this.aErrors = summary.getAErrors();
            }
            if (summary.getAaErrors() != null) {
                this.aaErrors = summary.getAaErrors();
            }
            if (summary.getAaaErrors() != null) {
                this.aaaErrors = summary.getAaaErrors();
            }
        }
    }

    setAErrors(aErrors: number): AccessibilitySummaryBuilder {
        this.aErrors = aErrors;
        return this;
    }

    setAaErrors(aaErrors: number): AccessibilitySummaryBuilder {
        this.aaErrors = aaErrors;
        return this;
    }

    setAaaErrors(aaaErrors: number): AccessibilitySummaryBuilder {
        this.aaaErrors = aaaErrors;
        return this;
    }

    fromJson(json: AccessibilitySummaryJson): AccessibilitySummaryBuilder {
        this.aErrors = json.aErrors;
        this.aaErrors = json.aaErrors;
        this.aaaErrors = json.aaaErrors;

        return this;
    }

    build(): AccessibilitySummary {
        return new AccessibilitySummary(this);
    }
}
