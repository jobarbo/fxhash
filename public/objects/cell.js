class Cell {
	constructor(x, y, w, h, margin, xoff, yoff, inc, palette) {
		// Module ready to be built
		this.x = x + w / 2;
		this.y = y + h / 2;

		this.w = int(w - margin);
		this.h = int(h - margin);
		this.xoff = xoff;
		this.yoff = yoff;

		this.biomes = palette;
		console.log(this.biomes.length);
		// chose a rondom biome from the palette array according to the noise value
		this.noise = noise(this.xoff, this.yoff);
		this.index = int(map(this.noise, 0.2, 0.8, 0, this.biomes.length - 1, true));

		this.hue = this.biomes[this.index][0];
		this.sat = this.biomes[this.index][1];
		this.bright = this.biomes[this.index][2];
	}
	display(inc) {
		// Module ready to be built

		this.noise = noise(this.xoff, this.yoff);
		this.index = int(map(this.noise, 0.2, 0.8, 0, this.biomes.length - 1, true));
		this.hue = this.biomes[this.index][0];
		this.sat = this.biomes[this.index][1];
		this.bright = this.biomes[this.index][2];
		fill(this.hue, this.sat, this.bright);
		noStroke();
		rect(this.x, this.y, this.w, this.h);

		this.xoff += inc;
		//this.yoff += inc;
	}
}
