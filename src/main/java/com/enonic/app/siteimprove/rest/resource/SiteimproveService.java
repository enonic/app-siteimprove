package com.enonic.app.siteimprove.rest.resource;

import java.io.IOException;
import java.util.Map;

import javax.ws.rs.core.Response;

import com.google.common.annotations.Beta;

import com.enonic.app.siteimprove.rest.json.resource.SiteimproveServiceGeneralRequestJson;

@Beta
public interface SiteimproveService
{
    void activate( final Map<String, String> map );

    Response pingAccount( final SiteimproveServiceGeneralRequestJson json )
        throws IOException;
}
