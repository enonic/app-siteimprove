package com.enonic.app.siteimprove.resource;

import java.util.function.Supplier;

import javax.ws.rs.core.Response;

import com.enonic.app.siteimprove.rest.json.resource.SiteimproveListPagesRequestJson;
import com.enonic.app.siteimprove.rest.resource.SiteimproveService;
import com.enonic.xp.lib.content.BaseContextHandler;
import com.enonic.xp.script.bean.BeanContext;

public final class ListPagesHandler
    extends BaseContextHandler
{
    private Supplier<SiteimproveService> siteimproveService;

    private Long page;

    private Long pageSize;

    private Long siteId;

    @Override
    protected ResponseMapper doExecute()
    {
        try
        {
            final Response response = this.siteimproveService.get().listPages(
                new SiteimproveListPagesRequestJson( null, this.siteId, this.page, this.pageSize ) );
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
