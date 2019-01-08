package com.enonic.app.siteimprove.resource;

import com.enonic.app.siteimprove.rest.json.PageReportLinksJson;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public final class PageReportLinksMapper
    implements MapSerializable
{
    private final PageReportLinksJson links;

    public PageReportLinksMapper( final PageReportLinksJson links )
    {
        this.links = links;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        if ( this.links.getAccessibility() != null )
        {
            gen.value( "accessibility", this.links.getAccessibility() );
        }
        if ( this.links.getSeo() != null )
        {
            gen.value( "seo", this.links.getSeo() );
        }
        if ( this.links.getQa() != null )
        {
            gen.value( "qa", this.links.getQa() );
        }
    }
}
