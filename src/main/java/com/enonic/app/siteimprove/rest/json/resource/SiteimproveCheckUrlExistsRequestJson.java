package com.enonic.app.siteimprove.rest.json.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SiteimproveCheckUrlExistsRequestJson
{
    private String url;

    @JsonCreator
    public SiteimproveCheckUrlExistsRequestJson( @JsonProperty("url") final String url )
    {
        this.url = url;
    }

    public String getUrl()
    {
        return url;
    }

    public void setUrl( final String url )
    {
        this.url = url;
    }
}
