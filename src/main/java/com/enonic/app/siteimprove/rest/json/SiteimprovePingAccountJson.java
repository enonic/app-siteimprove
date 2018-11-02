package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

public class SiteimprovePingAccountJson
    extends SiteimproveJson
{
    private PingLinksJson links;

    public PingLinksJson getLinks()
    {
        return links;
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

