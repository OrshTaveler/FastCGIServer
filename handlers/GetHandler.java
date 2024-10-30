package handlers;



import static java.lang.System.out;

import java.nio.charset.StandardCharsets;
import utils.Parser;


public class GetHandler implements IHandler {


    @Override
    public void execute() {
        String test = "<html>\n" + //
                        "<head><title>LABA</title></head>\n" + //
                        "<body><h1>TEST WORKS!</h1></body>\n" + //
                        "</html>";

        String testResp = """
		Content-Type: text/html
		Content-Length: %d
		
		%s

		""".formatted(test.getBytes(StandardCharsets.UTF_8).length, test);
        out.println(testResp);
    }
    
}
