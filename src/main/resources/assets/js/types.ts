type Services = {
    sitesUrl: string,
    pagesUrl: string,
    dciOverviewUrl: string,
    pageSummaryUrl: string,
    crawlStatusUrl: string,
    crawlUrl: string,
    checkStatusUrl: string,
    checkUrl: string,
    checkByUrlUrl: string,
    linksUrl: string,
    checkUrlExistsUrl: string
};

type ConfigType = {
    errorMessage: string;
    vhost: string;
    contentPath: string;
    services: Services
};

declare const CONFIG: ConfigType;
