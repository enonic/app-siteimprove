package com.enonic.app.siteimprove.rest.json;

import org.codehaus.jackson.annotate.JsonProperty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SiteimproveDciOverallScoreJson
{
    private AccessibilityScoreJson accessibility;

    private QAScoreJson qa;

    private SEOScoreJson seo;

    private Float total;

    public AccessibilityScoreJson getAccessibility()
    {
        return accessibility;
    }

    @JsonProperty("accessibility")
    public void setAccessibility( final AccessibilityScoreJson accessibility )
    {
        this.accessibility = accessibility;
    }

    public QAScoreJson getQa()
    {
        return qa;
    }

    @JsonProperty("qa")
    public void setQa( final QAScoreJson qa )
    {
        this.qa = qa;
    }

    public SEOScoreJson getSeo()
    {
        return seo;
    }

    @JsonProperty("seo")
    public void setSeo( final SEOScoreJson seo )
    {
        this.seo = seo;
    }

    public Float getTotal()
    {
        return total;
    }

    @JsonProperty("total")
    public void setTotal( final Float total )
    {
        this.total = total;
    }
}

class AccessibilityScoreJson
{
    private Float errorpages;

    private Float errors;

    private Float warnings;

    private Float total;

    public Float getErrorpages()
    {
        return errorpages;
    }

    public void setErrorpages( final Float errorpages )
    {
        this.errorpages = errorpages;
    }

    public Float getErrors()
    {
        return errors;
    }

    public void setErrors( final Float errors )
    {
        this.errors = errors;
    }

    public Float getWarnings()
    {
        return warnings;
    }

    public void setWarnings( final Float warnings )
    {
        this.warnings = warnings;
    }

    public Float getTotal()
    {
        return total;
    }

    public void setTotal( final Float total )
    {
        this.total = total;
    }
}


class QAScoreJson
{
    private Float content;

    private Float freshness;

    private Float security;

    private Float ux;

    private Float total;

    public Float getContent()
    {
        return content;
    }

    public void setContent( final Float content )
    {
        this.content = content;
    }

    public Float getFreshness()
    {
        return freshness;
    }

    public void setFreshness( final Float freshness )
    {
        this.freshness = freshness;
    }

    public Float getSecurity()
    {
        return security;
    }

    public void setSecurity( final Float security )
    {
        this.security = security;
    }

    public Float getUx()
    {
        return ux;
    }

    public void setUx( final Float ux )
    {
        this.ux = ux;
    }

    public Float getTotal()
    {
        return total;
    }

    public void setTotal( final Float total )
    {
        this.total = total;
    }
}

class SEOScoreJson
{
    private Float content;

    private Float mobile;

    private Float technical;

    private Float ux;

    private Float total;

    public Float getContent()
    {
        return content;
    }

    public void setContent( final Float content )
    {
        this.content = content;
    }

    public Float getMobile()
    {
        return mobile;
    }

    public void setMobile( final Float mobile )
    {
        this.mobile = mobile;
    }

    public Float getTechnical()
    {
        return technical;
    }

    public void setTechnical( final Float technical )
    {
        this.technical = technical;
    }

    public Float getUx()
    {
        return ux;
    }

    public void setUx( final Float ux )
    {
        this.ux = ux;
    }

    public Float getTotal()
    {
        return total;
    }

    public void setTotal( final Float total )
    {
        this.total = total;
    }
}
