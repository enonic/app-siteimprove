package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

public class SiteimproveJson
{
    private String status;

    public String getStatus()
    {
        return status;
    }

    @JsonProperty("status")
    public void setStatus( final String status )
    {
        this.status = status;
    }
}
