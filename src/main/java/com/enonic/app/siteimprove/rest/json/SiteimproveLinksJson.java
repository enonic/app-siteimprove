package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

public class SiteimproveLinksJson
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
