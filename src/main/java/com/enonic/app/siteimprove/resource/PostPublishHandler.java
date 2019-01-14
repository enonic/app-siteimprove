package com.enonic.app.siteimprove.resource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.ws.rs.core.Response;

import org.apache.commons.lang.ArrayUtils;

import com.enonic.app.siteimprove.data.PageOfSite;
import com.enonic.app.siteimprove.rest.json.PageApiJson;
import com.enonic.app.siteimprove.rest.json.SiteJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveListPagesJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveListSitesJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveListPagesRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveListSitesRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimprovePageRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveSiteRequestJson;
import com.enonic.app.siteimprove.rest.resource.SiteimproveService;
import com.enonic.xp.lib.content.BaseContextHandler;
import com.enonic.xp.script.bean.BeanContext;

public final class PostPublishHandler
    extends BaseContextHandler
{
    private Supplier<SiteimproveService> siteimproveService;

    private List<String> sites;

    private List<String> pages;

    @Override
    protected Boolean doExecute()
    {
        try
        {
            if ( sites.size() == 0 && pages.size() == 0 )
            {
                return true;
            }

            final List<SiteJson> allSites = fetchSites();

            if ( sites.size() > 0 )
            {
                final List<Long> siteToCrawlIds = sites.stream().map( PostPublishHandler::makeUrl ).filter( Objects::nonNull ).map(
                    v -> PostPublishHandler.findSite( v, allSites ).map( SiteJson::getId ).orElse( null ) ).filter(
                    Objects::nonNull ).distinct().collect( Collectors.toList() );

                siteToCrawlIds.forEach( id -> {
                    try
                    {
                        this.siteimproveService.get().crawl( new SiteimproveSiteRequestJson( id, null ) );
                    }
                    catch ( IOException e )
                    {
                        e.printStackTrace();
                    }
                } );
            }

            if ( pages.size() > 0 )
            {
                final List<PageOfSite> pageOfSites = pages.stream().map(
                    v -> PostPublishHandler.findSiteForPage( v, allSites ).map( s -> new PageOfSite( s.getId(), v ) ).orElse(
                        null ) ).filter( Objects::nonNull ).collect( Collectors.toList() );

                final List<PageApiJson> allPages = pageOfSites.stream().map( PageOfSite::getSiteId ).distinct().map( v -> {
                    try
                    {
                        return this.fetchPages( v );
                    }
                    catch ( Exception e )
                    {
                        e.printStackTrace();
                        return Collections.EMPTY_LIST;
                    }
                } ).flatMap( List<PageApiJson>::stream ).collect( Collectors.toList() );

                pageOfSites.forEach( v -> {
                    final Long pageId = PostPublishHandler.findPage( v.getPageUrl(), allPages ).map( PageApiJson::getId ).orElse( null );
                    v.setPageId( pageId );
                } );

                pageOfSites.forEach( v -> {
                    if ( v.getPageId() != null )
                    {
                        try
                        {
                            this.siteimproveService.get().check( new SiteimprovePageRequestJson( v.getSiteId(), v.getPageId(), null ) );
                        }
                        catch ( IOException e )
                        {
                            e.printStackTrace();
                        }
                    }
                } );
            }

            return true;
        }
        catch ( Exception e )
        {
            return false;
        }
    }

    public void setSites( final String[] values )
    {
        final String[] sites = values == null ? ArrayUtils.EMPTY_STRING_ARRAY : values;
        this.sites = Stream.of( sites ).filter( Objects::nonNull ).collect( Collectors.toList() );
    }

    public void setPages( final String[] values )
    {
        final String[] pages = values == null ? ArrayUtils.EMPTY_STRING_ARRAY : values;
        this.pages = Stream.of( pages ).filter( Objects::nonNull ).collect( Collectors.toList() );
    }

    private static URL makeUrl( final String url )
    {
        try
        {
            return new URL( url );
        }
        catch ( MalformedURLException e )
        {
            return null;
        }
    }

    private List<SiteJson> fetchSites()
        throws IOException, URISyntaxException
    {
        final Response response = this.siteimproveService.get().listSites( new SiteimproveListSitesRequestJson( null, 1L, 1000L ) );
        return ( (SiteimproveListSitesJson) response.getEntity() ).getItems();

    }

    private List<PageApiJson> fetchPages( final Long siteId )
        throws IOException, URISyntaxException
    {
        final Response response = this.siteimproveService.get().listPages( new SiteimproveListPagesRequestJson( null, siteId, 1L, 1000L ) );
        return ( (SiteimproveListPagesJson) response.getEntity() ).getItems();

    }

    private static Optional<SiteJson> findSite( final URL siteUrl, final List<SiteJson> sites )
    {
        return sites.stream().filter( v -> PostPublishHandler.compareUrls( siteUrl.toString(), v.getUrl() ) ).findFirst();
    }

    private static Optional<PageApiJson> findPage( final String pageUrl, final List<PageApiJson> pages )
    {
        return pages.stream().filter( v -> PostPublishHandler.compareUrls( pageUrl, v.getUrl() ) ).findFirst();
    }

    private static Boolean compareUrls( final String url1, final String url2 )
    {
        try
        {
            final URL urlA = new URL( url1.replaceFirst( "\\/+$", "" ) );
            final URL urlB = new URL( url2.replaceFirst( "\\/+$", "" ) );
            return urlA.sameFile( urlB );
        }
        catch ( MalformedURLException e )
        {
            return false;
        }
    }

    private static Optional<SiteJson> findSiteForPage( final String pageUrl, final List<SiteJson> sites )
    {
        return sites.stream().filter( v -> pageUrl.contains( v.getUrl() ) ).findFirst();
    }

    @Override
    public void initialize( final BeanContext context )
    {
        this.siteimproveService = context.getService( SiteimproveService.class );
    }
}
