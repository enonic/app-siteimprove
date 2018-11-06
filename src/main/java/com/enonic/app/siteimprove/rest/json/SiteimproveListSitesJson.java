package com.enonic.app.siteimprove.rest.json;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SiteimproveListSitesJson
{
    private List<SiteJson> items;

    private Long totalItems;

    private Long totalPages;

    public List<SiteJson> getItems()
    {
        return items;
    }

    @JsonProperty("items")
    public void setItems( final List<SiteJson> items )
    {
        this.items = items;
    }

    public Long getTotalItems()
    {
        return totalItems;
    }

    @JsonProperty("total_items")
    public void setTotalItems( final Long totalItems )
    {
        this.totalItems = totalItems;
    }

    public Long getTotalPages()
    {
        return totalPages;
    }

    @JsonProperty("total_pages")
    public void setTotalPages( final Long totalPages )
    {
        this.totalPages = totalPages;
    }
}

class SiteJson
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
