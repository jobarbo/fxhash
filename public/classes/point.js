class Intersection {
	constructor(position) {
		this.position = position;
		this.intersected = false;
		this.lineHue = 0;
	}

	show() {
		fill(255, 0);
		stroke(0, 0, 0, 0);
		ellipse(this.position.x, this.position.y, 10, 10);
	}

	move() {
		this.position.x += random(-2, 2);
		this.position.y += random(-2, 2);
	}

	isTouching(i, j) {
		this.lineHue += random(0, 10);
		if (this.lineHue > 360) {
			this.lineHue = 0;
		} else if (this.lineHue < 0) {
			this.lineHue = 360;
		}
		stroke(this.lineHue, 20, 100, 5);
		line(points[i].position.x, points[i].position.y, points[j].position.x, points[j].position.y);
		ellipse(points[i].position.x, points[i].position.y, 10, 10);
		points[i].intersected = true;
		points[j].intersected = true;
	}
}
