class Tile {
	constructor(x, y, w, h, img, img2, img3) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = img;
		this.img2 = img2;
		this.img3 = img3;
	}

	show() {
		// display a random piece of the image

		let w = this.w;
		let h = this.h;
		let x = random(this.x - w, this.x + w);
		let y = random(this.y - h, this.y + h);
		let img = random([this.img, this.img, this.img2, this.img3]);

		if (random(1) < 0.5) {
			blendMode(DIFFERENCE);
		} else {
			blendMode(BLEND);
		}

		image(img, x, y, w, h, 0, 0, w, h);
		// draw a rectangle around the tile
		blendMode(BLEND);
	}
}
