class Line {
	constructor(margin, angleArr, colorArr) {
		this.x = random(margin, width - margin);
		this.y = random(margin, height - margin);
		this.l = random(margin, height / 2 - margin);

		this.angles = angleArr;
		this.color = random(colorArr);
	}

	draw() {
		push();
		let angle = radians(random(this.angles));

		translate(this.x, this.y);
		rotate(angle);
		strokeCap(SQUARE);
		strokeWeight(random([5, 10, 15, 20, 30]));
		fill(this.color);
		stroke(this.color);
		line(-this.l / 2, 0, this.l / 2, 0);

		pop();

		console.log(this.x1, this.y1, this.x2, this.y2);
	}
}
