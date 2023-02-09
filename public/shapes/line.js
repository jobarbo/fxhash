class Line {
	constructor(x, y, l, angleArr, colorArr) {
		this.x = x;
		this.y = y;
		this.l = l;
		this.angles = angleArr;
		this.color = random(colorArr);
	}

	draw() {
		push();
		translate(this.x, this.y);
		rotate(radians(random(this.angles)));
		strokeCap(SQUARE);
		strokeWeight(random([5, 10, 15, 20, 30]));
		fill(this.color);
		stroke(this.color);
		line(-this.l / 2, 0, this.l / 2, 0);
		pop();
	}
}
