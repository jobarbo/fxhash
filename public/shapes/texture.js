class Texture {
	constructor(rotation, shapeX, shapeY, shapeW, shapeH, rdnX, rdnY, w1, color, mask) {
		this.mask = mask;
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
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
		this.alpha = random(0, 15);
	}

	display() {
		this.xoff += this.mask.width / 3000000;
		this.yoff += this.mask.width / 3000000;
		this.woff1 += this.mask.width / 1454.55;

		let w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 0, this.mask.width / 600);
		let x = map(noise(this.xoff + this.rdnX), 0, 1, this.mapXLow, this.mapXHigh);
		let y = map(noise(this.yoff + this.rdnY), 0, 1, this.mapYLow, this.mapYHigh);
		if (this.bri < 50) {
			this.bri = 100;
		} else {
			this.bri = 10;
		}
		let offset = 1;

		if (x <= this.shapeX - this.shapeW / 2) {
			x = this.shapeX - this.shapeW / 2 + random(-w1, w1);
			offset = 0;
		} else if (x >= this.shapeX + this.shapeW / 2) {
			x = this.shapeX + this.shapeW / 2 - w1 + random(-w1, w1);
			offset = 0;
		}
		if (y <= this.shapeY - this.shapeH / 2) {
			y = this.shapeY - this.shapeH / 2 + random(-w1, w1);
			offset = 0;
		} else if (y >= this.shapeY + this.shapeH / 2) {
			y = this.shapeY + this.shapeH / 2 - w1 + random(-w1, w1);
			offset = 0;
		}

		this.mask.fill(0, 100, 100, this.alpha / 2);
		this.mask.noStroke();
		this.mask.rect(x - offset, y + offset, w1, w1);
		this.mask.fill(200, 100, 100, this.alpha / 2);
		this.mask.noStroke();
		this.mask.rect(x + offset, y - offset, w1, w1);
		this.mask.fill(this.hue, 0, this.bri, this.alpha + 30);
		this.mask.noStroke();
		this.mask.rect(x, y, w1, w1);
	}
}
