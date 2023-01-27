function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(40, 4, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
}

function draw() {
	fill(10, 60, 0, 100);
	strokeWeight(width / width);
	noSmooth();
	ellipse(width / 2, height / 2, width / 3, width / 3);
}
