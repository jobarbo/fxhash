function setup() {
	pixelDensity(2.0);
	createCanvas(900, 3500);
	colorMode(HSB, 360, 100, 100, 100);
	background(26, 21, 91);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let margin = 100;

	let suns = [];
	let numSuns = 1;

	for (let i = 0; i < numSuns; i++) {
		let r = random(width / 5, width / 3);
		let x = random(margin + r, width - margin - r);
		let y = random(margin + r, height / 1.1 - margin - r);
		suns[i] = new Sun(x, y, r);
		suns[i].display();
	}

	let mountains = [];
	let mountainsColorArr = [color(180, 10, 55), color(196, 62, 16)];
	let numMountains = 2;

	for (let i = 0; i < numMountains; i++) {
		let mtnBaseY = height;
		let mtnTopY = mtnBaseY - height / (2 + i);
		let mtnY = random(mtnTopY - 100 * (i + 1), mtnTopY + 100 * (i + 1));
		mountains[i] = new Mountain(mtnY, mtnTopY, mtnBaseY, mountainsColorArr[i]);
		mountains[i].display();
	}

	let seaBaseY = height;
	let seaTopY = seaBaseY - height / 8;
	let seaY = random(seaTopY - 100, seaTopY + 100);
	let ocean = new Ocean(seaY, seaTopY, seaBaseY);
	//ocean.display();

	createTexture(0);
}

function createTexture(hue) {
	let texture = [];

	for (let index = 0; index < 2000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(width / 8, width / 2);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1, hue);
	}
	let sketch_texture = drawTexture(texture);
	let interval = setInterval(() => {
		let result = sketch_texture.next();
		if (result.done) {
			clearInterval(interval);
		}
	}, 0);
}

function* drawTexture(texture) {
	let count = 0;
	let draw_every = 500;
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 10500; j++) {
			texture[index].display();
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
}

class Sun {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.pxArr = [];
		this.pyArr = [];
		this.r = r;
		this.randomArr = [];
		this.numPoints = 15;
		this.maxRan = 50 / this.numPoints;
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
		fill(7, 72, 51, 100);
		beginShape();
		for (let i = 0; i < this.numPoints + 3; i++) {
			let x = this.pxArr[i % this.numPoints];
			let y = this.pyArr[i % this.numPoints];
			curveVertex(x, y);
		}
		endShape();
	}
}

class Mountain {
	constructor(mtnY, topY, baseY, color) {
		this.y = mtnY;
		this.baseY = baseY;
		this.topY = topY;
		this.yoff = random(1000000);
		this.xoff = random(1000000);
		this.iteration = n3(this.xoff, this.yoff, 0.01, 1);
		this.multiplier = random(-23, 23);
		this.color = color;
	}

	display() {
		// draw a ocean using multiple vertices
		strokeWeight(15);
		stroke(0, 0, 10, 0);
		fill(this.color);
		beginShape();

		vertex(-100, this.baseY);
		vertex(-100, this.y);
		for (let i = 0; i < width; i += 10) {
			this.iteration = n3(this.xoff, this.yoff, 1.1, 1) * this.multiplier;
			this.x = i;
			this.y += this.iteration;
			this.yoff += 0.021;
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

class Ocean {
	constructor(mtnY, topY, baseY) {
		this.y = mtnY;
		this.baseY = baseY;
		this.topY = topY;
		this.yoff = random(1000000);
		this.xoff = random(1000000);
		this.iteration = n3(this.xoff, this.yoff, 0.01, 1);
		this.multiplier = random(-1, 1);
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
			this.iteration = n3(this.xoff, this.yoff, 0.001, 1) * this.multiplier;
			this.x = i;
			this.y += this.iteration;
			this.yoff += 0.0001;
			this.xoff += 0.0001;
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
