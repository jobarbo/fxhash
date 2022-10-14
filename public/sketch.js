let inc = 0.01;
function setup() {
	pixelDensity(3.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
}

function draw() {
	loadPixels();
	background(51);
	stroke(255);
	noFill();
	beginShape();
	endShape();
}
