package com.enonic.app.siteimprove.rest.json.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SiteimproveListPagesRequestJson
    extends SiteimproveServiceGeneralRequestJson
{
    private Long groupId;

    private Long siteId;

    private Long page;

    private Long pageSize;

    @JsonCreator
    public SiteimproveListPagesRequestJson( @JsonProperty("group_id") final Long groupId, @JsonProperty("site_id") final Long siteId,
                                            @JsonProperty("page") final Long page, @JsonProperty("page_size") final Long pageSize )
    {
        this.groupId = groupId;
        this.siteId = siteId;
        this.page = page;
        this.pageSize = pageSize;
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

    public Long getPage()
    {
        return page;
    }

    public void setPage( final Long page )
    {
        this.page = page;
    }

    public Long getPageSize()
    {
        return pageSize;
    }

    public void setPageSize( final Long pageSize )
    {
        this.pageSize = pageSize;
    }
}
