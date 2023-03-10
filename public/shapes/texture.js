class Texture {
	constructor(rotation, shapeX, shapeY, shapeW, shapeH, rdnX, rdnY, w1, color, mask) {
		this.mask = mask;
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 1;
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
		this.alpha = random(0, 20);
	}

	display() {
		this.xoff += 0.01;
		this.yoff += 0.001;
		this.woff1 += 0;

		let w1 = map(noise(this.woff1, this.rdnW1), 0.4, 1, this.mask.width / 5000, this.mask.width / 100, true);
		let x = map(noise(this.xoff, this.rdnX), 0, 1, this.mapXHigh, this.mapXLow, true);
		let y = map(noise(this.yoff, this.rdnW1), 0, 1, this.mapYHigh, this.mapYLow, true);
		let bright = 100;

		let diviser = map(w1, this.mask.width / 1000, this.mask.width / 200, 1, 10, true);

		let offset = w1 / diviser;
		this.mask.noStroke();

		this.mask.fill(0, 100, bright, this.alpha / 2);
		this.mask.ellipse(x - offset, y + offset, w1, w1);
		this.mask.fill(200, 100, bright, this.alpha / 2);
		this.mask.ellipse(x + offset, y - offset, w1, w1);
		this.mask.fill(this.hue, this.sat - 40, bright, this.alpha + 10);
		this.mask.ellipse(x, y, w1, w1);
	}
}
