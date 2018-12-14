export enum CrawlPermissionsEnum {
    ALLOWED,
    INCORRECT_SUBSCRIPTION,
    INSUFFICIENT_USER_PERMISSION
}

export class CrawlPermissions {

    private permission: CrawlPermissionsEnum;

    constructor(state: CrawlPermissionsEnum = CrawlPermissionsEnum.ALLOWED) {
        this.permission = state;
    }

    getPermission(): CrawlPermissionsEnum {
        return this.permission;
    }

    getStateAsString(): string {
        return CrawlPermissionsEnum[this.permission];
    }

    static fromString(value: string): CrawlPermissions {
        if (api.util.StringHelper.isBlank(value)) {
            return null;
        }
        const permission = value.toUpperCase();
        if (permission === CrawlPermissionsEnum[CrawlPermissionsEnum.INSUFFICIENT_USER_PERMISSION]) {
            return new CrawlPermissions(CrawlPermissionsEnum.INSUFFICIENT_USER_PERMISSION);
        } else if (permission === CrawlPermissionsEnum[CrawlPermissionsEnum.INCORRECT_SUBSCRIPTION]) {
            return new CrawlPermissions(CrawlPermissionsEnum.INCORRECT_SUBSCRIPTION);
        } else {
            return new CrawlPermissions(CrawlPermissionsEnum.ALLOWED);
        }
    }

    isAllowed(): boolean {
        return this.permission === CrawlPermissionsEnum.ALLOWED;
    }

    isIncorrectSubscription(): boolean {
        return this.permission === CrawlPermissionsEnum.INCORRECT_SUBSCRIPTION;
    }

    isInsufficientUserPermission(): boolean {
        return this.permission === CrawlPermissionsEnum.INSUFFICIENT_USER_PERMISSION;
    }
}
