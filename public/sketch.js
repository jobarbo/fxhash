let circles = [];
let circleNum = 3000;
let maxAttempts = circleNum * 20;
let count = 0;
let attempts = 0;
let margin = 5;
let overlappingCircles = [];
function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(20, 5, 5);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	margin = width / 15;

	// make an array of colors that looks like soap bubbles with mid saturation and high brightness
	let colors = [];
	for (let i = 0; i < 360; i += 1) {
		colors.push(color(i, 0, 100));
	}

	// create a circle packing algorithm
	// first generate a bunch of random circles and then check if they overlap
	// if they do, remove them and try again
	let allCircleGenerated = false;
	while (!allCircleGenerated) {
		let circle = new Circle(
			random(margin, width - margin),
			random(margin, height - margin),
			random(width / 5000, width / 10),
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
	/* 	let gen = drawCircles();
	setInterval(() => {
		gen.next();
	}, 0); */

	let gen2 = drawLines();
	setInterval(() => {
		gen2.next();
	}, 0);
}
// generator for drawing the circles
function* drawCircles() {
	for (let i = 0; i < circles.length; i += 1) {
		circles[i].show();
		if (i % 20 === 0) {
			yield;
		}
	}
}

// generator for drawing the lines
function* drawLines() {
	for (let i = 0; i < overlappingCircles.length; i += 1) {
		let line = new Line(
			overlappingCircles[i][0].x,
			overlappingCircles[i][0].y,
			overlappingCircles[i][1].x,
			overlappingCircles[i][1].y
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
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	show() {
		strokeWeight(0.5);
		stroke(0, 0, 100, 50);
		line(this.x1, this.y1, this.x2, this.y2);
		stroke(0, 100, 100, 20);
		line(this.x1 - random(3), this.y1 - random(3), this.x2 - random(3), this.y2 - random(3));
		stroke(200, 100, 100, 20);
		line(this.x1 + random(3), this.y1 + random(3), this.x2 + random(3), this.y2 + random(3));
	}
}
