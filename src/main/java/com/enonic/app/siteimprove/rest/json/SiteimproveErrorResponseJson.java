package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

public class SiteimproveErrorResponseJson
{
    private String message;

    private String type;

    public String getMessage()
    {
        return message;
    }

    public String getType()
    {
        return type;
    }

    @JsonProperty("message")
    public void setMessage( final String message )
    {
        this.message = message;
    }

    @JsonProperty("type")
    public void setType( final String type )
    {
        this.type = type;
    }
}
