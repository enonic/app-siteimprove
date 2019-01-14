package com.enonic.app.siteimprove.resource;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import javax.ws.rs.core.Response;

import com.enonic.app.siteimprove.rest.json.PageApiJson;
import com.enonic.app.siteimprove.rest.json.PageReportLinksJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveLinksJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveListPagesJson;
import com.enonic.app.siteimprove.rest.json.SiteimprovePageSummaryJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveListPagesRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimprovePageRequestJson;
import com.enonic.app.siteimprove.rest.resource.SiteimproveService;
import com.enonic.xp.lib.content.BaseContextHandler;
import com.enonic.xp.script.bean.BeanContext;

public final class PageReportLinksHandler
    extends BaseContextHandler
{
    private Supplier<SiteimproveService> siteimproveService;

    private Long siteId;

    @Override
    protected PageReportLinksMapper doExecute()
    {
        try
        {
            final List<PageApiJson> pages = this.fetchPages( this.siteId );
            final Optional<PageApiJson> rootPage =
                pages.stream().min( Comparator.comparingInt( ( PageApiJson a ) -> a.getUrl().length() ) );
            if ( rootPage.isPresent() )
            {
                final Long rootPageId = rootPage.get().getId();
                final SiteimprovePageSummaryJson rootPageSummary = this.fetchPageSummary( this.siteId, rootPageId );
                final PageReportLinksJson links = this.buildPageReportLinks( rootPageSummary );

                return new PageReportLinksMapper( links );
            }

            return null;
        }
        catch ( Exception e )
        {
            return null;
        }
    }

    public void setSiteId( final Long siteId )
    {
        this.siteId = siteId;
    }

    private List<PageApiJson> fetchPages( final Long siteId )
        throws IOException, URISyntaxException
    {
        final Response response = this.siteimproveService.get().listPages( new SiteimproveListPagesRequestJson( null, siteId, 1L, 1000L ) );
        return ( (SiteimproveListPagesJson) response.getEntity() ).getItems();

    }

    private SiteimprovePageSummaryJson fetchPageSummary( final Long siteId, final Long pageId )
        throws IOException, URISyntaxException
    {
        final Response response = this.siteimproveService.get().pageSummary( new SiteimprovePageRequestJson( siteId, pageId, null ) );
        return ( (SiteimprovePageSummaryJson) response.getEntity() );

    }

    private PageReportLinksJson buildPageReportLinks( SiteimprovePageSummaryJson pageSummary )
    {
        final PageReportLinksJson pageReportLinks = new PageReportLinksJson();

        final SiteimproveLinksJson links = pageSummary.getSiteimproveLinks();
        if ( links != null )
        {
            if ( links.getQa() != null && links.getQa().getPageReport() != null )
            {
                pageReportLinks.setQa( links.getQa().getPageReport().getHref() );
            }
            if ( links.getAccessibility() != null && links.getAccessibility().getPageReport() != null )
            {
                pageReportLinks.setAccessibility( links.getAccessibility().getPageReport().getHref() );
            }
            if ( links.getSeo() != null && links.getSeo().getPageReport() != null )
            {
                pageReportLinks.setSeo( links.getSeo().getPageReport().getHref() );
            }
        }

        return pageReportLinks;
    }

    @Override
    public void initialize( final BeanContext context )
    {
        this.siteimproveService = context.getService( SiteimproveService.class );
    }
}
