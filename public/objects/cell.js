class Cell {
	constructor(x, y, w, h, margin, xoff, yoff, inc, palette) {
		// Module ready to be built
		this.x = x + w / 2;
		this.y = y + h / 2;

		this.w = w - margin;
		this.h = h - margin;

		//console.log(`this.w: ${this.w}`);
		//console.log(`this.h: ${this.h}`);

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

		fill(this.hue, this.sat, this.bright);
		noStroke();
		rect(this.x, this.y, this.w, this.h);

		//this.xoff += inc;
		//this.yoff += inc;
	}

	createNoise() {
		let nx = this.x,
			ny = this.y,
			a = 9.5,
			sc = 0.002,
			dx,
			dy;

		dx = n3(nx, ny, sc, 0);
		dy = n3(nx, ny, sc, 1);
		nx += dx * a;
		ny += dy * a;

		dx = n3(nx, ny, sc, 0);
		dy = n3(nx, ny, sc, 1);
		nx += dx * a;
		ny += dy * a;

		dx = n3(nx, ny, sc, 0);
		dy = n3(nx, ny, sc, 1);
		nx += dx * a;
		ny += dy * a;

		//this.noise = noise(this.xoff, this.yoff);
		//this.index = int(map(this.noise, 0.2, 0.8, 0, this.biomes.length - 1, true));

		this.noise = n3(nx, ny, 0.003, 2);
		this.index = int(map(this.noise, -0.5, 0.5, 0, this.biomes.length - 1, true));

		this.hue = this.biomes[this.index][0];
		this.sat = this.biomes[this.index][1];
		this.bright = this.biomes[this.index][2];
	}
}
