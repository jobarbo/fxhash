class Ball {
	constructor(margin, colorArr, bgHue, texture) {
		this.r = random(width / 20, width / 5);
		this.d = this.r * 2;
		this.x = random(margin + this.r, width - (this.r + margin));
		this.y = random(margin + this.r, height - (this.r + margin));
		this.sHue = bgHue;
		this.color = random(colorArr);

		this.mask = '';
		this.texture = texture;

		this.mask = createGraphics(width, height);
		this.mask.pixelDensity(3);
		this.mask.colorMode(HSB, 360, 100, 100, 100);
		this.mask.background(this.color);
	}

	draw() {
		// draw the texture on the mask so that the texture is the same size as the ellipse
		this.mask.image(this.texture, this.x - this.r, this.y - this.r, this.d, this.d);
		this.mask.drawingContext.globalCompositeOperation = 'destination-in';

		this.mask.noStroke();

		this.mask.fill(this.color);
		this.mask.ellipse(this.x, this.y, this.r * 2, this.r * 2);

		image(this.mask, 0, 0);
	}
}
