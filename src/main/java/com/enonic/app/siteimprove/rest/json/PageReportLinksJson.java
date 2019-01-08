package com.enonic.app.siteimprove.rest.json;

public class PageReportLinksJson
{
    private String qa;

    private String accessibility;

    private String seo;

    public String getQa()
    {
        return qa;
    }

    public void setQa( final String qa )
    {
        this.qa = qa;
    }

    public String getAccessibility()
    {
        return accessibility;
    }

    public void setAccessibility( final String accessibility )
    {
        this.accessibility = accessibility;
    }

    public String getSeo()
    {
        return seo;
    }

    public void setSeo( final String seo )
    {
        this.seo = seo;
    }
}
