class Cell {
	constructor(x, y, w, h, margin, xoff, yoff, inc, palette) {
		// Module ready to be built
		this.x = x + w / 2;
		this.y = y + h / 2;

		this.w = w - margin;
		this.h = h - margin;

		this.xoff = xoff;
		this.yoff = yoff;

		this.biomes = palette;
		this.index = 0;
		this.hue = 0;
		this.sat = 0;
		this.bright = 0;

		this.createNoise();
	}
	display(inc) {
		// Module ready to be built

		this.createNoise();

		noStroke();
		fill(this.hue, this.sat, this.bright, 100);
		rect(this.x, this.y, this.w, this.h);

		//this.xoff += inc;
		//this.yoff += inc;
	}

	createNoise() {
		let nx = this.x,
			ny = this.y,
			a = 20000,
			a2 = 20000,
			sc = 0.00021,
			sc2 = 0.00021,
			dx,
			dy;

		dx = oct4(nx, ny, sc, 3);
		dy = oct4(ny, nx, sc2, 1);
		nx += dx * a;
		ny += dy * a2;

		dx = oct4(nx, ny, sc, 2);
		dy = oct4(ny, nx, sc2, 0);
		nx += dx * a2;
		ny += dy * a2;

		dx = oct4(nx, ny, sc, 1);
		dy = oct4(ny, nx, sc2, 2);
		nx += dx * a;
		ny += dy * a2;

		let un = oct4(nx, ny, sc, 1);
		let vn = oct4(nx, ny, sc2, 3);

		let u = map(un, -0.5, 0.5, -0.5, 0.5);
		let v = map(vn, -0.5, 0.5, -0.5, 0.5);

		this.index = int(map(u + v, -1, 1, 0, this.biomes.length - 1, true));

		this.hue = this.biomes[this.index][0];
		this.sat = this.biomes[this.index][1];
		this.bright = this.biomes[this.index][2];
	}
}
