class Sun {
	constructor() {
		this.radius = random(width / 10, width / 5);
		this.x = random(this.radius, width - this.radius);
		this.y = random(this.radius, height / 2 - this.radius);
		this.hue = 45;
		this.saturation = 100;
		this.brightness = 100;
	}

	display() {
		strokeWeight(15);
		fill(35, 10, 92);
		ellipse(this.x, this.y, this.radius);
	}
}
