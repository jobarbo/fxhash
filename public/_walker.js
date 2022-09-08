class Walker {
	constructor(swatch, swatchLength, w, h) {
		this.x = random(0, width);
		this.y = random(0, height);
		this.w = w;
		this.h = h;
		this.swatch = swatch;
		this.swatchLength = swatchLength;
		this.playHead = 0;
		this.playHeadOffsetInit = random(-25, 25);
		this.playHeadOffset = this.playHeadOffsetInit;
		this.c = color(0, 0, 0);
		this.a = 255;
	}

	display() {
		this.playHead = map(this.y, 0, height, this.playHeadOffset, this.swatchLength);
		this.playHead = constrain(this.playHead, 0, this.swatchLength);
		this.c = this.swatch.get(0, this.playHead);
		this.c = color(this.c[0], this.c[1], this.c[2]);
		this.c.setAlpha(this.a);
		fill(this.c);
		stroke(255, 10);
		rect(this.x, this.y, this.w, this.h);
	}

	move() {
		this.y += random(-width / 400, width / 400);
		this.x += random(-width / 400, width / 400);

		if (this.x > width) {
			this.x = 0;
		} else if (this.x < 0) {
			this.x = width;
		}
		if (this.y > height) {
			this.y = 0;
		} else if (this.y < 0) {
			this.y = height;
		}
	}
}
