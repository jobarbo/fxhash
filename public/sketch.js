function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(30, 10, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let suns = [];
	let numSuns = 1;

	let margin = 100;

	for (let i = 0; i < numSuns; i++) {
		let r = 200;
		let x = random(margin + r, width - margin - r);
		let y = random(margin + r, height / 1.1 - margin - r);
		suns[i] = new Sun(x, y, r);
		suns[i].display();
	}

	let seaBaseY = height;
	let seaTopY = seaBaseY - height / 3;
	let seaY = random(seaTopY - 100, seaTopY + 100);
	let ocean = new Ocean(seaY, seaTopY, seaBaseY);
	ocean.display();

	createTextures();
}

function createTextures() {}

class Sun {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.pxArr = [];
		this.pyArr = [];
		this.r = r;
		this.randomArr = [];
		this.numPoints = 10;
		this.maxRan = 200 / this.numPoints;
		this.angleInc = TWO_PI / this.numPoints;
	}

	display() {
		// put points on the canvas around this.x and this.y
		// the points should make a circle
		// the points should be evenly spaced

		for (let i = 0; i < this.numPoints; i++) {
			let angle = this.angleInc * i;
			let x = this.x + cos(angle) * this.r + random(-this.maxRan, this.maxRan);
			let y = this.y + sin(angle) * this.r + random(-this.maxRan, this.maxRan);
			this.pxArr.push(x);
			this.pyArr.push(y);
		}
		noStroke();
		fill(30, 50, 100, 100);
		beginShape();
		for (let i = 0; i < this.numPoints + 3; i++) {
			let x = this.pxArr[i % this.numPoints];
			let y = this.pyArr[i % this.numPoints];
			curveVertex(x, y);
		}
		endShape();
	}
}

class Ocean {
	constructor(mtnY, topY, baseY) {
		this.y = mtnY;
		this.baseY = baseY;
		this.topY = topY;
		this.yoff = random(1000000);
		this.xoff = random(1000000);
		this.iteration = n3(this.xoff, this.yoff, 0.01, 1);
		this.multiplier = random(-13, 13);
	}

	display() {
		// draw a ocean using multiple vertices
		strokeWeight(15);
		stroke(0, 0, 10, 0);
		fill(200, 70, 80, 100);
		beginShape();

		vertex(-100, this.baseY);
		vertex(-100, this.y);
		for (let i = 0; i < width; i += 30) {
			this.iteration = n3(this.xoff, this.yoff, 11.1, 1) * this.multiplier;
			this.x = i;
			this.y += this.iteration;
			this.yoff += 0.01;
			this.xoff += 0.01;
			if (this.y >= this.baseY) {
				// leave the loop if the ocean reaches the base

				this.y = this.baseY;
				vertex(i, this.y);
			} else {
				vertex(i, this.y);
			}
		}

		vertex(width + 100, this.y);
		vertex(width + 100, this.baseY);

		endShape(CLOSE);

		// display
	}
}
