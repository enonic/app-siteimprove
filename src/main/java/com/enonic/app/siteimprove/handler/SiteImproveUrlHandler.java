package com.enonic.app.siteimprove.handler;

import java.net.MalformedURLException;
import java.net.URL;

public class SiteImproveUrlHandler
{

    public Object compareUrls( final String firstUrl, final String secondUrl )
    {
        try
        {
            final URL firstURL = new URL( firstUrl.replaceFirst( "\\/+$", "" ) );
            final URL secondURL = new URL( secondUrl.replaceFirst( "\\/+$", "" ) );

            return firstURL.sameFile( secondURL );
        }
        catch ( final MalformedURLException e )
        {
            return false;
        }
    }

}
