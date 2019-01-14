package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SiteimproveJobJson
{

    private String message;

    private Long statusCode;

    private Boolean success;

    public String getMessage()
    {
        return message;
    }

    @JsonProperty("message")
    public void setMessage( final String message )
    {
        this.message = message;
    }

    public Long getStatusCode()
    {
        return statusCode;
    }

    @JsonProperty("status_сode")
    public void setStatusCode( final Long statusCode )
    {
        this.statusCode = statusCode;
    }

    public Boolean getSuccess()
    {
        return success;
    }

    @JsonProperty("success")
    public void setSuccess( final Boolean success )
    {
        this.success = success;
    }
}
