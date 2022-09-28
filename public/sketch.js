let sky;
let sun;
let ground;
let mountains;
let clouds;
let sea;
let night = false;

function setup() {
	pixelDensity(3.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	// draw the sky
	sky = new Sky();
	sky.draw();

	// draw the sun
	sun = new Sun();
	sun.draw();

	// draw the mountains
	mountains = new Mountains();
	mountains.draw();
	let mtnPos = mountains.getBasePosition();

	// draw the ground
	ground = new Ground(mtnPos);
	ground.draw();
}

function draw() {}

class Sky {
	constructor() {
		this.hueArr = [180, 190, 200, 210, 220];
		this.satArr = [30, 40, 50, 60];
		this.briArr = [60, 70, 80, 90, 100];
		this.hue = this.hueArr[int(random(this.hueArr.length))];
		this.saturation = this.satArr[int(random(this.satArr.length))];
		this.brightness = this.briArr[int(random(this.briArr.length))];
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
	}

	draw() {
		noStroke();
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		rect(this.x, this.y, this.width, this.height);
	}
}

class Ground {
	constructor(mtnPos) {
		this.hueArr = [0, 10, 20, 30, 40, 50];
		this.satArr = [30, 40, 50, 60, 70, 80];
		this.briArr = [20, 30, 40, 50, 60];
		this.hue = this.hueArr[int(random(this.hueArr.length))];
		this.saturation = this.satArr[int(random(this.satArr.length))];
		this.brightness = this.briArr[int(random(this.briArr.length))];
		this.widthOffset = width / 10;
		this.x = -this.widthOffset;
		this.y = mtnPos;
		this.width = width + this.widthOffset * 2;
		this.height = height;
	}

	draw() {
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		rect(this.x, this.y, this.width, this.height);
	}
}

class Mountains {
	constructor() {
		this.hueArr = [0, 10, 20, 30, 40, 50];
		this.satArr = [30, 40, 50, 60, 70, 80];
		this.briArr = [20, 30, 40, 50, 60];
		this.hue = this.hueArr[int(random(this.hueArr.length))];
		this.saturation = this.satArr[int(random(this.satArr.length))];
		this.brightness = this.briArr[int(random(this.briArr.length))];
		this.x = random(-width / 4, width / 1.3);
		this.y = height * random(0.6, 0.9);
		this.width = this.x + random(width / 7, width / 4);
		this.height = random(height / 4, height / 2);
	}

	draw() {
		// make a custom shape using beginShape() and endShape() and noise();
		beginShape();
		strokeWeight(5);
		stroke(this.hue, this.saturation, this.brightness - 10);
		fill(this.hue, this.saturation, this.brightness, this.alpha);

		beginShape();
		curveVertex(-width / 1.5, this.y);
		// use noise to create the mountain shape
		for (let x = -width / 1.5; x < width * 1.5; x += width / 20) {
			let y = map(noise(x * 0.001), 0, 1, this.y, this.y - this.height);
			curveVertex(x, y);
		}
		curveVertex(width * 1.5, this.y);
		endShape(CLOSE);
	}

	getBasePosition() {
		return this.y;
	}
}

class Sun {
	constructor() {
		this.hueArr = [330, 340, 350, 360, 0, 10, 20, 30, 40, 50];
		this.satArr = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
		this.briArr = [80, 90, 100];
		this.hue = this.hueArr[int(random(this.hueArr.length))];
		this.saturation = this.satArr[int(random(this.satArr.length))];
		this.brightness = this.briArr[int(random(this.briArr.length))];
		this.radius = random(width / 10, width / 5);
		this.x = random(this.radius, width - this.radius);
		this.y = random(this.radius, height / 3 - this.radius);

		this.alpha = 100;
	}

	draw() {
		strokeWeight(5);

		stroke(this.hue, this.saturation, this.brightness - 10, this.alpha);
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		ellipse(this.x, this.y, this.radius, this.radius);
	}
}
