class Rect {
	constructor(margin, colorArr, angleArr, bgHue, rectTexture, rectType, w = 0, h = 0) {
		this.type = rectType;
		if (this.type === 'rectangle') {
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
		} else {
			if (w === 0 && h === 0) {
				this.ratio = random([1 / 30, 1 / 40, 1 / 20, 1 / 50]);
				this.w = random(width / 5, width / 3);
				this.h = this.w * this.ratio;
			} else {
				this.ratio = w / h;
				this.w = w;
				this.h = h;
			}
		}
		this.x = random(margin, width - margin);
		this.y = random(margin, height - margin);
		this.sHue = bgHue;
		this.rotation = radians(random(angleArr));
		this.color = random(colorArr);
		this.padding = 0;
		this.center = createVector(this.x, this.y);

		this.mask = '';
		this.texture = rectTexture;

		// store the 4 corners of the rectangle
		this.top_left = createVector(this.x - this.w / 2, this.y - this.h / 2);
		this.top_right = createVector(this.x + this.w / 2, this.y - this.h / 2);
		this.bottom_right = createVector(this.x + this.w / 2, this.y + this.h / 2);
		this.bottom_left = createVector(this.x - this.w / 2, this.y + this.h / 2);
		this.points = [this.top_left, this.top_right, this.bottom_right, this.bottom_left];

		// rotate each point around the center of the rectangle
		for (let i = 0; i < 4; i++) {
			this.points[i] = this.rotatePoint(this.points[i], this.center, this.rotation);
		}

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
}
