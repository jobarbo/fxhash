class Line {
	constructor(margin, colorArr, angleArr, bgHue) {
		this.w = random((width - margin) / 3, (width - margin) / 1.5);
		this.h = random([5, 8, 10, 15]);

		this.x = random(margin, width - margin);
		this.y = random(margin, height - margin);
		this.sHue = bgHue;
		this.rotation = radians(random(angleArr));
		this.color = random(colorArr);

		this.center = createVector(this.x, this.y);

		// get the leftmost point of the rectangle
		this.left = createVector(this.x - this.w / 2, this.y);
		// get the rightmost point of the rectangle
		this.right = createVector(this.x + this.w / 2, this.y);
		// get the topmost point of the rectangle
		this.top = createVector(this.x, this.y - this.h / 2);
		// get the bottommost point of the rectangle
		this.bottom = createVector(this.x, this.y + this.h / 2);

		// rotate this.left around the center of the rectangle
		this.left = this.rotatePoint(this.left, this.center, this.rotation);
		// rotate this.right around the center of the rectangle
		this.right = this.rotatePoint(this.right, this.center, this.rotation);
		// rotate this.top around the center of the rectangle
		this.top = this.rotatePoint(this.top, this.center, this.rotation);
		// rotate this.bottom around the center of the rectangle
		this.bottom = this.rotatePoint(this.bottom, this.center, this.rotation);

		this.points = [this.left, this.right, this.top, this.bottom];
	}

	draw() {
		push();
		translate(this.x, this.y);
		rotate(this.rotation);
		fill(this.color);
		noStroke();
		rect(-this.w / 2, -this.h / 2, this.w, this.h);

		pop();

		stroke(0, 100, 100);
		strokeWeight(5);
		point(this.left.x, this.left.y);
		point(this.right.x, this.right.y);
		point(this.top.x, this.top.y);
		point(this.bottom.x, this.bottom.y);

		// store each points(relative to the canvas) of the rectangle in an array as a vector
	}

	rotatePoint(point, center, angle) {
		// translate point to origin
		point.sub(center);

		// rotate point
		point.rotate(angle);

		// translate point back to original position
		point.add(center);

		return point;
	}
}
