let horizon = '';
let ellipseX = '';
let ellipseY = '';
let ellipseR = '';
let horizon_lineArr = [];
function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(40, 0, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	horizon_lineArr = [
		0,
		height / 1.05,
		height / 1.1,
		height / 1.2,
		height / 1.35,
		height / 1.5,
		height / 1.75,
		height / 2,
		height / 2.5,
		height / 3,
		height / 4,
		height / 5,

		height / 8,

		height / 13,

		height / 25,

		height / 80,

		height,
	];
	let horizon_line = random(horizon_lineArr);

	ellipseX = random(width);
	ellipseY = random(horizon_line);
	ellipseR = 100;

	console.log('horizon line: ' + horizon_line);
	horizon = new Horizon(horizon_line);
}

function draw() {
	stroke(0, 0, 0, 100);

	strokeWeight(3);

	noStroke();
	fill(0, 100, 0, 100);
	noFill();
	stroke(0, 100, 0, 100);
	ellipse(ellipseX, ellipseY - ellipseR / 2, ellipseR, ellipseR);
	strokeWeight(1.5);
	ellipse(ellipseX, ellipseY - ellipseR / 2, ellipseR / 5, ellipseR / 5);
	line(0, 0, ellipseX, ellipseY - ellipseR / 2);
	line(width, 0, ellipseX, ellipseY - ellipseR / 2);
	line(0, height, ellipseX, ellipseY - ellipseR / 2);
	line(width, height, ellipseX, ellipseY - ellipseR / 2);

	// draw a rect at the horizon line full width that goes to the bottom of the canvas
	fill(111, 30, 0, 100);
	rect(0, horizon.y, width, height);

	horizon.draw();

	// always draw the ellipse on the top half of the canvas
}
