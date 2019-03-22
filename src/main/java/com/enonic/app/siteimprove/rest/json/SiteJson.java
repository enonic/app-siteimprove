package com.enonic.app.siteimprove.rest.json;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class SiteJson
{
    private Long id;

    private String siteName;

    private String url;

    private Long pages;

    private Long policies;

    private List<String> product;

    private Long visits;

    public Long getId()
    {
        return id;
    }

    public void setId( final Long id )
    {
        this.id = id;
    }

    public String getSiteName()
    {
        return siteName;
    }

    @JsonProperty("site_name")
    public void setSiteName( final String siteName )
    {
        this.siteName = siteName;
    }

    public String getUrl()
    {
        return url;
    }

    public void setUrl( final String url )
    {
        this.url = url;
    }

    public Long getPages()
    {
        return pages;
    }

    public void setPages( final Long pages )
    {
        this.pages = pages;
    }

    public Long getPolicies()
    {
        return policies;
    }

    public void setPolicies( final Long policies )
    {
        this.policies = policies;
    }

    public List<String> getProduct()
    {
        return product;
    }

    public void setProduct( final List<String> product )
    {
        this.product = product;
    }

    public Long getVisits()
    {
        return visits;
    }

    public void setVisits( final Long visits )
    {
        this.visits = visits;
    }
}

