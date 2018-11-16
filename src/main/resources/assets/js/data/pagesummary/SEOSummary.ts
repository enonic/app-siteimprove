import {SEOSummaryJson} from '../../resource/json/pagesummary/SEOSummaryJson';
import {Summary} from './Summary';
import {Data} from '../Data';

export class SEOSummary
    implements Summary {

    private contentIssues: number;

    private technicalIssues: number;

    private uxIssues: number;

    constructor(builder: SEOSummaryBuilder) {
        this.contentIssues = builder.contentIssues;
        this.technicalIssues = builder.technicalIssues;
        this.uxIssues = builder.uxIssues;
    }

    getContentIssues(): number {
        return this.contentIssues;
    }

    getTechnicalIssues(): number {
        return this.technicalIssues;
    }

    getUxIssues(): number {
        return this.uxIssues;
    }

    clone(): SEOSummary {
        return this.newBuilder().build();
    }

    newBuilder(): SEOSummaryBuilder {
        return new SEOSummaryBuilder(this);
    }

    static create(): SEOSummaryBuilder {
        return new SEOSummaryBuilder();
    }

    static fromJson(json: SEOSummaryJson): SEOSummary {
        return new SEOSummaryBuilder().fromJson(json).build();
    }

    toData(): Data[] {
        return [
            {name: 'Content issues', value: this.contentIssues},
            {name: 'Technical issues', value: this.technicalIssues},
            {name: 'UX issues', value: this.uxIssues}
        ];
    }
}

export class SEOSummaryBuilder {

    contentIssues: number;

    technicalIssues: number;

    uxIssues: number;

    constructor(summary?: SEOSummary) {
        if (summary) {
            if (summary.getContentIssues() != null) {
                this.contentIssues = summary.getContentIssues();
            }
            if (summary.getTechnicalIssues() != null) {
                this.technicalIssues = summary.getTechnicalIssues();
            }
            if (summary.getUxIssues() != null) {
                this.uxIssues = summary.getUxIssues();
            }
        }
    }

    setContentIssues(contentIssues: number): SEOSummaryBuilder {
        this.contentIssues = contentIssues;
        return this;
    }

    setTechnicalIssues(technicalIssues: number): SEOSummaryBuilder {
        this.technicalIssues = technicalIssues;
        return this;
    }

    setUxIssues(uxIssues: number): SEOSummaryBuilder {
        this.uxIssues = uxIssues;
        return this;
    }

    fromJson(json: SEOSummaryJson): SEOSummaryBuilder {
        this.contentIssues = json.contentIssues;
        this.technicalIssues = json.technicalIssues;
        this.uxIssues = json.uxIssues;

        return this;
    }

    build(): SEOSummary {
        return new SEOSummary(this);
    }
}
