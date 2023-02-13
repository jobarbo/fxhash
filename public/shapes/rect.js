class Rect {
	constructor(margin, colorArr, angleArr, bgHue) {
		this.w = random(100, 400);
		this.h = this.w / 2;
		this.x = random(margin, width - margin);
		this.y = random(margin, height - margin);
		this.sHue = bgHue;
		this.angles = angleArr;
		this.color = random(colorArr);
	}

	draw() {
		push();
		translate(this.x, this.y);
		rotate(radians(random(this.angles)));

		fill(this.color);
		noStroke();
		stroke(this.sHue, 20, 100, 100);
		strokeWeight(10);
		rect(-this.w / 2, -this.h / 2, this.w, this.h);
		pop();
	}
}
