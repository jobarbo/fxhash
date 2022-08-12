function setup() {
	createCanvas(window.innerHeight, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	background(60, 5, 5);

	createTexture();
}

function draw() {
	noLoop();
}
function createTexture() {
	let texture = [];

	for (let index = 0; index < 50; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(width / 200, width / 4);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1, hue);
	}
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 1500; j++) {
			texture[index].display();
		}
	}
}

class Smudge {
	constructor(rdnX, rdnY, w1) {
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.rdnW1 = w1;
		this.mapXLow = -width / 5;
		this.mapXHigh = width + width / 4;
		this.mapYLow = -height / 5;
		this.mapYHigh = height + height / 4;
		this.hue = 0;
		this.alpha = int(random(0, 10));
	}

	display() {
		this.xoff += 0.00002;
		this.yoff += 0.00002;
		this.woff1 += width / 50;

		const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 0, width / 1200);
		const x = map(noise(this.xoff + this.rdnX), 0, 1, this.mapXLow, this.mapXHigh);
		const y = map(noise(this.yoff + this.rdnY), 0, 1, this.mapYLow, this.mapYHigh);

		fill(this.hue, 0, 100, this.alpha);
		noStroke();
		rect(x, y, w1, w1);
		stroke(this.hue, 0, 100, this.alpha);
		line(x, y, x, height);
	}
}
