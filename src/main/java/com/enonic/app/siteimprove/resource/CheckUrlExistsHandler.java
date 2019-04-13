package com.enonic.app.siteimprove.resource;

import java.util.function.Supplier;

import javax.ws.rs.core.Response;

import com.enonic.app.siteimprove.rest.json.resource.SiteimproveCheckUrlExistsRequestJson;
import com.enonic.app.siteimprove.rest.resource.SiteimproveService;
import com.enonic.xp.lib.content.BaseContextHandler;
import com.enonic.xp.script.bean.BeanContext;

public class CheckUrlExistsHandler
    extends BaseContextHandler
{
    private Supplier<SiteimproveService> siteimproveService;

    private String url;

    @Override
    protected ResponseMapper doExecute()
    {
        try
        {
            final Response response = this.siteimproveService.get().checkUrlExists( new SiteimproveCheckUrlExistsRequestJson( this.url ) );
            return new ResponseMapper( response );
        }
        catch ( Exception e )
        {
            return null;
        }
    }

    public void setUrl( final String url )
    {
        this.url = url;
    }

    @Override
    public void initialize( final BeanContext context )
    {
        this.siteimproveService = context.getService( SiteimproveService.class );
    }
}
