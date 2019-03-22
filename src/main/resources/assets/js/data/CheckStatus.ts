import {CheckStatusJson} from '../resource/json/CheckStatusJson';

export class CheckStatus {

    private checkAllowed: boolean;

    private checkingNow: boolean;

    private lastSeen: Date;

    constructor(builder: CheckStatusBuilder) {
        this.checkAllowed = builder.checkAllowed;
        this.checkingNow = builder.checkingNow;
        this.lastSeen = builder.lastSeen;
    }

    isCheckAllowed(): boolean {
        return this.checkAllowed;
    }

    isCheckingNow(): boolean {
        return this.checkingNow;
    }

    getLastSeen(): Date {
        return this.lastSeen;
    }

    clone(): CheckStatus {
        return this.newBuilder().build();
    }

    newBuilder(): CheckStatusBuilder {
        return new CheckStatusBuilder(this);
    }

    static create(): CheckStatusBuilder {
        return new CheckStatusBuilder();
    }

    static fromJson(json: CheckStatusJson): CheckStatus {
        return new CheckStatusBuilder().fromJson(json).build();
    }
}

export class CheckStatusBuilder {

    checkAllowed: boolean;

    checkingNow: boolean;

    lastSeen: Date;

    constructor(pageNextCheck?: CheckStatus) {
        if (pageNextCheck) {
            if (pageNextCheck.isCheckAllowed() != null) {
                this.checkAllowed = pageNextCheck.isCheckAllowed();
            }
            if (pageNextCheck.isCheckingNow() != null) {
                this.checkingNow = pageNextCheck.isCheckingNow();
            }
            if (pageNextCheck.getLastSeen() != null) {
                this.lastSeen = pageNextCheck.getLastSeen();
            }
        }
    }

    setCheckAllowed(checkAllowed: boolean): CheckStatusBuilder {
        this.checkAllowed = checkAllowed;
        return this;
    }

    setCheckingNow(checkingNow: boolean): CheckStatusBuilder {
        this.checkingNow = checkingNow;
        return this;
    }

    setLastSeen(lastSeen: Date): CheckStatusBuilder {
        this.lastSeen = lastSeen;
        return this;
    }

    fromJson(json: CheckStatusJson): CheckStatusBuilder {
        this.checkAllowed = json.checkAllowed;
        this.checkingNow = json.checkingNow;
        this.lastSeen = new Date(json.lastSeen);

        return this;
    }

    build(): CheckStatus {
        return new CheckStatus(this);
    }
}
