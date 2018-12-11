package com.enonic.app.siteimprove.resource;

import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public final class ResponseMapper
    implements MapSerializable
{
    private final Response response;

    public ResponseMapper( final Response response )
    {
        this.response = response;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        Gson gson = new Gson();
        gen.value( "status", this.response.getStatus() );
        gen.value( "entity", gson.toJson( this.response.getEntity() ) );
    }
}
