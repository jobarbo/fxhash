class Line {
	constructor(margin, colorArr, angleArr, bgHue, w = 0, h = 0) {
		if (w === 0 && h === 0) {
			this.w = random(width / 5, width / 3);
			this.h = random([width / 200, width / 140, width / 100]);
		} else {
			this.w = w;
			this.h = h;
		}

		this.x = random(margin, width - margin);
		this.y = random(margin, height - margin);
		this.sHue = bgHue;
		this.rotation = radians(random(angleArr));
		this.color = random(colorArr);

		this.center = createVector(this.x, this.y);

		// rotate this.left around the center of the rectangle
		this.left = this.rotatePoint(createVector(this.x - this.w / 2, this.y), this.center, this.rotation);
		// rotate this.right around the center of the rectangle
		this.right = this.rotatePoint(createVector(this.x + this.w / 2, this.y), this.center, this.rotation);
		// rotate this.top around the center of the rectangle
		this.top = this.rotatePoint(createVector(this.x, this.y - this.h / 2), this.center, this.rotation);
		// rotate this.bottom around the center of the rectangle
		this.bottom = this.rotatePoint(createVector(this.x, this.y + this.h / 2), this.center, this.rotation);

		this.points = [this.left, this.right, this.top, this.bottom];

		this.updatePoints();

		this.topLeft = createVector(this.left.x, this.top.y);
		this.topRight = createVector(this.right.x, this.top.y);
		this.bottomLeft = createVector(this.left.x, this.bottom.y);
		this.bottomRight = createVector(this.right.x, this.bottom.y);
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

	rotatePoint(point, center, angle) {
		// translate point to origin
		point.sub(center);

		// rotate point
		point.rotate(angle);

		// translate point back to original position
		point.add(center);

		return point;
	}

	updatePoints() {
		// compare each rotated point and find the leftmost, rightmost, topmost and bottommost points
		for (let i = 0; i < 4; i++) {
			if (this.points[i].x < this.left.x) {
				this.left = this.points[i];
			}
			if (this.points[i].x > this.right.x) {
				this.right = this.points[i];
			}
			if (this.points[i].y < this.top.y) {
				this.top = this.points[i];
			}
			if (this.points[i].y > this.bottom.y) {
				this.bottom = this.points[i];
			}
		}
	}
}
