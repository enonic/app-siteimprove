package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SiteimproveCheckStatusJson
{
    private Boolean checkAllowed;

    private Boolean checkingNow;

    private String lastSeen;

    public Boolean getCheckAllowed()
    {
        return checkAllowed;
    }

    @JsonProperty("check_allowed")
    public void setCheckAllowed( final Boolean checkAllowed )
    {
        this.checkAllowed = checkAllowed;
    }

    public Boolean getCheckingNow()
    {
        return checkingNow;
    }

    @JsonProperty("checking_now")
    public void setCheckingNow( final Boolean checkingNow )
    {
        this.checkingNow = checkingNow;
    }

    public String getLastSeen()
    {
        return lastSeen;
    }

    @JsonProperty("last_seen")
    public void setLastSeen( final String lastSeen )
    {
        this.lastSeen = lastSeen;
    }

}
