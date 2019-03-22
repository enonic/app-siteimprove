import {AccessibilitySummaryJson} from '../../resource/json/pagesummary/AccessibilitySummaryJson';
import {Summary} from './Summary';
import {Data} from '../Data';

export class AccessibilitySummary
    implements Summary {

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

    toData(): Data[] {
        return [
            {name: '"A" errors', value: this.aErrors},
            {name: '"AA" errors', value: this.aaErrors},
            {name: '"AAA" errors', value: this.aaaErrors}
        ];
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
        } else {
            this.aErrors = 0;
            this.aaErrors = 0;
            this.aaaErrors = 0;
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
        if (json) {
            this.aErrors = json.aErrors || 0;
            this.aaErrors = json.aaErrors || 0;
            this.aaaErrors = json.aaaErrors || 0;
        }

        return this;
    }

    build(): AccessibilitySummary {
        return new AccessibilitySummary(this);
    }
}
