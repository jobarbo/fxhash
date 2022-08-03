function setup() {
	createCanvas(window.innerHeight, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 1000);
	noiseSeed(fxrand() * 1000);
	rectMode(CENTER);
	angleMode(DEGREES);
	smooth();

	let margin = -100;
	let border = 0;
	let xstart = random(1000);
	let xnoise = xstart;
	let ynoise = random(1000);
	let basew = 1;
	let step = 2;

	let hue = 80;
	let hueSteps = 120;

	let saturation = 100;
	let brightness = 100;
	let alpha = 100;

	background(50, 5, 15);

	for (let y = margin; y <= height - margin; y += step) {
		ynoise += 0.08;
		xnoise = xstart;
		for (let x = margin; x <= width - margin; x += step) {
			xnoise += 0.01;
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
	let bbrightness = random(0, 100);

	/* 	blendMode(DODGE);
	noStroke();
	fill(bhue, bsaturation, bbrightness);
	rect(width / 2, height / 2, width, height);
	blendMode(BLEND); */

	stroke(bhue, bsaturation, 0);
	strokeWeight(border);
	noFill();
	rect(width / 2, height / 2, width, height);

	//createTexture();
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

	let newSaturation = map(noiseFactor, 0.3, 1, 0, 80);
	let newBrightness = map(noiseFactor, 0, 1, 60, 10);
	let angle = map(noiseFactor, 0, 1, 100, 300);
	let sw = map(noiseFactor, 0, 0.8, 10, 0);

	push();
	translate(x, y);

	const len = map(noiseFactor, 0, 1, basew, basew + random(70));
	const phue = map(noiseFactor, 0, 1, 0, 25);
	const psaturation = map(noiseFactor, 0.5, 1, 0, 80);
	const pbrightness = map(noiseFactor, 0, 1, 0, 40);
	if (noiseFactor < 0.75) {
		rotate(angle);
		strokeWeight(sw);
		stroke(newHue, newSaturation, newBrightness);
		fill(newHue, newSaturation, newBrightness);
		line(0, 0, len, 0);
	} else {
		stroke(newHue, newSaturation - 50, newBrightness + 30, 10);
		fill(newHue, psaturation, pbrightness, 100);
		let elw = len;
		let elh = len;
		let elhlimit = random(0, -350);
		for (let y = 0; y > elhlimit; y -= 1.5) {
			rect(0, y, elw, elh);
			elh -= 0.5;
			if (elh < 0) {
				noStroke();
				elh = 0;
			}
		}
	}
	pop();
}

function createTexture() {
	let texture = [];

	for (let index = 0; index < 2000; index++) {
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
