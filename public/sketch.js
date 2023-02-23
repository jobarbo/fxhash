let circles = [];
let circleNum = 5000;
let maxAttempts = circleNum * 2;
let count = 0;
let attempts = 0;
let margin = 5;
let overlappingCircles = [];
let sizeArr = [];
function setup() {
	pixelDensity(3.0);
	createCanvas(1500, 1500);
	colorMode(HSB, 360, 100, 100, 100);
	background(50, 5, 10);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	margin = width / 10;

	// make an array of colors that looks like soap bubbles with mid saturation and high brightness
	let colors = [];
	for (let i = 0; i < 360; i += 1) {
		colors.push(color(i, 0, 100));
	}

	// create a circle packing algorithm
	// first generate a bunch of random circles and then check if they overlap
	// if they do, remove them and try again
	let allCircleGenerated = false;
	sizeArr = [width / 1000, width / 10];
	while (!allCircleGenerated) {
		let circle = new Circle(
			random(margin, width - margin),
			random(margin, height - margin),
			random(sizeArr[0], sizeArr[1]),
			random(colors)
		);
		let overlapping = false;
		for (let i = 0; i < circles.length; i += 1) {
			let other = circles[i];
			if (circle.overlaps(other)) {
				overlapping = true;
				// if they overlap, store the position of both circles
				overlappingCircles.push([circle, other]);
				// draw a line between the two circles
				break;
			}
		}
		if (!overlapping) {
			circles.push(circle);
			count += 1;
		} else {
			// if they overlap, destroy the circle
			circle = null;
		}
		attempts += 1;
		if (attempts > maxAttempts) {
			allCircleGenerated = true;
			console.log('finished');
		}
		if (count >= circleNum) {
			allCircleGenerated = true;
		}
	}

	// if all circles are generated, start the generator
	if (allCircleGenerated) {
		startGenerator();
	}
}
function startGenerator() {
	let gen = drawCircles();
	setInterval(() => {
		gen.next();
	}, 0);

	let gen2 = drawLines();
	setInterval(() => {
		gen2.next();
	}, 0);
}
// generator for drawing the circles
function* drawCircles() {
	for (let i = 0; i < circles.length; i += 1) {
		//circles[i].show();
		if (i % 20 === 0) {
			yield;
		}
	}
}

// generator for drawing the lines
function* drawLines() {
	for (let i = 0; i < overlappingCircles.length; i += 1) {
		let line = new Line(
			overlappingCircles[i][0],
			overlappingCircles[i][1],
			overlappingCircles[i][0].r + overlappingCircles[i][1].r,
			sizeArr[1] + sizeArr[1],
			sizeArr[0] + sizeArr[0]
		);
		line.show();
		if (i % 200 === 0) {
			yield;
		}
	}
}

// create the circle class object
class Circle {
	constructor(x, y, r, c) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.c = c;
	}

	show() {
		strokeWeight(1);
		noFill();
		stroke(this.c);
		ellipse(this.x, this.y, this.r * 2);
	}

	// check if the circle is overlapping with another circle
	overlaps(other) {
		let d = dist(this.x, this.y, other.x, other.y);
		return d < this.r + other.r;
	}
}

// create a line class object that connects two overlapping circles
class Line {
	constructor(circle1, circle2, totalR, maxR, minR) {
		this.badCircle = circle1;
		this.goodCircle = circle2;
		this.biggestCircle = circle1.r > circle2.r ? circle1 : circle2;
		this.smallestCircle = circle1.r < circle2.r ? circle1 : circle2;
		this.x1 = this.goodCircle.x;
		this.y1 = this.goodCircle.y;
		this.x2 = this.badCircle.x;
		this.y2 = this.badCircle.y;
		this.d = dist(this.x1, this.y1, this.x2, this.y2);
		this.r = totalR;
		this.maxR = maxR;
		this.minR = minR;
		this.h = map(this.goodCircle.r, this.minR, this.maxR, 50, 0);
		this.s = 0;
		this.b1 = 30;
		this.b2 = 100;
		this.b3 = 60;
	}

	show() {
		let nodes = 200;
		// instead of drawing a straight line, draw a vertex line with vector points(nodes)
		// displace the nodes with noise
		let start = createVector(this.x1, this.y1);
		let end = createVector(this.x2, this.y2);

		// make a list of points that are on the line
		// from this.x1, this.y1 to this.x2, this.y2
		let points = [];
		for (let i = 0; i < nodes; i += 1) {
			let x = lerp(start.x, end.x, i / (nodes - 1));
			let y = lerp(start.y, end.y, i / (nodes - 1));
			points.push({x: x, y: y});
		}

		let xoff = random(100000000);
		let yoff = random(100000000);
		let sw = 1;

		let noiseArr = [];

		let lastPoint = points[points.length - 1];
		noFill();
		beginShape();
		// first vertex is in the center of the good circle
		vertex(this.goodCircle.x, this.goodCircle.y);
		for (let i = 0; i < points.length - 1; i += 1) {
			this.h = map(this.goodCircle.r, this.minR, this.maxR, 50, 0);
			this.s += 1;
			let x = points[i].x;
			let y = points[i].y;

			// displace the points with noise
			let nx = map(noise(xoff), 0, 1, -20, 20);
			let ny = map(noise(yoff), 0, 1, -20, 20);
			xoff += 0.005;
			yoff += 0.005;

			noiseArr.push({x: nx, y: ny});

			// draw the line
			strokeWeight(2);

			stroke(this.h, this.s, this.b1 - 20);
			vertex(x + nx, y + ny);
			lastPoint = {x: x + nx, y: y + ny};
		}
		// last vertex is in the center of the bad circle
		vertex(lastPoint.x, lastPoint.y);
		endShape();

		this.s = 0;
		lastPoint = points[points.length - 1];
		noFill();
		beginShape();
		// first vertex is in the center of the good circle
		vertex(this.goodCircle.x, this.goodCircle.y);
		for (let i = 0; i < points.length - 1; i += 1) {
			this.h = map(this.goodCircle.r, this.minR, this.maxR, 50, 0);
			this.s += 1;
			let x = points[i].x;
			let y = points[i].y;

			// displace the points with noise
			let nx = noiseArr[i].x;
			let ny = noiseArr[i].y;

			// draw the line
			strokeWeight(2);

			stroke(this.h, this.s, this.b2 - 20);
			vertex(x + nx - 1, y + ny - 1);
			lastPoint = {x: x + nx, y: y + ny};
		}
		// last vertex is in the center of the bad circle
		vertex(lastPoint.x, lastPoint.y);
		endShape();

		this.s = 0;
		lastPoint = points[points.length - 1];
		noFill();
		beginShape();
		// first vertex is in the center of the good circle
		vertex(this.goodCircle.x, this.goodCircle.y);
		for (let i = 0; i < points.length - 1; i += 1) {
			this.h = map(this.goodCircle.r, this.minR, this.maxR, 50, 0);
			this.s += 1;
			let x = points[i].x;
			let y = points[i].y;

			// displace the points with noise
			let nx = noiseArr[i].x;
			let ny = noiseArr[i].y;

			// draw the line
			strokeWeight(2);

			stroke(this.h, this.s, this.b3 - 20);
			vertex(x + nx + 1, y + ny + 1);
			lastPoint = {x: x + nx, y: y + ny};
		}
		// last vertex is in the center of the bad circle
		vertex(lastPoint.x, lastPoint.y);
		endShape();
	}
}
