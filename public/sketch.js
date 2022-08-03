function setup() {
	createCanvas(window.innerHeight, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 1000);
	noiseSeed(fxrand() * 1000);
	rectMode(CENTER);
	angleMode(DEGREES);
	smooth();

	let margin = -100;
	let border = width / 20;
	let xstart = random(1000);
	let xnoise = xstart;
	let ynoise = random(1000);

	//make 2d array with name and double value
	let modeArr = [
		['hard dunes', 0.1, 0.01],
		['dunes', 0.05, 0.01],
		['drapes', 0.001, 0.015],
		['soft drapes', 0.001, 0.005],
		['soft dunes', 0.02, 0.002],
		['super soft dunes', 0.01, 0.001],
		['hardcorn', 0.1, 0.08],
		['popcorn', 0.035, 0.025],
		['softcorn', 0.015, 0.01],
	];

	let mode = window.$fxhashFeatures.mode;
	let modeYnoise = window.$fxhashFeatures.ynoise;
	let modeXnoise = window.$fxhashFeatures.xnoise;
	let baselen = window.$fxhashFeatures.base_length;
	let step = window.$fxhashFeatures.step;
	let hue = window.$fxhashFeatures.hue;
	let hueSteps = window.$fxhashFeatures.hue_steps;
	let maxsw = window.$fxhashFeatures.max_stroke_weight;
	let baseAngle = window.$fxhashFeatures.base_angle;

	background(50, 5, 15);

	for (let y = margin; y <= height - margin; y += step) {
		ynoise += modeYnoise;
		xnoise = xstart;
		for (let x = margin; x <= width - margin; x += step) {
			xnoise += modeXnoise;
			drawLine(x, y, noise(xnoise, ynoise), baselen, hue, hueSteps, maxsw, baseAngle);
		}
	}

	createTexture();

	blendMode(OVERLAY);
	let bhue = random(360);
	let bsaturation = random(80, 100);
	let bbrightness = random(0, 20);
	stroke(bhue, bsaturation, bbrightness);
	strokeWeight(border);
	noFill();
	rect(width / 2, height / 2, width, height);
	blendMode(BLEND);
}

/* draw line according to the noise factor */
function drawLine(x, y, noiseFactor, baselen, hue, hueSteps, maxsw, baseAngle) {
	let newHue = map(noiseFactor, 0, 1, hue - hueSteps, hue + hueSteps);

	// if newHue is out of range, set it to the closest bound
	if (newHue < 0) {
		newHue = 360 + newHue; // add 360 to make it positive
	} else if (newHue > 360) {
		newHue = newHue - 360; // subtract 360 to make it positive
	}

	let newSaturation = map(noiseFactor, 0, 1, 90, 10);
	let newBrightness = map(noiseFactor, 0, 1, 10, 90);
	let angle = map(noiseFactor, 0, 1, 0, baseAngle);
	let sw = map(noiseFactor, 0, 1, maxsw, 0); // stroke weight

	push();
	translate(x, y);
	rotate(angle);
	strokeWeight(sw);
	stroke(newHue, newSaturation, newBrightness, 100);
	fill(newHue, newSaturation, newBrightness, 100);
	const len = map(noiseFactor, 0, 1, 0, baselen);
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
		for (let j = 0; j < 500; j++) {
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
