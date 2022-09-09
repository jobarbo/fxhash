class Walker {
	constructor(swatch, swatchLength, w, h, brush, ctx) {
		this.x = random(width);
		this.y = random(height);
		this.w = random(width / 10, width / 2);
		this.h = this.w / 3;
		this.rotation = random(-20, 20);
		this.brush = brush;
		this.swatch = swatch;
		this.swatchLength = swatchLength;
		this.playHeadOffsetInit = random(-25, 25);
		this.playHeadOffset = this.playHeadOffsetInit;
		this.playHead = map(this.y, 0, height, this.playHeadOffset, this.swatchLength);
		this.playHead = constrain(this.playHead, 0, this.swatchLength);
		this.a = 255;
		this.c = this.swatch.get(0, this.playHead);
		this.c = color(this.c[0], this.c[1], this.c[2]);
		this.c.setAlpha(this.a);
		this.ctx = ctx;
	}

	display() {
		this.brush.loadPixels();
		for (let i = 0; i < this.brush.pixels.length; i += 4) {
			if (this.brush.pixels[i + 3] !== 0) {
				this.brush.pixels[i] = this.c.levels[0];
				this.brush.pixels[i + 1] = this.c.levels[1];
				this.brush.pixels[i + 2] = this.c.levels[2];
			}
		}
		this.brush.updatePixels();

		// draw the brush image
		push();
		translate(this.x, this.y);
		rotate(radians(this.rotation));
		image(this.brush, this.x, this.y, this.w, this.h);
		pop();
	}
}
