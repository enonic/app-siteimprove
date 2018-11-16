package com.enonic.app.siteimprove.rest.json;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.osgi.service.component.annotations.Component;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

@Component
public class BrokenDateDeserializer
    extends StdDeserializer<Date>
{

    private static SimpleDateFormat formatter = new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss.SSS'Z'" );

    public BrokenDateDeserializer()
    {
        this( null );
    }

    public BrokenDateDeserializer( Class<?> vc )
    {
        super( vc );
    }

    @Override
    public Date deserialize( JsonParser jsonparser, DeserializationContext context )
        throws IOException
    {

        String date = jsonparser.getText();
        try
        {
            return formatter.parse( date );
        }
        catch ( ParseException e )
        {
            throw new RuntimeException( e );
        }
    }

}
