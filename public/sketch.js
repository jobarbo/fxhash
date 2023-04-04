let horizon = '';
let ellipseX = '';
let ellipseY = '';
let ellipseR = '';
let horizon_lineArr = [];
let vanishing_point = '';
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

	horizon = new Horizon(horizon_line);
	vanishing_point = new VanishingPoint(random(0, width), horizon.y, 1);

	horizon.debug = true;
	vanishing_point.debug = true;

	ellipseX = random(width);
	ellipseY = horizon.y;
	ellipseR = 100;
}

function draw() {
	noLoop();

	// check if key 68 is pressed
	// if so, toggle debug mode
	if (keyIsDown(68)) {
		horizon.debug = !horizon.debug;
		vanishing_point.debug = !vanishing_point.debug;
	}

	/* 	noFill();
	stroke(0, 100, 0, 100);
	ellipse(ellipseX, ellipseY, ellipseR, ellipseR);
	strokeWeight(1.5);
	ellipse(ellipseX, ellipseY, ellipseR / 5, ellipseR / 5);
	line(0, 0, ellipseX, ellipseY);
	line(width, 0, ellipseX, ellipseY);
	stroke(0, 0, 100, 100);
	line(0, height, ellipseX, ellipseY);
	line(width, height, ellipseX, ellipseY); */
	// always draw the ellipse on the top half of the canvas
}
