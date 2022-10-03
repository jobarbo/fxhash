class Ground {
	constructor(mtnPos, color) {
		this.hue = hue(color);
		this.saturation = saturation(color);
		this.brightness = brightness(color);
		this.widthOffset = width / 10;
		this.x = -this.widthOffset;
		this.y = mtnPos;
		this.width = width + this.widthOffset * 2;
		this.height = height;
	}

	draw() {
		strokeWeight(5);
		stroke(this.hue, this.saturation, this.brightness - 20);
		//noStroke();
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		rect(this.x, this.y, this.width, this.height);
	}
}
