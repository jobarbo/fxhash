class Ball {
	constructor(margin, colorArr, bgHue) {
		this.r = random(100, 200);
		this.x = random(margin + this.r, width - (this.r + margin));
		this.y = random(margin + this.r, height - (this.r + margin));
		this.sHue = bgHue;
		this.color = random(colorArr);
	}

	draw() {
		fill(this.color);
		noStroke();

		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
}
