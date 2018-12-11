type Services = {
    sitesUrl: string
};

type ConfigType = {
    errorMessage: string;
    vhost: string;
    contentPath: string;
    services: Services
};

declare const CONFIG: ConfigType;
