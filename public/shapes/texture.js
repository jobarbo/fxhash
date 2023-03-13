class Texture {
	constructor(rotation, shapeX, shapeY, shapeW, shapeH, rdnX, rdnY, w1, color, mask) {
		this.mask = mask;
		this.xoff = random(1000000);
		this.yoff = random(1000000);
		this.woff1 = random(1000000);
		this.aoff = random(1000000);
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
		//this.bri = brightness(color);
		this.bri = 100;
		this.alpha = 20;

		this.aoffInc = width / 100000000;
		this.xoffInc = width / 300000;
		this.yoffInc = width / 400000;
		this.woff1Inc = width / 100;

		this.maxWidth = height / 650;
		this.minWidth = height / 900;

		this.x = rdnX;
		this.y = rdnY;
		this.w = map(noise(this.woff1), 0.6, 1, this.minWidth, this.maxWidth, true);

		this.offset = this.w / 2;
	}

	display() {
		// make the brightness of the texture brighter when closer to the center of the shape
		/* 		let distance = dist(this.x, this.y, this.shapeX, this.shapeY);
		let maxDistance = dist(this.shapeX, this.shapeY, this.shapeX + this.shapeW, this.shapeY + this.shapeH);
		this.bri = map(distance, 0, maxDistance, 100, 50, true);

		// make this.minWidth and this.maxWidth smaller when closer to the center of the shape
		this.minWidth = map(distance, 0, maxDistance / 2, height / 900, height / 5200, true);
		this.maxWidth = map(distance, 0, maxDistance / 2, height / 300, height / 900, true); */

		this.xoff += this.xoffInc;
		this.yoff += this.yoffInc;
		this.woff1 += this.woff1Inc;
		this.aoff += this.aoffInc;

		this.w = map(noise(this.woff1), 0.6, 1, this.minWidth, this.maxWidth, true);
		this.x = map(noise(this.xoff), 0, 1, this.mapXHigh, this.mapXLow, true);
		this.y = map(noise(this.yoff), 0, 1, this.mapYHigh, this.mapYLow, true);
		this.alpha = map(noise(this.woff1), 0.6, 1, 5, 100, true);

		this.offset = this.w / 2;
		this.mask.noStroke();
		this.mask.fill(this.hue, 0, 0, this.alpha / 2);
		this.mask.ellipse(this.x - this.offset, this.y - this.offset, this.w, this.w);
		this.mask.fill(0, 100, this.bri, this.alpha);
		this.mask.ellipse(this.x - this.offset, this.y + this.offset, this.w, this.w);
		this.mask.fill(200, 100, this.bri, this.alpha);
		this.mask.ellipse(this.x + this.offset, this.y - this.offset, this.w, this.w);
		this.mask.fill(this.hue, 0, this.bri, this.alpha + 10);
		this.mask.ellipse(this.x + this.offset, this.y + this.offset, this.w * 1.25, this.w * 1.25);
	}
}
