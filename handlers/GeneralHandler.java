package handlers;

import java.nio.charset.StandardCharsets;

import utils.Input;

public class GeneralHandler implements IHandler {
    @Override
    public void execute() {
    
        String genericResponse = "REQUEST IS UNKNOWN\n"+Input.readRequestBody();

        String response = """
		Content-Type: text/json
		Content-Length: %d
		
		%s

		""".formatted(genericResponse.getBytes(StandardCharsets.UTF_8).length, genericResponse);
        System.out.println(response);
    }
    
}
