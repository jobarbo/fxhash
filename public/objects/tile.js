class Tile {
	constructor(x, y, w, h, j, i, img) {
		this.j = j;
		this.i = i;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = img;
	}

	show() {
		// display a random piece of the image

		let w = this.w;
		let h = this.h;
		let x = random(this.x - w, this.x + w);
		let y = random(this.y - h, this.y + h);
		image(this.img, x, y, w, h, 0, 0, w, h);
		// draw a rectangle around the tile
		//noFill();
		//stroke(0);
		//rect(x, y, w, h);
	}
}
