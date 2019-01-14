package com.enonic.app.siteimprove.data;

public class PageOfSite
{
    private Long siteId;

    private Long pageId;

    private String pageUrl;

    public PageOfSite( final Long siteId, final String pageUrl )
    {
        this.siteId = siteId;
        this.pageUrl = pageUrl;
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

    public String getPageUrl()
    {
        return pageUrl;
    }

    public void setPageUrl( final String pageUrl )
    {
        this.pageUrl = pageUrl;
    }
}
