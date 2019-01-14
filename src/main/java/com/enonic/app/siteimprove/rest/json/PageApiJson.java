package com.enonic.app.siteimprove.rest.json;

public class PageApiJson
{
    private Long id;

    private String title;

    private String url;

    public Long getId()
    {
        return id;
    }

    public void setId( final Long id )
    {
        this.id = id;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle( final String title )
    {
        this.title = title;
    }

    public String getUrl()
    {
        return url;
    }

    public void setUrl( final String url )
    {
        this.url = url;
    }
}
