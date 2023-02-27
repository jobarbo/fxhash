class Rect {
	constructor(margin, colorArr, angleArr, bgHue, rectTexture, w = 0, h = 0) {
		if (w === 0 && h === 0) {
			// make the rectangle a random size but always 16:9 ratio
			this.ratio = random([1 / 1, 1 / 2, 3 / 4, 9 / 16, 10 / 16]);
			this.w = random(width / 10, width / 4);
			this.h = this.w * this.ratio;
		} else {
			this.ratio = w / h;
			this.w = w;
			this.h = h;
		}
		console.log(this.ratio);
		this.x = random(margin, width - margin);
		this.y = random(margin, height - margin);
		this.sHue = bgHue;
		this.rotation = radians(random(angleArr));
		this.color = random(colorArr);
		this.padding = this.w / 5;
		this.center = createVector(this.x, this.y);

		this.mask = '';
		this.texture = rectTexture;

		// store the 4 corners of the rectangle
		this.left = createVector(this.x - this.w / 2, this.y - this.h / 2);
		this.right = createVector(this.x + this.w / 2, this.y - this.h / 2);
		this.top = createVector(this.x - this.w / 2, this.y + this.h / 2);
		this.bottom = createVector(this.x + this.w / 2, this.y + this.h / 2);
		this.points = [this.left, this.right, this.top, this.bottom];

		// rotate each point around the center of the rectangle
		for (let i = 0; i < 4; i++) {
			this.points[i] = this.rotatePoint(this.points[i], this.center, this.rotation);
		}

		// compare each rotated point and find the leftmost, rightmost, topmost and bottommost points
		this.updatePoints();

		// store the 4 corners of the rectangle while adding padding
		this.topLeft = createVector(this.left.x - this.padding, this.top.y - this.padding);
		this.topRight = createVector(this.right.x + this.padding, this.top.y - this.padding);
		this.bottomLeft = createVector(this.left.x - this.padding, this.bottom.y + this.padding);
		this.bottomRight = createVector(this.right.x + this.padding, this.bottom.y + this.padding);

		// create a new canvas graphics the same size as the canvas to draw textures on
		this.mask = createGraphics(width, height);
		this.mask.pixelDensity(3);
		this.mask.colorMode(HSB, 360, 100, 100, 100);
		this.mask.background(this.color);
	}

	draw() {
		this.mask.push();
		this.mask.translate(this.x, this.y);
		this.mask.rotate(this.rotation);
		this.mask.noStroke();
		// draw the texture on the mask so that the texture is the same size as the rectangle
		this.mask.image(this.texture, -this.w / 2, -this.h / 2, this.w, this.h);

		this.mask.drawingContext.globalCompositeOperation = 'destination-in';
		this.mask.noStroke();

		this.mask.fill(this.color);
		this.mask.rect(-this.w / 2, -this.h / 2, this.w, this.h);

		this.mask.pop();

		image(this.mask, 0, 0);
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
