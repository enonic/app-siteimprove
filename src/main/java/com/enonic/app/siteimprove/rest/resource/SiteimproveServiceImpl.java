package com.enonic.app.siteimprove.rest.resource;

import java.io.IOException;
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
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

import com.google.common.base.Strings;

import com.enonic.app.siteimprove.rest.json.SiteimproveErrorResponseJson;
import com.enonic.app.siteimprove.rest.json.SiteimprovePingAccountJson;
import com.enonic.app.siteimprove.rest.json.resource.SiteimproveServiceGeneralRequestJson;
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
    @Path("ping/account")
    public Response pingAccount( final SiteimproveServiceGeneralRequestJson json )
        throws IOException
    {
        return doSiteimproveAPICall( makePingAccountSiteimproveApiRequest(), SiteimprovePingAccountJson.class );
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

            if ( statusCode == 200 || statusCode == 201 )
            {
                return Response.ok( parseSiteimproveHttpResponse( response, responseJsonClass ) ).build();
            }
            else
            {
                return Response.status( statusCode ).
                    entity( translateBadResponse( response ) ).build();
            }
        }
        finally
        {
            response.close();
        }
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
                ( json.getMessage() != null ? json.getMessage() : "" );
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
            result = new ObjectMapper().readValue( entity.getContent(), clazz );
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

    private HttpGet makeGetRequest( final String path )
    {
        final String uri = SITEIMPROVE_API_URL + path;

        final HttpGet httpGet = new HttpGet( uri );
        httpGet.setHeader( "Accept", "application/json" );

        return httpGet;
    }

    private HttpPost makePostRequest( final String path, final StringEntity input )
    {
        final String uri = SITEIMPROVE_API_URL + path;

        final HttpPost httpPost = new HttpPost( uri );

        input.setContentType( "application/json" );
        httpPost.setEntity( input );

        return httpPost;
    }

    private HttpGet makePingAccountSiteimproveApiRequest()
    {
        return makeGetRequest( "/ping/account" );
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
