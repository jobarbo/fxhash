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
		let x = random(margin + r, width - margin + r);
		let y = random(margin + r, height / 2 - margin + r);
		suns[i] = new Sun(x, y, r);
		suns[i].display();
	}

	let ocean = new Ocean();
	ocean.display();
}

class Sun {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.pxArr = [];
		this.pyArr = [];
		this.r = r;
		this.randomArr = [];
		this.numPoints = 6;
		this.maxRan = 2;
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
	constructor() {
		this.xoff = 0;
		this.yoff = 1;
		this.offX = 200;
		this.offY = 200;
		this.x = -this.offX;
		this.y = height / 2;
		this.pointNum = 100;
		this.spacing = width / this.pointNum;
	}

	display() {
		fill(200, 50, 100, 100);
		beginShape();
		curveVertex(-this.offX, height + this.offY);
		curveVertex(-this.offX, height / 2);
		for (let i = 0; i < this.pointNum; i++) {
			this.xoff += 0.001;
			let x = this.x + this.spacing * i;
			let y = map(noise(this.xoff), 0, 1, height / 2, height / 2 + 100);
			curveVertex(x, y);
		}
		curveVertex(width + this.offX, height / 2);
		curveVertex(width + this.offX, height + this.offY);
		endShape(CLOSE);
	}
}
