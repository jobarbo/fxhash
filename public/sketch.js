let points = [];

function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 12);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	// create intersection points with the point class
	for (var i = 0; i < 500; i++) {
		// create a vector with random x and y values
		let position = createVector(random(100, width - 100), random(100, height - 100));
		points.push(new Intersection(position));
	}

	// show the points
}

function draw() {
	//background(210, 23, 92);
	for (var i = 0; i < points.length; i++) {
		points[i].show();
		points[i].move();

		// check if the point is intersecting with any other points
		for (var j = 0; j < points.length; j++) {
			// if the point is intersecting with itself, skip it
			if (i == j) {
				continue;
			}

			// if the point is intersecting with another point, draw a line between them
			if (dist(points[i].position.x, points[i].position.y, points[j].position.x, points[j].position.y) < 50) {
				points[i].isTouching(i, j);
			}
		}
	}
}
