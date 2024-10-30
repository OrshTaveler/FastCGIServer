package utils;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import models.Parameters;

public class Parser {
	private static final String HTTP_SUCCESS = """
		Content-Type: application/json
		Content-Length: %d
		
		%s

		""";
	private static final String RESULT_JSON = """
		{
			"result": %b,
			"exTime": %s,
			"servTime": %s
		}
		""";
	private static final String JSON_ERROR = """
		{
			"reason": "%s"
		}
		""";

	public static Parameters JSONtoParams(String query) {
		String s = query.replace("{", "").replace("}", "");
		if (s == null) {
			return new Parameters(0, 0, 0);
		}
		String[] pair = s.split(",");
		double x = 0;
		double y = 0;
		double r = 0;
		boolean xSet = false;
		boolean ySet = false;
		boolean rSet = false;
		for (String str: pair) {
			String[] cur = str.split(":");
			if (cur.length >= 2) {
				cur[0] = cur[0].replaceAll("\"", "");
				switch(cur[0]) {
					case "x":
						{
							String val = cur[1].replaceAll("\"", "");
							if (val.length() > 10) {
								x = (val.charAt(0) == '-' ? -1 : 1) * 1e10;
							}
							x = Double.parseDouble(val);
							xSet = true;
						}
						break;
					case "y":
						{
							String val = cur[1].replaceAll("\"", "");
							y = Double.parseDouble(val);
							ySet = true;
						}
						break;
					case "r":
						{
							String val = cur[1].replaceAll("\"", "");
							r = Double.parseDouble(val);
							rSet = true;
						}
						break;
				}
			}
		}
		if (!(xSet && ySet && rSet)) return new Parameters(x,y,r,true);
		return new Parameters(x, y, r);
	}

	public static String genJSONresp(boolean res, double applTime) {
		try {
			String json = String.format(RESULT_JSON, res, "\"" + Double.toString(applTime) + "\"", "\"" + Instant.now().toString() + "\"");
			json = json.trim();
			return String.format(HTTP_SUCCESS, json.getBytes(StandardCharsets.UTF_8).length, json);
		}
		catch (Exception e) {
			return "";
		}
	}

}