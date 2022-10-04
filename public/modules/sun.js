class Sun {
	constructor(color) {
		this.hue = hue(color);
		this.saturation = saturation(color);
		this.brightness = brightness(color);
		this.radius = random(width / 5, width / 2.5);
		this.x = random(this.radius, width - this.radius);
		this.y = random(this.radius, height / 3);
		this.alpha = 100;
	}

	draw() {
		strokeWeight(5);
		stroke(this.hue, this.saturation / 1.5, this.brightness + 10, this.alpha);
		noStroke();
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		ellipse(this.x, this.y, this.radius, this.radius);
	}

	getSunPosition() {
		return [this.x, this.y];
	}
}
