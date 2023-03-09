class Texture {
	constructor(rdnX, rdnY, w1, hue, mask) {
		this.mask = mask;
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.rdnW1 = w1;
		this.mapXLow = -this.mask.width / 3;
		this.mapXHigh = this.mask.width * 1.5;
		this.mapYLow = -this.mask.height / 3;
		this.mapYHigh = this.mask.height * 1.5;
		this.hue = hue;
		this.alpha = int(random(100, 100));
	}

	display() {
		this.xoff += this.mask.width / 200006.67;
		this.yoff += this.mask.width / 1000000;
		this.woff1 += this.mask.width / 1454.55;

		const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 0, this.mask.width / 300);
		const x = map(noise(this.xoff + this.rdnX), 0, 1, this.mapXLow, this.mapXHigh);
		const y = map(noise(this.yoff + this.rdnY), 0, 1, this.mapYLow, this.mapYHigh);

		this.mask.fill(this.hue, 10, 100, this.alpha);
		this.mask.noStroke();
		this.mask.rect(x, y, w1, w1);
	}
}
