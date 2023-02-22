let circles = [];
let circleNum = 1000;
let maxAttempts = circleNum * 10000;
let count = 0;
let attempts = 0;
let margin = 5;
let overlappingCircles = [];
function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(200, 0, 10);
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
	while (!allCircleGenerated) {
		let circle = new Circle(
			random(margin, width - margin),
			random(margin, height - margin),
			random(width / 5000, width / 4),
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
	blendMode(OVERLAY);
	let circleDone = false;
	let lineDone = false;
	let gen = drawCircles();
	setInterval(() => {
		result = gen.next();
		if (result.done) {
			circleDone = true;
		}
	}, 0);

	let gen2 = drawLines();
	setInterval(() => {
		if (circleDone) {
			result = gen2.next();
		}
		// if gen2 is finished, reset blend mode
		if (result.done) {
			lineDone = true;
		}
	}, 0);
}
// generator for drawing the circles
function* drawCircles() {
	for (let i = 0; i < circles.length; i += 1) {
		circles[i].show();
		if (i % 200 === 0) {
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
		this.c.setAlpha(5);
	}

	show() {
		noStroke();
		fill(this.c);
		strokeWeight(this.r / 60);
		for (let i = 0; i < 10; i += 1) {
			let randX = random(-this.r / 10, this.r / 10);
			let randY = random(-this.r / 10, this.r / 10);
			let randX2 = random(-this.r / 10, this.r / 10);
			let randY2 = random(-this.r / 10, this.r / 10);
			let randX3 = random(-this.r / 10, this.r / 10);
			let randY3 = random(-this.r / 10, this.r / 10);

			noStroke();
			fill(45, 30, 100, 15);
			ellipse(this.x + randX, this.y + randY, this.r, this.r);
			fill(0, 30, 100, 15);
			stroke(45, 100, 100, 15);
			ellipse(this.x + randX2, this.y + randY, this.r / 1.05, this.r / 1.05);
			fill(0, 30, 100, 15);
			stroke(0, 100, 100, 15);
			ellipse(this.x + randX2, this.y + randY2, this.r / 1.05, this.r / 1.05);
			fill(200, 30, 100, 15);
			stroke(200, 100, 100, 15);
			ellipse(this.x + randX3, this.y + randY3, this.r / 1.05, this.r / 1.05);
		}
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
		let rand = random(4);

		strokeWeight(random(1));
		stroke(45, 0, 100, 3);
		line(this.x1, this.y1, this.x2, this.y2);
		stroke(0, 100, 100, 1);
		line(this.x1 - rand, this.y1 - rand, this.x2 - rand, this.y2 - rand);
		stroke(200, 100, 100, 1);
		line(this.x1 + rand, this.y1 + rand, this.x2 + rand, this.y2 + rand);
		stroke(45, 100, 100, 1);
		line(this.x1 + rand, this.y1 + rand, this.x2 + rand, this.y2 + rand);
	}
}
