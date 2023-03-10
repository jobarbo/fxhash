class Texture {
	constructor(rotation, shapeX, shapeY, shapeW, shapeH, rdnX, rdnY, w1, color, mask) {
		this.mask = mask;
		this.xoff = fxrand(10000000);
		this.yoff = fxrand(10000000);
		this.woff1 = fxrand(10000000);
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.rdnW1 = w1;
		this.shapeX = shapeX;
		this.shapeY = shapeY;
		this.shapeW = shapeW;
		this.shapeH = shapeH;
		this.rotation = rotation;
		this.mapXLow = this.shapeX - this.shapeW * 2;
		this.mapXHigh = this.shapeX + this.shapeW * 2;
		this.mapYLow = this.shapeY - this.shapeH * 2;
		this.mapYHigh = this.shapeY + this.shapeH * 2;
		this.hue = hue(color);
		this.sat = saturation(color);
		this.bri = brightness(color);
		this.alpha = random(0, 10);
	}

	display() {
		this.xoff += this.mask.width / 1000000;
		this.yoff += this.mask.width / 1000000;
		this.woff1 += this.mask.width / 1000000000;

		let w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 0, this.mask.width / 500);
		let x = map(noise(this.xoff + this.rdnX), 0, 1, this.mapXHigh, this.mapXLow);
		let y = map(noise(this.yoff + this.rdnY), 0, 1, this.mapYHigh, this.mapYLow);
		let bright = 100;

		let offset = w1 / 2;

		this.mask.fill(this.hue, 0, 100, this.alpha + 10);
		this.mask.noStroke();
		this.mask.rect(x, y, w1, w1);
		this.mask.fill(0, 100, bright, this.alpha);
		this.mask.noStroke();
		this.mask.rect(x - offset, y + offset, w1, w1);
		this.mask.fill(200, 100, bright, this.alpha);
		this.mask.noStroke();
		this.mask.rect(x + offset, y - offset, w1, w1);
	}
}
