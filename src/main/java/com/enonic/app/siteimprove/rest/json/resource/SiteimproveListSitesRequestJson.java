package com.enonic.app.siteimprove.rest.json.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SiteimproveListSitesRequestJson
    extends SiteimproveServiceGeneralRequestJson
{
    private Long groupId;

    private Long page;

    private Long pageSize;

    @JsonCreator
    public SiteimproveListSitesRequestJson( @JsonProperty("group_id") final Long groupId, @JsonProperty("page") final Long page,
                                            @JsonProperty("page_size") final Long pageSize )
    {
        this.groupId = groupId;
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
