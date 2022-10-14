let xoffStart = 0;

let xoffInc = 0.003;

function setup() {
	pixelDensity(3.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
}

function draw() {
	background(210, 23, 10);
	noFill();
	beginShape();
	stroke(0, 0, 70, 100);
	strokeWeight(1);
	let xoff = xoffStart;
	for (let x = -100; x <= width + 100; x++) {
		let n = map(noise(xoff), 0, 1, -400, 400);
		let s = map(sin(xoff), -1, 1, 400, height - 400);
		let y = s + n;
		vertex(x, y);
		xoff += xoffInc;
	}
	endShape();
	xoffStart += xoffInc;
}
