class Cell {
	constructor(x, y, w, h, margin, xoff, yoff, inc) {
		// Module ready to be built
		this.x = x + w / 2;
		this.y = y + h / 2;
		this.w = int(w - margin);
		this.h = int(h - margin);
		this.xoff = xoff;
		this.yoff = yoff;
		this.hueArr = [220, 210, 200, 45, 10, 75, 95, 100, 15, 15, 10];
		this.satArr = [100, 75, 40, 35, 45, 35, 80, 75, 10, 15, 0];
		this.brightArr = [70, 85, 100, 100, 70, 80, 60, 40, 25, 50, 100];
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
