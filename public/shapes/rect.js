class Rect {
	constructor(x, y, w, h, angleArr, colorArr) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.angles = angleArr;
		this.color = random(colorArr);
	}

	draw() {
		push();
		translate(this.x, this.y);
		rotate(radians(random(this.angles)));

		fill(this.color);
		noStroke();
		rect(-this.w / 2, -this.h / 2, this.w, this.h);
		pop();
	}
}
