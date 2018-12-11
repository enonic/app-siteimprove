type Services = {
    sitesUrl: string,
    pagesUrl: string
};

type ConfigType = {
    errorMessage: string;
    vhost: string;
    contentPath: string;
    services: Services
};

declare const CONFIG: ConfigType;
