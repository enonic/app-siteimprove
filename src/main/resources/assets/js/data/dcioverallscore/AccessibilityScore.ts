import {AccessibilityScoreJson} from '../../resource/json/dcioverallscore/AccessibilityScoreJson';

export class AccessibilityScore {

    private errorPages: number;

    private errors: number;

    private warnings: number;

    private total: number;

    constructor(builder: AccessibilityScoreBuilder) {
        this.errorPages = builder.errorPages;
        this.errors = builder.errors;
        this.warnings = builder.warnings;
        this.total = builder.total;
    }

    getErrorPages(): number {
        return this.errorPages;
    }

    getErrors(): number {
        return this.errors;
    }

    getWarnings(): number {
        return this.warnings;
    }

    getTotal(): number {
        return this.total;
    }

    clone(): AccessibilityScore {
        return this.newBuilder().build();
    }

    newBuilder(): AccessibilityScoreBuilder {
        return new AccessibilityScoreBuilder(this);
    }

    static create(): AccessibilityScoreBuilder {
        return new AccessibilityScoreBuilder();
    }

    static fromJson(json: AccessibilityScoreJson): AccessibilityScore {
        return new AccessibilityScoreBuilder().fromJson(json).build();
    }
}

export class AccessibilityScoreBuilder {

    errorPages: number;

    errors: number;

    warnings: number;

    total: number;

    constructor(accessibilityScore?: AccessibilityScore) {
        if (accessibilityScore) {
            if (accessibilityScore.getErrorPages() != null) {
                this.errorPages = accessibilityScore.getErrorPages();
            }
            if (accessibilityScore.getErrors() != null) {
                this.errors = accessibilityScore.getErrors();
            }
            if (accessibilityScore.getWarnings() != null) {
                this.warnings = accessibilityScore.getWarnings();
            }
            if (accessibilityScore.getTotal() != null) {
                this.total = accessibilityScore.getTotal();
            }
        } else {
            this.errorPages = 0;
            this.errors = 0;
            this.warnings = 0;
            this.total = 0;
        }
    }

    setErrorPages(errorPages: number): AccessibilityScoreBuilder {
        this.errorPages = errorPages;
        return this;
    }

    setErrors(errors: number): AccessibilityScoreBuilder {
        this.errors = errors;
        return this;
    }

    setWarnings(warnings: number): AccessibilityScoreBuilder {
        this.warnings = warnings;
        return this;
    }

    setTotal(total: number): AccessibilityScoreBuilder {
        this.total = total;
        return this;
    }

    fromJson(json: AccessibilityScoreJson): AccessibilityScoreBuilder {
        if (json) {
            this.errorPages = json.errorpages || 0;
            this.errors = json.errors || 0;
            this.warnings = json.warnings || 0;
            this.total = json.total || 0;
        }

        return this;
    }

    build(): AccessibilityScore {
        return new AccessibilityScore(this);
    }
}
