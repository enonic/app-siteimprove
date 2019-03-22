type Services = {
    sitesUrl: string,
    pagesUrl: string,
    dciOverviewUrl: string,
    pageSummaryUrl: string,
    crawlStatusUrl: string,
    crawlUrl: string,
    checkStatusUrl: string,
    checkUrl: string,
    linksUrl: string
};

type ConfigType = {
    errorMessage: string;
    vhost: string;
    contentPath: string;
    services: Services
};

declare const CONFIG: ConfigType;
