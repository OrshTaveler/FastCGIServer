import static java.lang.System.out;

import java.util.HashMap;

import com.fastcgi.FCGIInterface;

import handlers.GeneralHandler;
import handlers.IHandler;
import models.RequestMethods;


public class FCGIMainLoop {
      private HashMap<String,HashMap<String,IHandler>> handlers; // URI - Handler

    public FCGIMainLoop(){
        this.handlers = new HashMap<String,HashMap<String,IHandler>>();
    }
    public void addHandler(RequestMethods request,String uri,IHandler handler){
            this.handlers.put(request.toString(),new HashMap<String,IHandler>(){{put(uri,handler);}});
    }
    private IHandler getHandler(String request,String uri){
            HashMap<String, IHandler> handlers = this.handlers.get(request);
            if(handlers == null) return new GeneralHandler();
            IHandler handler = handlers.get(uri);
            if (handler == null) return new GeneralHandler();
            return handler;
    }

    public void start(){
        FCGIInterface fcgiinterface = new FCGIInterface();   
        while(fcgiinterface.FCGIaccept() >= 0) {
                if (fcgiinterface.request != null){
                    this.getHandler(fcgiinterface.request.params.getProperty("REQUEST_METHOD"), fcgiinterface.request.params.getProperty("REQUEST_URI")).execute();
                }
                else{
                    new GeneralHandler().execute();
                }
        }
    }
}
