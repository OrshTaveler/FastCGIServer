package utils;
import com.fastcgi.*;
import java.nio.charset.StandardCharsets;
import java.io.*;
import java.nio.*;


public class Input {
	public static String readRequestBody() {
		try{ 
		 FCGIInterface.request.inStream.fill();
		 var contentLength = FCGIInterface.request.inStream.available();
		 var buffer = ByteBuffer.allocate(contentLength);
		 var readBytes = FCGIInterface.request.inStream.read(buffer.array(), 0, contentLength);
		 var requestBodyRaw = new byte[readBytes];
		 buffer.get(requestBodyRaw);
		 buffer.clear();
		 return new String(requestBodyRaw, StandardCharsets.UTF_8);
		}
		catch(IOException e){
			return "ERROR!";
		}
		catch(NullPointerException e){
			return "";
		}
	}	
}