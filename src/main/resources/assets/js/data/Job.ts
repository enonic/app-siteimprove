import {JobJson} from '../resource/json/JobJson';

export class Job {

    private statusCode: number;

    private success: boolean;

    private message: string;

    constructor(builder: JobBuilder) {
        this.statusCode = builder.statusCode;
        this.success = builder.success;
        this.message = builder.message;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    isSuccess(): boolean {
        return this.success;
    }

    getMessage(): string {
        return this.message;
    }

    clone(): Job {
        return this.newBuilder().build();
    }

    newBuilder(): JobBuilder {
        return new JobBuilder(this);
    }

    static create(): JobBuilder {
        return new JobBuilder();
    }

    static fromJson(json: JobJson): Job {
        return new JobBuilder().fromJson(json).build();
    }
}

export class JobBuilder {

    statusCode: number;

    success: boolean;

    message: string;

    constructor(pageNextCrawl?: Job) {
        if (pageNextCrawl) {
            if (pageNextCrawl.getStatusCode() != null) {
                this.statusCode = pageNextCrawl.getStatusCode();
            }
            if (pageNextCrawl.isSuccess() != null) {
                this.success = pageNextCrawl.isSuccess();
            }
            if (pageNextCrawl.getMessage() != null) {
                this.message = pageNextCrawl.getMessage();
            }
        }
    }

    setStatusCode(statusCode: number): JobBuilder {
        this.statusCode = statusCode;
        return this;
    }

    setSuccess(success: boolean): JobBuilder {
        this.success = success;
        return this;
    }

    setMessage(message: string): JobBuilder {
        this.message = message;
        return this;
    }

    fromJson(json: JobJson): JobBuilder {
        this.statusCode = json.statusCode;
        this.success = json.success;
        this.message = json.message;

        return this;
    }

    build(): Job {
        return new Job(this);
    }
}
