type Services = {
    sitesUrl: string,
    pagesUrl: string,
    dciOverviewUrl: string,
    pageSummaryUrl: string
};

type ConfigType = {
    errorMessage: string;
    vhost: string;
    contentPath: string;
    services: Services
};

declare const CONFIG: ConfigType;
