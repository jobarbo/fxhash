let circles = [];
let circleNum = 100000;
let maxAttempts = circleNum * 10;
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
	sizeArr = [width / 500, width / 10];
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
		let start = createVector(this.x2, this.y2);
		let end = createVector(this.x1, this.y1);

		let v = p5.Vector.sub(end, start);
		v.div(nodes - 1);
		console.log(v);

		// map the stroke width of the first node according to the difference between radius of the biggest circle and the max radius

		//beginShape();

		let startw = map(this.goodCircle.r, this.minR * 15, this.maxR, 10, 20);
		let endw = startw / 10;
		if (startw < 10) {
			startw = 0;
			endw = 0;
		}

		endw = constrain(endw, 0, 10);

		let sw = 0;

		let xoff = random(100000000);
		let yoff = 1;

		for (let i = 0; i < nodes; i += 1) {
			let nx = noise(xoff, yoff);
			let ny = noise(yoff, xoff);
			let x = start.x + v.x * i + nx * 25;
			let y = start.y + v.y * i + ny * 25;
			let n = noise(x / 2, y / 2);
			let d = dist(x, y, this.x1, this.y1);

			this.s = map(d, 0, this.d / 2, 0, 50);

			// make the stroke width of the first node the biggest and the last node the smallest
			sw = map(d, 0, this.d, startw, endw);
			// constrain the stroke width to be never smaller than 0
			sw = constrain(sw, endw, startw);
			let rand2 = map(n, 0, 1, -sw / 3, -sw / 100);
			let rand3 = map(n, 0, 1, sw / 100, sw / 3);

			strokeWeight(sw);
			stroke(this.h, this.s, this.b1, 20);
			point(x + rand2, y + rand2);
			stroke(this.h, this.s, this.b2, 20);
			point(x + rand3, y + rand3);
			stroke(this.h, this.s, this.b3, 30);
			point(x, y);
			//vertex(x + rand, y + rand);

			xoff += 0.005;
			yoff += 0.005;
		}

		//endShape();

		/* let rand = random(3);

		strokeWeight(1);
		stroke(0, 0, 100, 20);
		line(this.x1, this.y1, this.x2, this.y2);
		stroke(0, 100, 100, 10);
		line(this.x1 - rand, this.y1 - rand, this.x2 - rand, this.y2 - rand);
		stroke(200, 100, 100, 10);
		line(this.x1 + rand, this.y1 + rand, this.x2 + rand, this.y2 + rand);
		*/
	}
}
