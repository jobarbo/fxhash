class Cell {
	constructor(x, y, w, h, margin, xoff, yoff, inc) {
		// Module ready to be built
		this.x = x + w / 2;
		this.y = y + h / 2;
		this.w = int(w - margin);
		this.h = int(h - margin);
		this.xoff = xoff;
		this.yoff = yoff;
		//this.hueIndex = int(map(this.n, 0, 100, 0, this.hueArr.length));
		//this.brightIndex = int(map(this.n, 0, 100, 0, this.brightArr.length));
		//this.satIndex = int(map(this.n, 0, 100, 0, this.satArr.length));
		this.index = int(map(this.n, 20, 80, 0, this.hueArr.length));
		this.n = noise(this.xoff, this.yoff) * 100;
	}
	display(inc) {
		// Module ready to be built
		this.n = noise(this.xoff, this.yoff) * 100;
		this.index = int(map(this.n, 20, 80, 0, this.hueArr.length));
		fill(this.hueArr[this.index], this.satArr[this.index], this.brightArr[this.index]);
		noStroke();
		rect(this.x, this.y, this.w, this.h);

		this.xoff += inc;
		//this.yoff += inc;
	}
}
