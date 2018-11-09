package com.enonic.app.siteimprove.rest.json.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SiteimproveDciOverviewRequestJson
    extends SiteimproveServiceGeneralRequestJson
{
    private Long groupId;

    private Long siteId;

    @JsonCreator
    public SiteimproveDciOverviewRequestJson( @JsonProperty("site_id") final Long siteId, @JsonProperty("group_id") final Long groupId )
    {
        this.siteId = siteId;
        this.groupId = groupId;
    }

    public Long getGroupId()
    {
        return groupId;
    }

    public void setGroupId( final Long groupId )
    {
        this.groupId = groupId;
    }

    public Long getSiteId()
    {
        return siteId;
    }

    public void setSiteId( final Long siteId )
    {
        this.siteId = siteId;
    }
}
