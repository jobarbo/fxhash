class Ball {
	constructor(x, y, r, colorArr) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = random(colorArr);
	}

	draw() {
		fill(this.color);
		noStroke();
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
}
