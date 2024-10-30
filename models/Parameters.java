package models;

public class Parameters {
	private double x;
	private double y;
	private double r;
	private boolean valid;

	public Parameters(double x, double y, double r) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.valid = this.validate();
	}
	public Parameters(double x, double y, double r,boolean fail) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.valid = false;
	}

	private boolean validate() {
		return (y >= -3) && (y <= 5) && (r >= 1) && (r <= 4) && (x >= -5) && (x <= 3);
	}
	
	public double getX() {
		return x;
	}

	public double getY() {
		return y;
	}

	public double getR() {
		return r;
	}
	public boolean isValid(){
		return valid;
	}
}