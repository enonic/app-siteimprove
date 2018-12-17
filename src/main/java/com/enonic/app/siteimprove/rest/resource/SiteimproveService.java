package com.enonic.app.siteimprove.rest.resource;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Map;

import javax.ws.rs.core.Response;

import com.google.common.annotations.Beta;

import com.enonic.app.siteimprove.rest.json.resource.SiteimproveListPagesRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveListSitesRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimprovePageRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveServiceGeneralRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveSiteRequestJson;

@Beta
public interface SiteimproveService
{
    void activate( final Map<String, String> map );

    Response pingAccount( final SiteimproveServiceGeneralRequestJson json )
        throws IOException;

    Response listSites( final SiteimproveListSitesRequestJson json )
        throws IOException, URISyntaxException;

    Response dciOverview( final SiteimproveSiteRequestJson json )
        throws IOException, URISyntaxException;

    Response crawlStatus( final SiteimproveSiteRequestJson json )
        throws IOException, URISyntaxException;

    Response crawl( final SiteimproveSiteRequestJson json )
        throws IOException;

    Response listPages( final SiteimproveListPagesRequestJson json )
        throws IOException, URISyntaxException;

    Response pageSummary( final SiteimprovePageRequestJson json )
        throws IOException, URISyntaxException;

    Response checkStatus( final SiteimprovePageRequestJson json )
        throws IOException, URISyntaxException;

    Response check( final SiteimprovePageRequestJson json )
        throws IOException;
}
