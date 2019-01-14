package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SiteimproveCrawlStatusJson
{
    private Boolean isCrawlEnabled;

    private Boolean isCrawlRunning;

    private String lastCrawl;

    private String nextCrawl;

    private String permission;

    public Boolean getCrawlEnabled()
    {
        return isCrawlEnabled;
    }

    @JsonProperty("is_crawl_enabled")
    public void setCrawlEnabled( final Boolean crawlEnabled )
    {
        isCrawlEnabled = crawlEnabled;
    }

    public Boolean getCrawlRunning()
    {
        return isCrawlRunning;
    }

    @JsonProperty("is_crawl_running")
    public void setCrawlRunning( final Boolean crawlRunning )
    {
        isCrawlRunning = crawlRunning;
    }

    public String getLastCrawl()
    {
        return lastCrawl;
    }

    @JsonProperty("last_crawl")
    public void setLastCrawl( final String lastCrawl )
    {
        this.lastCrawl = lastCrawl;
    }

    public String getNextCrawl()
    {
        return nextCrawl;
    }

    @JsonProperty("next_crawl")
    public void setNextCrawl( final String nextCrawl )
    {
        this.nextCrawl = nextCrawl;
    }

    public String getPermission()
    {
        return permission;
    }

    @JsonProperty("permission")
    public void setPermission( final String permission )
    {
        this.permission = permission;
    }
}
