package com.enonic.app.siteimprove.resource;

import java.io.IOException;
import java.util.function.Supplier;

import javax.ws.rs.core.Response;

import com.enonic.app.siteimprove.rest.json.resource.SiteimproveServiceGeneralRequestJson;
import com.enonic.app.siteimprove.rest.resource.SiteimproveService;
import com.enonic.xp.lib.content.BaseContextHandler;
import com.enonic.xp.script.bean.BeanContext;


public final class PingAccountHandler
    extends BaseContextHandler
{
    private Supplier<SiteimproveService> siteimproveService;

    @Override
    protected Object doExecute()
    {
        try
        {
            final Response response = this.siteimproveService.get().pingAccount( new SiteimproveServiceGeneralRequestJson() );
            final int status = response.getStatus();
            return status == 200 || status == 201 || status == 202;
        }
        catch ( IOException e )
        {
            return false;
        }
    }

    @Override
    public void initialize( final BeanContext context )
    {
        this.siteimproveService = context.getService( SiteimproveService.class );
    }
}
