package handlers;

import models.Parameters;
import java.nio.charset.StandardCharsets;

import utils.Parser;
import utils.Validator;
import utils.Input;
public class PostValidateHandler  implements IHandler{

    @Override
    public void execute() {

        String requestBody = Input.readRequestBody();
        Parameters parameters = Parser.JSONtoParams(requestBody);
        long startTime = System.nanoTime();
        
        String response = Parser.genJSONresp(parameters.isValid() && Validator.validate(parameters) , (System.nanoTime()-startTime)/1000.0);
        System.out.println(response);
    }
    
} 

