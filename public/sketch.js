/*
 * @name Noise Wave
 * @description Using Perlin Noise to generate a wave-like pattern.
 * Original by Daniel Shiffman.
 */
let seaYoff = 0.0;
let seaHoff = 0.1; // 2nd dimension of perlin noise
let seaMinY, seaMaxY, seaHue;
let seaStrokeSat = 20;
let seaStrokeBright = 100;
let seaStrokeAlpha = 0.001;
let seaFillSat = 60;
let seaFillBright = 100;
let seaFillAlpha = 0.001;

let hazeYoff = 0.0;
let hazeHoff = 0.1;
let hazeMinY, hazeMaxY, hazeHue;
let hazeStrokeSat = 30;
let hazeStrokeBright = 100;
let hazeStrokeAlpha = 0.01;
let hazeFillSat = 0;
let hazeFillBright = 0;
let hazeFillAlpha = 0;
let bgHue = 0;
function setup() {
	createCanvas(window.innerHeight, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 100);

	randomSeed(fxrand() * 100000);
	noiseSeed(fxrand() * 100000);
	bgHue = random(365);
	console.log(bgHue);
	background(bgHue, 23, 92);
	seaMinY = height / 2;
	seaMaxY = height / 1.95;
	seaHue = 265;

	hazeMinY = seaMinY + 250;
	hazeMaxY = seaMaxY + 250;
	hazeHue = bgHue;

	while (seaMinY < height) {
		createOcean();
	}
	while (hazeMinY > 0) {
		createHaze();
	}
}

function draw() {}
function createHaze() {
	strokeWeight(2);
	// We are going to draw a polygon out of the wave points
	beginShape();
	noFill();

	let xoff = 0;
	// Option #1: 2D Noise
	// let xoff = seaYoff; // Option #2: 1D Noise

	// Iterate over horizontal pixels
	for (let x = -100; x <= width + 100; x += 5) {
		// Calculate a y value according to noise, map to

		// Option #1: 2D Noise
		let y = map(noise(xoff, hazeYoff), 0, 1, hazeMinY, hazeMaxY);
		let h = map(noise(hazeYoff, hazeHoff + xoff), 0, 1, hazeHue - 30, hazeHue + 30);
		// Option #2: 1D Noise
		//let h = map(noise(seaHoff), 0, 1, 170, 240);
		stroke(h, hazeStrokeSat, hazeStrokeBright, hazeStrokeAlpha);
		// Set the vertex
		if (hazeMinY > 0) {
			curveVertex(x, y);
			xoff += 0.01;
			hazeHoff += 0.00002;
			hazeMinY -= 0.001;
			hazeMaxY -= 0.00115;
			if (hazeStrokeSat < 20) {
				hazeStrokeSat += 0.0005;
			}
			if (hazeStrokeBright > 75) {
				hazeStrokeBright -= 0.000003;
			}
			if (hazeStrokeAlpha < 100) {
				hazeStrokeAlpha += 0.00005;
			}
		}

		// Increment x dimension for noise
	}
	// increment y dimension for noise
	hazeYoff += 0.004;
	vertex(width + 100, -100);
	vertex(-100, -100);
	endShape(CLOSE);
}
function createOcean() {
	strokeWeight(2);
	// We are going to draw a polygon out of the wave points
	beginShape();
	noFill();

	let xoff = 0;
	// Option #1: 2D Noise
	// let xoff = seaYoff; // Option #2: 1D Noise

	// Iterate over horizontal pixels
	for (let x = -100; x <= width + 100; x += 5) {
		// Calculate a y value according to noise, map to

		// Option #1: 2D Noise
		let y = map(noise(xoff, seaYoff), 0, 1, seaMinY, seaMaxY);
		let h = map(noise(seaYoff, seaHoff + xoff), 0, 1, 160, 230);

		// Option #2: 1D Noise
		//let h = map(noise(seaHoff), 0, 1, 170, 240);
		stroke(hazeHue, seaStrokeSat, seaStrokeBright, seaStrokeAlpha);
		fill(h, seaFillSat, seaFillBright, seaFillAlpha);
		// Set the vertex
		if (seaMinY < height) {
			curveVertex(x, y);
			xoff += 0.01;
			seaHoff += 0.00002;
			seaMinY += 0.001;
			seaMaxY += 0.00115;
			if (seaStrokeSat < 20) {
				seaStrokeSat += 0.0005;
			}
			if (seaStrokeBright > 75) {
				seaStrokeBright -= 0.000003;
			}
			if (seaStrokeAlpha < 5) {
				seaStrokeAlpha += 0.0003;
			}
			if (seaFillSat < 70) {
				seaFillSat += 0.0005;
			}
			if (seaFillBright > 70) {
				seaFillBright -= 0.001;
			}
			if (seaFillAlpha < 10) {
				seaFillAlpha += 0.00015;
			}
		}

		// Increment x dimension for noise
	}
	// increment y dimension for noise
	seaYoff += 0.004;
	vertex(width + 100, height + 100);
	vertex(-100, height + 100);
	endShape(CLOSE);
}
