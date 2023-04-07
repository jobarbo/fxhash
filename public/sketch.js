function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(40, 5, 10);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
}

function draw() {
	stroke(0, 0, 100, 100);
	strokeWeight(width / width);
	fill(0, 0, 100, 100);
	noSmooth();
	ellipse(width / 2, height / 2, width / 20, width / 20);
}
