import com.fastcgi.FCGIInterface;
import java.io.*;
import java.nio.charset.StandardCharsets;

import static java.lang.System.out;
import models.RequestMethods;
import utils.Input;
import utils.Input.*;
import handlers.*;

class main {
    public static void main (String args[])  {
        
        FCGIMainLoop mainLoop = new FCGIMainLoop();

        mainLoop.addHandler(RequestMethods.GET, "/fcgi-bin/server.jar/", new GetHandler());
        mainLoop.addHandler(RequestMethods.POST, "/fcgi-bin/server.jar/", new PostValidateHandler());


        mainLoop.start();

        System.exit(0);
    }
}