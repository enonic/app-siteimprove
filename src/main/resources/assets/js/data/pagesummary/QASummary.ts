import {QASummaryJson} from '../../resource/json/pagesummary/QASummaryJson';
import {Data} from '../Data';
import {Summary} from './Summary';

export class QASummary
    implements Summary {

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

    toData(): Data[] {
        return [
            {name: 'Broken links', value: this.brokenLinks},
            {name: 'Potential misspellings', value: this.potentialMisspellings},
            {name: 'Misspellings', value: this.misspellings}
        ];
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
        } else {
            this.brokenLinks = 0;
            this.misspellings = 0;
            this.potentialMisspellings = 0;
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
        if (json) {
            this.brokenLinks = json.brokenLinks || 0;
            this.misspellings = json.misspellings || 0;
            this.potentialMisspellings = json.potentialMisspellings || 0;
        }

        return this;
    }

    build(): QASummary {
        return new QASummary(this);
    }
}
