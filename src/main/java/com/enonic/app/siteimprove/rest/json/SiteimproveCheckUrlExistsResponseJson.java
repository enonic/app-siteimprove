package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

public class SiteimproveCheckUrlExistsResponseJson
{
    private Boolean exist;

    public Boolean isExist()
    {
        return exist;
    }

    @JsonProperty("exist")
    public void setExist( final Boolean exist )
    {
        this.exist = exist;
    }
}
