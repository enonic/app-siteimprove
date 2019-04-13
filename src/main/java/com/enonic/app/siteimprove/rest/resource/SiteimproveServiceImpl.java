package com.enonic.app.siteimprove.rest.resource;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.http.HttpEntity;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpHead;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

import com.google.common.base.Strings;

import com.enonic.app.siteimprove.rest.json.SiteimproveCheckStatusJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveCheckUrlExistsResponseJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveCrawlStatusJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveDciOverallScoreJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveErrorResponseJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveJobJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveListPagesJson;
import com.enonic.app.siteimprove.rest.json.SiteimproveListSitesJson;
import com.enonic.app.siteimprove.rest.json.SiteimprovePageSummaryJson;
import com.enonic.app.siteimprove.rest.json.SiteimprovePingJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveCheckUrlExistsRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveListPagesRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveListSitesRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimprovePageByUrlRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimprovePageRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveServiceGeneralRequestJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveSiteRequestJson;
import com.enonic.xp.jaxrs.JaxRsComponent;
import com.enonic.xp.security.RoleKeys;

@Path("admin/rest/siteimprove")
@RolesAllowed(RoleKeys.ADMIN_ID)
@Component(immediate = true, configurationPid = "com.enonic.app.siteimprove", property = "group=admin")
@Produces(MediaType.APPLICATION_JSON)
public class SiteimproveServiceImpl
    implements JaxRsComponent, SiteimproveService
{
    private static final String SITEIMPROVE_API_URL = "https://api.siteimprove.com/v2";

    private static final String SITEIMPROVE_APIKEY_CONFIG_KEY = "siteimprove.apikey";

    private static final String SITEIMPROVE_USERNAME_CONFIG_KEY = "siteimprove.username";

    private static final String CONFIG_ERROR_MESSAGE = "Siteconfig API key and/or username not found in the config file";

    private String siteimproveApiKey;

    private String username;

    private CredentialsProvider provider;

    @Activate
    public void activate( final Map<String, String> map )
    {
        this.siteimproveApiKey = map.get( SITEIMPROVE_APIKEY_CONFIG_KEY );
        if ( this.siteimproveApiKey != null )
        {
            this.siteimproveApiKey = this.siteimproveApiKey.trim();
        }
        this.username = map.get( SITEIMPROVE_USERNAME_CONFIG_KEY );
        if ( this.username != null )
        {
            this.username = this.username.trim();
        }

        if ( this.siteimproveApiKey != null && this.username != null )
        {
            final UsernamePasswordCredentials credentials = new UsernamePasswordCredentials( this.username, this.siteimproveApiKey );
            this.provider = new BasicCredentialsProvider();
            this.provider.setCredentials( AuthScope.ANY, credentials );
        }
    }

    private boolean isConfigOk()
    {
        if ( Strings.isNullOrEmpty( this.siteimproveApiKey ) || Strings.isNullOrEmpty( this.username ) )
        {
            return false;
        }
        return true;
    }

    @POST
    @Path("сheckurlexists")
    public Response checkUrlExists( final SiteimproveCheckUrlExistsRequestJson json )
        throws IOException
    {
        final HttpRequestBase httpRequest = makeCheckUrlExistsRequest( json );
        CloseableHttpResponse response = null;
        try
        {
            response = HttpClients.custom().build().execute( httpRequest );

            int statusCode = response.getStatusLine().getStatusCode();

            final Boolean exists = statusCode < 400 || statusCode >= 500;

            final SiteimproveCheckUrlExistsResponseJson jsonResponse = new SiteimproveCheckUrlExistsResponseJson();
            jsonResponse.setExist( exists );

            return Response.status( 200 ).entity( jsonResponse ).build();
        }
        finally
        {
            response.close();
        }
    }

    @POST
    @Path("ping/account")
    public Response pingAccount( final SiteimproveServiceGeneralRequestJson json )
        throws IOException
    {
        return doSiteimproveAPICall( makePingAccountSiteimproveApiRequest(), SiteimprovePingJson.class );
    }

    @POST
    @Path("sites")
    public Response listSites( final SiteimproveListSitesRequestJson json )
        throws IOException, URISyntaxException
    {
        return doSiteimproveAPICall( makeListSitesSiteimproveApiRequest( json ), SiteimproveListSitesJson.class );
    }

    @POST
    @Path("dci/overview")
    public Response dciOverview( final SiteimproveSiteRequestJson json )
        throws IOException, URISyntaxException
    {
        return doSiteimproveAPICall( makeDciScoreSiteimproveApiRequest( json ), SiteimproveDciOverallScoreJson.class );
    }

    @POST
    @Path("crawl/status")
    public Response crawlStatus( final SiteimproveSiteRequestJson json )
        throws IOException, URISyntaxException
    {
        return doSiteimproveAPICall( makeCrawlStatusSiteimproveApiRequest( json ), SiteimproveCrawlStatusJson.class );
    }

    @POST
    @Path("crawl")
    public Response crawl( final SiteimproveSiteRequestJson json )
        throws IOException
    {
        return doSiteimproveAPICall( makeCrawlSiteimproveApiRequest( json ), SiteimproveJobJson.class );
    }

    @POST
    @Path("pages")
    public Response listPages( final SiteimproveListPagesRequestJson json )
        throws IOException, URISyntaxException
    {
        return doSiteimproveAPICall( makeListPagesSiteimproveApiRequest( json ), SiteimproveListPagesJson.class );
    }

    @POST
    @Path("page/summary")
    public Response pageSummary( final SiteimprovePageRequestJson json )
        throws IOException, URISyntaxException
    {
        return doSiteimproveAPICall( makePageSummarySiteimproveApiRequest( json ), SiteimprovePageSummaryJson.class );
    }

    private <T> Response doSiteimproveAPICall( final HttpRequestBase httpRequest, final Class<T> responseJsonClass )
        throws IOException
    {
        if ( !isConfigOk() )
        {
            return Response.status( Response.Status.UNAUTHORIZED ).entity( CONFIG_ERROR_MESSAGE ).build();
        }

        CloseableHttpResponse response = null;
        try
        {
            response = HttpClients.custom().setDefaultCredentialsProvider( this.provider ).build().execute( httpRequest );

            int statusCode = response.getStatusLine().getStatusCode();

            if ( statusCode == 200 || statusCode == 201 || statusCode == 202 )
            {
                return Response.ok( parseSiteimproveHttpResponse( response, responseJsonClass ) ).build();
            }
            else
            {
                final SiteimproveErrorResponseJson errorJson = new SiteimproveErrorResponseJson();
                errorJson.setMessage( translateBadResponse( response ) );
                errorJson.setType( Integer.toString( statusCode ) );
                return Response.status( statusCode ).
                    entity( errorJson ).build();
            }
        }
        finally
        {
            response.close();
        }
    }

    @POST
    @Path("check/status")
    public Response checkStatus( final SiteimprovePageRequestJson json )
        throws IOException, URISyntaxException
    {
        return doSiteimproveAPICall( makeCheckStatusSiteimproveApiRequest( json ), SiteimproveCheckStatusJson.class );
    }

    @POST
    @Path("check")
    public Response check( final SiteimprovePageRequestJson json )
        throws IOException
    {
        return doSiteimproveAPICall( makeCheckSiteimproveApiRequest( json ), SiteimproveJobJson.class );
    }

    @POST
    @Path("checkbyurl")
    public Response checkByUrl( final SiteimprovePageByUrlRequestJson json )
        throws IOException, URISyntaxException
    {
        return doSiteimproveAPICall( makeCheckByUrlSiteimproveApiRequest( json ), SiteimproveJobJson.class );
    }

    private String translateBadResponse( final CloseableHttpResponse response )
        throws IOException
    {

        if ( response.getStatusLine().getStatusCode() == 400 )
        {
            final HttpEntity entity = response.getEntity();
            final SiteimproveErrorResponseJson json =
                new ObjectMapper().readValue( response.getEntity().getContent(), SiteimproveErrorResponseJson.class );
            EntityUtils.consume( entity );

            return translateBadStatusCode( response.getStatusLine().getStatusCode() ) +
                ( json.getMessage() != null ? " " + json.getMessage() : "" );
        }
        else
        {
            return translateBadStatusCode( response.getStatusLine().getStatusCode() );
        }
    }

    private <T> T parseSiteimproveHttpResponse( final CloseableHttpResponse response, final Class<T> clazz )
        throws IOException
    {
        final HttpEntity entity = response.getEntity();
        T result = null;
        try
        {
            result = new ObjectMapper().configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false ).readValue(
                entity.getContent(), clazz );
        }
        catch ( final JsonMappingException e )
        {
            try
            {
                return clazz.newInstance();
            }
            catch ( final Exception exc )
            {
            }
        }
        finally
        {
            EntityUtils.consume( entity );
        }
        return result;
    }

    private URI createUriForPath( final String path )
    {
        return URI.create( SITEIMPROVE_API_URL + path );
    }

    private HttpGet makeGetRequest( final URI uri )
    {
        final HttpGet httpGet = new HttpGet( uri );
        httpGet.setHeader( "Accept", "application/json" );

        return httpGet;
    }

    private HttpGet makeGetRequest( final String path )
    {
        final URI uri = this.createUriForPath( path );
        return this.makeGetRequest( uri );
    }

    private HttpPost makePostRequest( final String path, final StringEntity input )
    {
        final URI uri = this.createUriForPath( path );

        final HttpPost httpPost = new HttpPost( uri );

        input.setContentType( "application/json" );
        httpPost.setEntity( input );
        httpPost.setHeader( "Accept", "application/json" );

        return httpPost;
    }

    private HttpHead makeHeadRequest( final URI uri )
    {
        return new HttpHead( uri );
    }

    private HttpHead makeCheckUrlExistsRequest( final SiteimproveCheckUrlExistsRequestJson json )
    {
        final URI uri = URI.create( json.getUrl() );
        return makeHeadRequest( uri );
    }

    private HttpGet makePingAccountSiteimproveApiRequest()
    {
        return makeGetRequest( "/ping/account" );
    }

    private HttpGet makeListSitesSiteimproveApiRequest( final SiteimproveListSitesRequestJson json )
        throws URISyntaxException
    {
        final URI uri = this.createUriForPath( "/sites" );
        URIBuilder builder = new URIBuilder( uri );

        if ( json.getGroupId() != null )
        {
            builder.setParameter( "group_id", json.getGroupId().toString() );
        }

        if ( json.getPage() != null )
        {
            builder.setParameter( "page", json.getPage().toString() );
        }

        if ( json.getPageSize() != null )
        {
            builder.setParameter( "page_size", json.getPageSize().toString() );
        }

        return makeGetRequest( builder.build() );
    }

    private HttpGet makeDciScoreSiteimproveApiRequest( final SiteimproveSiteRequestJson json )
        throws URISyntaxException
    {
        final String siteId = json.getSiteId() != null ? json.getSiteId().toString() : "";
        final URI uri = this.createUriForPath( "/sites/" + siteId + "/dci/overview" );
        URIBuilder builder = new URIBuilder( uri );

        if ( json.getGroupId() != null )
        {
            builder.setParameter( "group_id", json.getGroupId().toString() );
        }

        return makeGetRequest( builder.build() );
    }

    private HttpGet makeCrawlStatusSiteimproveApiRequest( final SiteimproveSiteRequestJson json )
        throws URISyntaxException
    {
        final String siteId = json.getSiteId() != null ? json.getSiteId().toString() : "";
        final URI uri = this.createUriForPath( "/sites/" + siteId + "/content/crawl" );
        URIBuilder builder = new URIBuilder( uri );

        if ( json.getGroupId() != null )
        {
            builder.setParameter( "group_id", json.getGroupId().toString() );
        }

        return makeGetRequest( builder.build() );
    }

    private HttpPost makeCrawlSiteimproveApiRequest( final SiteimproveSiteRequestJson json )
        throws UnsupportedEncodingException
    {
        final String siteId = json.getSiteId() != null ? json.getSiteId().toString() : "";
        final String path = "/sites/" + siteId + "/content/crawl";

        final StringEntity input = new UrlEncodedFormEntity( Collections.emptyList(), "UTF-8" );

        return makePostRequest( path, input );
    }

    private HttpGet makeListPagesSiteimproveApiRequest( final SiteimproveListPagesRequestJson json )
        throws URISyntaxException
    {
        final String siteId = json.getSiteId() != null ? json.getSiteId().toString() : "";
        final URI uri = this.createUriForPath( "/sites/" + siteId + "/content/pages" );
        URIBuilder builder = new URIBuilder( uri );

        if ( json.getGroupId() != null )
        {
            builder.setParameter( "group_id", json.getGroupId().toString() );
        }
        if ( json.getPageSize() != null )
        {
            builder.setParameter( "page_size", json.getPageSize().toString() );
        }

        return makeGetRequest( builder.build() );
    }

    private HttpGet makePageSummarySiteimproveApiRequest( final SiteimprovePageRequestJson json )
        throws URISyntaxException
    {
        final String siteId = json.getSiteId() != null ? json.getSiteId().toString() : "";
        final String pageId = json.getPageId() != null ? json.getPageId().toString() : "";
        final URI uri = this.createUriForPath( "/sites/" + siteId + "/content/pages/" + pageId );
        URIBuilder builder = new URIBuilder( uri );

        if ( json.getGroupId() != null )
        {
            builder.setParameter( "group_id", json.getGroupId().toString() );
        }

        return makeGetRequest( builder.build() );
    }

    private HttpGet makeCheckStatusSiteimproveApiRequest( final SiteimprovePageRequestJson json )
        throws URISyntaxException
    {
        final String siteId = json.getSiteId() != null ? json.getSiteId().toString() : "";
        final String pageId = json.getPageId() != null ? json.getPageId().toString() : "";
        final URI uri = this.createUriForPath( "/sites/" + siteId + "/content/check/page/" + pageId );
        URIBuilder builder = new URIBuilder( uri );

        if ( json.getGroupId() != null )
        {
            builder.setParameter( "group_id", json.getGroupId().toString() );
        }

        return makeGetRequest( builder.build() );
    }

    private HttpPost makeCheckSiteimproveApiRequest( final SiteimprovePageRequestJson json )
        throws UnsupportedEncodingException
    {
        final String siteId = json.getSiteId() != null ? json.getSiteId().toString() : "";
        final String pageId = json.getPageId() != null ? json.getPageId().toString() : "";
        final String path = "/sites/" + siteId + "/content/check/page/" + pageId;

        final StringEntity input = new UrlEncodedFormEntity( Collections.emptyList(), "UTF-8" );

        return makePostRequest( path, input );
    }

    private HttpGet makeCheckByUrlSiteimproveApiRequest( final SiteimprovePageByUrlRequestJson json )
        throws URISyntaxException
    {
        final String siteId = json.getSiteId() != null ? json.getSiteId().toString() : "";
        final String url = json.getUrl() != null ? json.getUrl() : "";

        final URI uri = this.createUriForPath( "/sites/" + siteId + "/content/check/page/" );
        final URIBuilder builder = new URIBuilder( uri );
        builder.setParameter( "url", url );

        return makeGetRequest( builder.build() );
    }

    private String translateBadStatusCode( int code )
    {
        String badMessage = "Something went wrong while executing Siteimprove API call.";
        switch ( code )
        {
            case 400:
                badMessage = "Bad Request. Invalid json was sent.";
                break;
            case 401:
                badMessage = "Authentication failed. Please check that API key and username are valid.";
                break;
            case 403:
                badMessage = "Forbidden. You provided invalid or revoked API key or don't have read/write access.";
                break;
            case 404:
                badMessage = "Not Found. Id used in the request was inaccurate or you don't have permission to view/edit it.";
                break;
            case 429:
                badMessage = "Too Many Requests. You hit a rate limit for the API.";
                break;
            case 503:
                badMessage = "Service Unavailable. The Siteimprove API is overloaded or down for maintenance.";
            default:
                break;
        }

        return badMessage;
    }
}
