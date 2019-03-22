package com.enonic.app.siteimprove.resource;

import java.util.function.Supplier;

import javax.ws.rs.core.Response;

import com.enonic.app.siteimprove.rest.json.resource.SiteimproveListSitesRequestJson;
import com.enonic.app.siteimprove.rest.resource.SiteimproveService;
import com.enonic.xp.lib.content.BaseContextHandler;
import com.enonic.xp.script.bean.BeanContext;

public final class ListSitesHandler
    extends BaseContextHandler
{
    private Supplier<SiteimproveService> siteimproveService;

    private Long page;

    private Long pageSize;

    @Override
    protected ResponseMapper doExecute()
    {
        try
        {
            final Response response =
                this.siteimproveService.get().listSites( new SiteimproveListSitesRequestJson( null, this.page, this.pageSize ) );
            return new ResponseMapper( response );
        }
        catch ( Exception e )
        {
            return null;
        }
    }

    public void setPage( final Long page )
    {
        this.page = page;
    }

    public void setPageSize( final Long pageSize )
    {
        this.pageSize = pageSize;
    }

    @Override
    public void initialize( final BeanContext context )
    {
        this.siteimproveService = context.getService( SiteimproveService.class );
    }
}
