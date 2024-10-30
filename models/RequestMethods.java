package models;

public enum RequestMethods {
   
    GET ("GET"),
    POST ("POST");
 
    private String name;
 
    RequestMethods(String name) {
        this.name = name;
    }
 

    @Override
    public String toString() {
        return name;
    }
}
