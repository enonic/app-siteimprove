package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class SiteimprovePingJson
{
    private String status;

    private PingLinksJson links;

    public String getStatus()
    {
        return status;
    }

    public PingLinksJson getLinks()
    {
        return links;
    }

    @JsonProperty("status")
    public void setStatus( final String status )
    {
        this.status = status;
    }

    @JsonProperty("_links")
    public void setLinks( final PingLinksJson links )
    {
        this.links = links;
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
class PingLinksJson
{
    private HrefJson self;

    public HrefJson getSelf()
    {
        return self;
    }

    public void setSelf( final HrefJson self )
    {
        this.self = self;
    }
}

class HrefJson
{

    private String href;

    public String getHref()
    {
        return href;
    }

    public void setHref( final String href )
    {
        this.href = href;
    }
}
