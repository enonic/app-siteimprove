package com.enonic.app.siteimprove.rest.json.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SiteimprovePageByUrlRequestJson
    extends SiteimproveServiceGeneralRequestJson
{
    private Long siteId;

    private String url;

    @JsonCreator
    public SiteimprovePageByUrlRequestJson( @JsonProperty("site_id") final Long siteId, @JsonProperty("url") final String url )
    {
        this.siteId = siteId;
        this.url = url;
    }

    public Long getSiteId()
    {
        return siteId;
    }

    public void setSiteId( final Long siteId )
    {
        this.siteId = siteId;
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
