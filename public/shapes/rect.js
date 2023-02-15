class Rect {
	constructor(margin, colorArr, angleArr, bgHue) {
		this.w = random(100, 400);
		this.h = this.w / 2;
		this.x = random(margin, width - margin);
		this.y = random(margin, height - margin);
		this.sHue = bgHue;
		this.angles = angleArr;
		this.rotation = radians(random(this.angles));
		this.color = random(colorArr);
	}

	draw() {
		push();
		translate(this.x, this.y);
		rotate(this.rotation);
		fill(this.color);
		noStroke();
		rect(-this.w / 2, -this.h / 2, this.w, this.h);
		pop();
	}
}
