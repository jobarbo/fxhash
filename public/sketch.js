function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	// create intersection points with the point class
	var points = [];
	for (var i = 0; i < 100; i++) {
		points.push(new Point(random(width), random(height)));
	}

	// show the points
	for (var i = 0; i < points.length; i++) {
		points[i].show();
	}
}

function draw() {
	stroke(0, 0, 0, 10);
	strokeWeight(width / width);
	noSmooth();
	ellipse(width / 2, height / 2, width / 20, width / 20);
}
