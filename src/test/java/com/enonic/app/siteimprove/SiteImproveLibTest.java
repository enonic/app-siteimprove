package com.enonic.app.siteimprove;

import org.junit.jupiter.api.Test;

import com.enonic.xp.testing.ScriptTestSupport;

public class SiteImproveLibTest
    extends ScriptTestSupport
{

    @Test
    public void testPingAccount()
    {
        runFunction( "test/ping-account-test.js", "testPingAccount" );
    }

    @Test
    public void testListSites()
    {
        runFunction( "test/list-sites-test.js", "testListSites" );
    }

    @Test
    public void testCrawlStatus()
    {
        runFunction( "test/crawl-status-test.js", "testCrawlStatus" );
    }

    @Test
    public void testDciOverview()
    {
        runFunction( "test/dci-overview-test.js", "testDciOverview" );
    }

    @Test
    public void testListPages()
    {
        runFunction( "test/list-pages-test.js", "testListPages" );
    }

    @Test
    public void testPageSummary()
    {
        runFunction( "test/page-summary-test.js", "testPageSummary" );
    }

    @Test
    public void testCheckStatus()
    {
        runFunction( "test/check-status-test.js", "testCheckStatus" );
    }

    @Test
    public void testCrawl()
    {
        runFunction( "test/crawl-test.js", "testCrawl" );
    }

    @Test
    public void testCheckByUrl()
    {
        runFunction( "test/check-by-url-test.js", "testCheckByUrl" );
    }

    @Test
    public void testCheck()
    {
        runFunction( "test/check-test.js", "testCheck" );
    }

}
