export type ServiceUrl = {
    [key: string]: string
};

export type SiteimproveWidgetConfig = {
    widgetId: string,
    contentPath: string,
    vhost: string,
    errorMessage: string,
    services: ServiceUrl
};
