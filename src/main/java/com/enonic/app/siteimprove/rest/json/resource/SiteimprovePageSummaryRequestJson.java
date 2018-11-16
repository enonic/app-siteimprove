package com.enonic.app.siteimprove.rest.json.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SiteimprovePageSummaryRequestJson
    extends SiteimproveServiceGeneralRequestJson
{
    private Long groupId;

    private Long siteId;

    private Long pageId;

    @JsonCreator
    public SiteimprovePageSummaryRequestJson( @JsonProperty("site_id") final Long siteId, @JsonProperty("page_id") final Long pageId,
                                              @JsonProperty("group_id") final Long groupId )
    {
        this.siteId = siteId;
        this.pageId = pageId;
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

    public Long getPageId()
    {
        return pageId;
    }

    public void setPageId( final Long pageId )
    {
        this.pageId = pageId;
    }
}
