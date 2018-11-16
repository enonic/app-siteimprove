import {QASummaryJson} from '../resource/json/pagesummary/QASummaryJson';

export class QASummary {

    private brokenLinks: number;

    private misspellings: number;

    private potentialMisspellings: number;

    constructor(builder: QASummaryBuilder) {
        this.brokenLinks = builder.brokenLinks;
        this.misspellings = builder.misspellings;
        this.potentialMisspellings = builder.potentialMisspellings;
    }

    getBrokenLinks(): number {
        return this.brokenLinks;
    }

    getMisspellings(): number {
        return this.misspellings;
    }

    getPotentialMisspellings(): number {
        return this.potentialMisspellings;
    }

    clone(): QASummary {
        return this.newBuilder().build();
    }

    newBuilder(): QASummaryBuilder {
        return new QASummaryBuilder(this);
    }

    static create(): QASummaryBuilder {
        return new QASummaryBuilder();
    }

    static fromJson(json: QASummaryJson): QASummary {
        return new QASummaryBuilder().fromJson(json).build();
    }
}

export class QASummaryBuilder {

    brokenLinks: number;

    misspellings: number;

    potentialMisspellings: number;

    constructor(summary?: QASummary) {
        if (summary) {
            if (summary.getBrokenLinks() != null) {
                this.brokenLinks = summary.getBrokenLinks();
            }
            if (summary.getMisspellings() != null) {
                this.misspellings = summary.getMisspellings();
            }
            if (summary.getPotentialMisspellings() != null) {
                this.potentialMisspellings = summary.getPotentialMisspellings();
            }
        }
    }

    setBrokenLinks(brokenLinks: number): QASummaryBuilder {
        this.brokenLinks = brokenLinks;
        return this;
    }

    setMisspellings(misspellings: number): QASummaryBuilder {
        this.misspellings = misspellings;
        return this;
    }

    setPotentialMisspellings(potentialMisspellings: number): QASummaryBuilder {
        this.potentialMisspellings = potentialMisspellings;
        return this;
    }

    fromJson(json: QASummaryJson): QASummaryBuilder {
        this.brokenLinks = json.brokenLinks;
        this.misspellings = json.misspellings;
        this.potentialMisspellings = json.potentialMisspellings;

        return this;
    }

    build(): QASummary {
        return new QASummary(this);
    }
}
