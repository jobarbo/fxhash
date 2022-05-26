/*
 * @name Noise Wave
 * @description Using Perlin Noise to generate a wave-like pattern.
 * Original by Daniel Shiffman.
 */
let yoff = 0.0;
let hoff = 0.1; // 2nd dimension of perlin noise
let landMinY, landMaxY, landHue;
let strokeSat = 1;
let strokeBright = 90;
let fillSat = 10;
let fillBright = 65;
function setup() {
	createCanvas(window.innerHeight, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10);
	noiseSeed(fxrand() * 10);
	landMinY = height / 2;
	landMaxY = height / 1.95;
	landHue = 265;

	while (landMinY < height) {
		createLandscape();
	}
}

function draw() {}

function createLandscape() {
	strokeWeight(2);
	// We are going to draw a polygon out of the wave points
	beginShape();
	noFill();

	let xoff = 0;
	// Option #1: 2D Noise
	// let xoff = yoff; // Option #2: 1D Noise

	// Iterate over horizontal pixels
	for (let x = -100; x <= width + 100; x += 5) {
		// Calculate a y value according to noise, map to

		// Option #1: 2D Noise
		let y = map(noise(xoff, yoff), 0, 1, landMinY, landMaxY);
		let h = map(noise(yoff, hoff + xoff), 0, 1, 160, 230);

		// Option #2: 1D Noise
		//let h = map(noise(hoff), 0, 1, 170, 240);
		stroke(h, strokeSat, strokeBright, 20);
		fill(h, fillSat, fillBright, 20);
		// Set the vertex
		if (landMinY < height) {
			curveVertex(x, y);
			xoff += 0.01;
			hoff += 0.00002;
			landMinY += 0.001;
			landMaxY += 0.00115;
			if (strokeSat < 65) {
				strokeSat += 0.0005;
			}
			if (strokeBright > 75) {
				strokeBright -= 0.000003;
			}
			if (fillSat < 70) {
				fillSat += 0.00005;
			}
			if (fillBright > 40) {
				fillBright -= 0.003;
			}
			//console.log(landMinY);
		}

		// Increment x dimension for noise
	}
	// increment y dimension for noise
	yoff += 0.004;
	vertex(width + 100, height + 100);
	vertex(-100, height + 100);
	endShape(CLOSE);
}
