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

