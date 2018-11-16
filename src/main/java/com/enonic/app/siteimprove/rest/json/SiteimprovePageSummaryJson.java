package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SiteimprovePageSummaryJson
{
    private Long id;

    private String title;

    private String url;

    private SiteimproveSummaryJson summary;

    private SiteimproveLinksJson siteimproveLinks;

    public Long getId()
    {
        return id;
    }

    @JsonProperty("id")
    public void setId( final Long id )
    {
        this.id = id;
    }

    public String getTitle()
    {
        return title;
    }

    @JsonProperty("title")
    public void setTitle( final String title )
    {
        this.title = title;
    }

    public String getUrl()
    {
        return url;
    }

    @JsonProperty("url")
    public void setUrl( final String url )
    {
        this.url = url;
    }

    public SiteimproveSummaryJson getSummary()
    {
        return summary;
    }

    @JsonProperty("summary")
    public void setSummary( final SiteimproveSummaryJson summary )
    {
        this.summary = summary;
    }

    public SiteimproveLinksJson getSiteimproveLinks()
    {
        return siteimproveLinks;
    }

    @JsonProperty("_siteimprove")
    public void setSiteimproveLinks( final SiteimproveLinksJson siteimproveLinks )
    {
        this.siteimproveLinks = siteimproveLinks;
    }
}

class SiteimproveSummaryJson
{
    private PageDciJson dci;

    private PageStatusJson status;

    private AccessibilitySummaryJson accessibility;

    private QASummaryJson qa;

    private SEOSummaryJson seo;

    public PageDciJson getDci()
    {
        return dci;
    }

    @JsonProperty("dci")
    public void setDci( final PageDciJson dci )
    {
        this.dci = dci;
    }

    public PageStatusJson getStatus()
    {
        return status;
    }

    @JsonProperty("page")
    public void setStatus( final PageStatusJson status )
    {
        this.status = status;
    }

    public AccessibilitySummaryJson getAccessibility()
    {
        return accessibility;
    }

    @JsonProperty("accessibility")
    public void setAccessibility( final AccessibilitySummaryJson accessibility )
    {
        this.accessibility = accessibility;
    }

    public QASummaryJson getQa()
    {
        return qa;
    }

    @JsonProperty("quality_assurance")
    public void setQa( final QASummaryJson qa )
    {
        this.qa = qa;
    }

    public SEOSummaryJson getSeo()
    {
        return seo;
    }

    @JsonProperty("seov2")
    public void setSeo( final SEOSummaryJson seo )
    {
        this.seo = seo;
    }
}

class PageDciJson
{
    private Float total;

    public Float getTotal()
    {
        return total;
    }

    public void setTotal( final Float total )
    {
        this.total = total;
    }
}

class PageStatusJson
{
    private String lastSeen;

    public String getLastSeen()
    {
        return lastSeen;
    }

    @JsonProperty("last_seen")
    public void setLastSeen( final String lastSeen )
    {
        this.lastSeen = lastSeen;
    }
}

class AccessibilitySummaryJson
{
    private Long aErrors;

    private Long aaErrors;

    private Long aaaErrors;

    public Long getaErrors()
    {
        return aErrors;
    }

    @JsonProperty("a_errors")
    public void setaErrors( final Long aErrors )
    {
        this.aErrors = aErrors;
    }

    public Long getAaErrors()
    {
        return aaErrors;
    }

    @JsonProperty("aa_errors")
    public void setAaErrors( final Long aaErrors )
    {
        this.aaErrors = aaErrors;
    }

    public Long getAaaErrors()
    {
        return aaaErrors;
    }

    @JsonProperty("aaa_errors")
    public void setAaaErrors( final Long aaaErrors )
    {
        this.aaaErrors = aaaErrors;
    }
}

class QASummaryJson
{
    private Long brokenLinks;

    private Long misspellings;

    private Long potentialMisspellings;

    public Long getBrokenLinks()
    {
        return brokenLinks;
    }

    @JsonProperty("broken_links")
    public void setBrokenLinks( final Long brokenLinks )
    {
        this.brokenLinks = brokenLinks;
    }

    public Long getMisspellings()
    {
        return misspellings;
    }

    @JsonProperty("misspellings")
    public void setMisspellings( final Long misspellings )
    {
        this.misspellings = misspellings;
    }

    public Long getPotentialMisspellings()
    {
        return potentialMisspellings;
    }

    @JsonProperty("potential_misspellings")
    public void setPotentialMisspellings( final Long potentialMisspellings )
    {
        this.potentialMisspellings = potentialMisspellings;
    }
}

class SEOSummaryJson
{
    private Long contentIssues;

    private Long technicalIssues;

    private Long uxIssues;

    public Long getContentIssues()
    {
        return contentIssues;
    }

    @JsonProperty("content_issues")
    public void setContentIssues( final Long contentIssues )
    {
        this.contentIssues = contentIssues;
    }

    public Long getTechnicalIssues()
    {
        return technicalIssues;
    }

    @JsonProperty("technical_issues")
    public void setTechnicalIssues( final Long technicalIssues )
    {
        this.technicalIssues = technicalIssues;
    }

    public Long getUxIssues()
    {
        return uxIssues;
    }

    @JsonProperty("ux_issues")
    public void setUxIssues( final Long uxIssues )
    {
        this.uxIssues = uxIssues;
    }
}

class SiteimproveLinksJson
{
    private PageReportLinkJson accessibility;

    private PageReportLinkJson policy;

    private PageReportLinkJson qa;

    private PageReportLinkJson seo;

    public PageReportLinkJson getAccessibility()
    {
        return accessibility;
    }

    public void setAccessibility( final PageReportLinkJson accessibility )
    {
        this.accessibility = accessibility;
    }

    public PageReportLinkJson getPolicy()
    {
        return policy;
    }

    public void setPolicy( final PageReportLinkJson policy )
    {
        this.policy = policy;
    }

    public PageReportLinkJson getQa()
    {
        return qa;
    }

    @JsonProperty("quality_assurance")
    public void setQa( final PageReportLinkJson qa )
    {
        this.qa = qa;
    }

    public PageReportLinkJson getSeo()
    {
        return seo;
    }

    public void setSeo( final PageReportLinkJson seo )
    {
        this.seo = seo;
    }
}

class PageReportLinkJson
{
    private HrefJson pageReport;

    public HrefJson getPageReport()
    {
        return pageReport;
    }

    @JsonProperty("page_report")
    public void setPageReport( final HrefJson pageReport )
    {
        this.pageReport = pageReport;
    }
}
