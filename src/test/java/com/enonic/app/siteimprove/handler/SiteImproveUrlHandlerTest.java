package com.enonic.app.siteimprove.handler;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SiteImproveUrlHandlerTest
{

    @Test
    public void testCompareUrls()
    {
        final SiteImproveUrlHandler instance = new SiteImproveUrlHandler();

        Assertions.assertTrue( (Boolean) instance.compareUrls( "https://enonic.com", "https://enonic.com" ) );
        Assertions.assertFalse( (Boolean) instance.compareUrls( "https://enonic.com", "https://enonic.com/procing" ) );
    }

}
