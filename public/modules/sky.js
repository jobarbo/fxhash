class Sky {
	constructor(color) {
		this.hue = hue(color);
		this.saturation = saturation(color);
		this.brightness = brightness(color);
		this.alpha = alpha(color);
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
	}

	draw() {
		noStroke();
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		rect(this.x, this.y, this.width, this.height);
	}
}
