package com.enonic.app.siteimprove.resource;

import java.util.function.Supplier;

import javax.ws.rs.core.Response;

import com.enonic.app.siteimprove.rest.json.resource.SiteimproveSiteRequestJson;
import com.enonic.app.siteimprove.rest.resource.SiteimproveService;
import com.enonic.xp.lib.content.BaseContextHandler;
import com.enonic.xp.script.bean.BeanContext;

public final class DciOverviewHandler
    extends BaseContextHandler
{
    private Supplier<SiteimproveService> siteimproveService;

    private Long siteId;

    @Override
    protected ResponseMapper doExecute()
    {
        try
        {
            final Response response = this.siteimproveService.get().dciOverview( new SiteimproveSiteRequestJson( this.siteId, null ) );
            return new ResponseMapper( response );
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

    @Override
    public void initialize( final BeanContext context )
    {
        this.siteimproveService = context.getService( SiteimproveService.class );
    }
}
