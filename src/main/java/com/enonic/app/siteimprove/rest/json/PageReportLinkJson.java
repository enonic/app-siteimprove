package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

public class PageReportLinkJson
{
    private HrefJson pageReport;

    public HrefJson getPageReport()
    {
        return pageReport;
    }

    @JsonProperty("page_report")
    public void setPageReport( final HrefJson pageReport )
    {
        this.pageReport = pageReport;
    }
}
