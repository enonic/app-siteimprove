import {CheckUrlExistsJson} from '../resource/json/CheckUrlExistsJson';

export class CheckUrlExists {

    private exist: boolean;

    constructor(builder: CheckUrlExistsBuilder) {
        this.exist = builder.exist;
    }

    isExist(): boolean {
        return this.exist;
    }

    clone(): CheckUrlExists {
        return this.newBuilder().build();
    }

    newBuilder(): CheckUrlExistsBuilder {
        return new CheckUrlExistsBuilder(this);
    }

    static create(): CheckUrlExistsBuilder {
        return new CheckUrlExistsBuilder();
    }

    static fromJson(json: CheckUrlExistsJson): CheckUrlExists {
        return new CheckUrlExistsBuilder().fromJson(json).build();
    }
}

export class CheckUrlExistsBuilder {

    exist: boolean;

    constructor(checkUrlExists?: CheckUrlExists) {
        if (checkUrlExists) {
            if (checkUrlExists.isExist() != null) {
                this.exist = checkUrlExists.isExist();
            }
        }
    }

    setExist(exist: boolean): CheckUrlExistsBuilder {
        this.exist = exist;
        return this;
    }

    fromJson(json: CheckUrlExistsJson): CheckUrlExistsBuilder {
        this.exist = json.exist;

        return this;
    }

    build(): CheckUrlExists {
        return new CheckUrlExists(this);
    }
}
