function setup() {
	createCanvas(window.innerHeight, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 1000);
	noiseSeed(fxrand() * 1000);
	rectMode(CENTER);
	angleMode(DEGREES);
	smooth();

	let margin = 0;
	let border = width / 20;
	let xstart = random(1000);
	let xnoise = xstart;
	let ynoise = random(1000);
	let basew = 100;
	let step = 1;

	let hue = random(360);
	let hueSteps = random(50, 200);

	let saturation = 100;
	let brightness = 100;
	let alpha = 100;

	background(50, 5, 15);

	// dunes = ynoise(0.05) & xnoise(0.01)
	// drapes = ynoise(0.001) & xnoise(0.015)
	// soft drapes = ynoise(0.001) & xnoise(0.01)
	// soft hills = ynoise(0.02) & xnoise(0.002)
	// super soft hills = ynoise(0.01) & xnoise(0.001)
	for (let y = margin; y <= height - margin; y += step) {
		ynoise += 0.05;
		xnoise = xstart;
		for (let x = margin; x <= width - margin; x += step) {
			xnoise += 0.0005;
			drawLine(x, y, noise(xnoise, ynoise), basew, hue, hueSteps);
		}
	}

	// random rect in the canvas
	/* 	fill(hue / 2, 100, 100);
	let rw = random(width / 3, width / 1.5);
	noStroke();
	blendMode(OVERLAY);
	rect(random(width), random(height), rw, rw);
	blendMode(BLEND); */

	let bhue = random(360);
	let bsaturation = random(80, 100);
	let bbrightness = random(0, 20);

	/* 	blendMode(DODGE);
	noStroke();
	fill(bhue, bsaturation, bbrightness);
	rect(width / 2, height / 2, width, height);
	blendMode(BLEND); */

	stroke(bhue, bsaturation, bbrightness);
	strokeWeight(border);
	noFill();
	rect(width / 2, height / 2, width, height);

	//blendMode(OVERLAY);
	createTexture();
	//blendMode(BLEND);
}

/* draw line according to the noise factor */
function drawLine(x, y, noiseFactor, basew, hue, hueSteps) {
	let newHue = map(noiseFactor, 0, 1, hue - hueSteps, hue + hueSteps);

	// if newHue is out of range, set it to the closest bound
	if (newHue < 0) {
		newHue = 360 + newHue; // add 360 to make it positive
	} else if (newHue > 360) {
		newHue = newHue - 360; // subtract 360 to make it positive
	}

	let newSaturation = map(noiseFactor, 0, 1, 100, 20);
	let newBrightness = map(noiseFactor, 0, 1, 20, 100);
	let angle = map(noiseFactor, 0, 1, 0, 360);
	let sw = map(noiseFactor, 0, 1, 50, 0);

	push();
	translate(x, y);
	rotate(angle);
	strokeWeight(sw);
	stroke(newHue, newSaturation, newBrightness);
	fill(newHue, newSaturation, newBrightness);
	const len = map(noiseFactor, 0, 1, 0, basew);
	line(0, 0, len, 0);
	pop();
}

function createTexture() {
	let texture = [];

	for (let index = 0; index < 1000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(5, 150);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1);
	}
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 1000; j++) {
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
		this.mapXLow = -width / 3;
		this.mapXHigh = width * 1.5;
		this.mapYLow = -height / 3;
		this.mapYHigh = height * 1.5;
		this.alpha = int(random(0, 15));
	}

	display() {
		this.xoff += 0.003;
		this.yoff += 0.008;
		this.woff1 += 0.55;

		const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 0, 1);
		const x = map(noise(this.xoff + this.rdnX), 0, 1, this.mapXLow, this.mapXHigh);
		const y = map(noise(this.yoff + this.rdnY), 0, 1, this.mapYLow, this.mapYHigh);

		fill(207, 0, 100, this.alpha);
		noStroke();
		ellipse(x, y, w1, w1);
	}
}
