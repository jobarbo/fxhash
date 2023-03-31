let myFont;
generateConsoleLogs();
function preload() {
	myFont = loadFont('CourierPrime-Bold.ttf');
}
function setup() {
	createCanvas(1000, 1000);
	pixelDensity(3);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 1000);
	noiseSeed(fxrand() * 1000);
	rectMode(CENTER);
	angleMode(DEGREES);
	smooth();

	let margin = -width / 8;
	let border = width / 60;
	let xstart = random(width * 1.25);
	let xnoise = xstart;
	let ynoise = random(width * 1.25);

	//make 2d array with name and double value

	let mode = window.$fxhashFeatures.mode;
	let modeYnoise = window.$fxhashFeatures.ynoise;
	let modeXnoise = window.$fxhashFeatures.xnoise;
	let baselen = window.$fxhashFeatures.base_length;
	let step = window.$fxhashFeatures.step;
	let hue = window.$fxhashFeatures.hue;
	let hueSteps = window.$fxhashFeatures.hue_steps;
	let maxsw = window.$fxhashFeatures.max_stroke_weight;
	let baseAngle = window.$fxhashFeatures.base_angle;
	let reliefMode = window.$fxhashFeatures.relief_mode;
	let letterArr = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	];

	background(hue, 80, 50);

	let sketch = drawthings(
		margin,
		border,
		xstart,
		xnoise,
		ynoise,
		mode,
		modeYnoise,
		modeXnoise,
		baselen,
		step,
		hue,
		hueSteps,
		maxsw,
		baseAngle,
		reliefMode
	);

	let interval = setInterval(() => {
		let result = sketch.next();
		if (result.done) {
			clearInterval(interval);

			let bhue = random(360);
			let bsaturation = random(80, 100);
			let bbrightness = random(0, 15);
			strokeWeight(border);
			noFill();
			stroke(hue, bsaturation, bbrightness);
			rect(width / 2, height / 2, width - border, height - border);

			// write name of planet
			let txt = `Planet ${Math.floor(random(1, 999))}${random(letterArr)}-${Math.floor(random(1, 99))}-${Math.floor(
				random(1, 9)
			)}${random(letterArr)}`;
			textSize(width / 60);
			textFont(myFont);
			rectMode(CENTER);
			fill(hue, bsaturation, bbrightness);
			noStroke();
			rect(
				border + (textWidth(txt) + width / 40 - 1) / 2,
				border + textAscent(txt),
				textWidth(txt) + width / 40,
				textAscent(txt) + width / 53
			);
			fill(hue, 10, 100);
			textAlign(CENTER, CENTER);
			text(txt, border + (textWidth(txt) + width / 40) / 2, border + textAscent(txt) / 1.5);

			// draw texture
			createTexture(hue);

			fxpreview();
		}
	}, 0);
}

/* draw line according to the noise factor */
function drawLine(x, y, noiseFactor, baselen, hue, hueSteps, maxsw, baseAngle, reliefMode) {
	let newHue = map(noiseFactor, 0, 1, hue - hueSteps, hue + hueSteps);

	// if newHue is out of range, set it to the closest bound
	if (newHue < 0) {
		newHue = 360 + newHue; // add 360 to make it positive
	} else if (newHue > 360) {
		newHue = newHue - 360; // subtract 360 to make it positive
	}

	let newSaturation = map(noiseFactor, 0, 1, 100, 20);
	let newBrightness = map(noiseFactor, 0, 1, 20, 95);
	let angle = map(noiseFactor, 0, 1, 0, baseAngle);
	let sw = map(noiseFactor, 0, 1, maxsw, width / 8000);
	let len = map(noiseFactor, 0, 1, width / 8000, baselen + random(0, baselen / 5));

	push();
	translate(x, y);
	rotate(angle);

	strokeWeight(sw);
	stroke(newHue, newSaturation, newBrightness, 100);
	fill(newHue, newSaturation, newBrightness, 100);
	line(0, 0, len, 0);

	if (noiseFactor > 0.5) {
		strokeWeight(2);
		stroke(newHue, newSaturation + 10, newBrightness - 35, 15);
		if (reliefMode == 'rocky') {
			circle(len, random(-len / 10, len / 10), len / 10);
		} else {
			ellipse(len, random(-len / 10, len / 10), sw / 3, sw * 3); // draw an ellipse
		}
	} else {
		// draw beaches
		noFill();
		strokeWeight(5);
		stroke(newHue, 5, 95, 10);
		ellipse(len, len / 5, len / 5, len / 10);
	}
	pop();
}

function* drawthings(
	margin,
	border,
	xstart,
	xnoise,
	ynoise,
	mode,
	modeYnoise,
	modeXnoise,
	baselen,
	step,
	hue,
	hueSteps,
	maxsw,
	baseAngle,
	reliefMode
) {
	let count = 0;
	let draw_every = 500;

	for (let y = margin; y <= height - margin; y += step) {
		ynoise += modeYnoise;
		xnoise = xstart;
		for (let x = margin; x <= width - margin; x += step) {
			xnoise += modeXnoise;
			drawLine(x, y, noise(xnoise, ynoise), baselen, hue, hueSteps, maxsw, baseAngle, reliefMode);
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
	// when the function gets here it returns and done === true
}

function createTexture(hue) {
	let texture = [];

	for (let index = 0; index < 2000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(width / 160, width / 6);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1, hue);
	}
	let sketch_texture = drawTexture(texture);
	let interval = setInterval(() => {
		let result = sketch_texture.next();
		if (result.done) {
			clearInterval(interval);
		}
	}, 0);
}

function* drawTexture(texture) {
	let count = 0;
	let draw_every = 500;
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 10500; j++) {
			texture[index].display();
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
}

class Smudge {
	constructor(rdnX, rdnY, w1, hue) {
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
		this.hue = hue;
		this.alpha = int(random(0, 15));
	}

	display() {
		this.xoff += width / 266666.67;
		this.yoff += width / 100000;
		this.woff1 += width / 1454.55;

		const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 0, width / 800);
		const x = map(noise(this.xoff + this.rdnX), 0, 1, this.mapXLow, this.mapXHigh);
		const y = map(noise(this.yoff + this.rdnY), 0, 1, this.mapYLow, this.mapYHigh);

		fill(this.hue, 20, 100, this.alpha);
		noStroke();
		rect(x, y, w1, w1);
	}
}
