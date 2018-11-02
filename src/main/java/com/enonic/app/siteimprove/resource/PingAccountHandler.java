package com.enonic.app.siteimprove.resource;

import java.io.IOException;
import java.util.function.Supplier;

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
            return this.siteimproveService.get().checkAuthentification();
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
