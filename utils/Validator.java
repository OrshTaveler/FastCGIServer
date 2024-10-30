package utils;
import models.Parameters;
public class Validator {
    

    public static boolean validate(Parameters parameters)
    {
        double x = parameters.getX();
        double y = parameters.getY();
        double r = parameters.getR();
        
        
        if(x*x + y*y <= r*r && x <=0 && y <= 0) return true; 

        if(x <=0 && x >= r*(-1) && y >=0  && y <= r/2) return true;

        if(x>=0 && y<=0 && y >= x - r) return true;

        return false;
    }
}
