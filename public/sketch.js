let sky;
let sun;
let ground;
let mountains = [];
let clouds;
let sea;
let night = false;

function setup() {
	pixelDensity(1.0);
	createCanvas(1920, 1080);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	noLoop();

	pallette = window.$fxhashFeatures.palette;
	skyColor = color(pallette.sky[0], pallette.sky[1], pallette.sky[2]);
	sunColor = color(pallette.sun[0], pallette.sun[1], pallette.sun[2]);
	groundColor = color(pallette.ground[0], pallette.ground[1], pallette.ground[2]);
	mountainsColor = color(pallette.mountain[0], pallette.mountain[1], pallette.mountain[2]);
	seaColor = color(pallette.sea[0], pallette.sea[1], pallette.sea[2]);

	// draw the sky
	sky = new Sky(skyColor);
	sky.draw();

	// draw the sun
	sun = new Sun(sunColor);
	sun.draw();

	// draw the mountains
	let mtnPos = height * random(0.6, 0.9);
	let mtnHeight = random(height / 3, height / 1.5);
	let mtnNum = window.$fxhashFeatures.mountain_num;
	let xoff = 0.001;
	let satOffset = (-mtnNum * mtnNum) / 2;
	let brightOffset = (mtnNum * mtnNum) / 2;
	let offsetIterator = map(mtnNum, 1, 5, 10, 2);
	for (let i = 0; i < mtnNum; i++) {
		mountains[i] = new Mountains(mountainsColor, mtnPos, mtnHeight, xoff, i, mtnNum, satOffset, brightOffset);
		mountains[i].draw();
		satOffset += offsetIterator * mtnNum;
		brightOffset -= offsetIterator * mtnNum;
	}

	// draw the ground
	ground = new Ground(mtnPos, groundColor);
	ground.draw();
}

function draw() {}

class Sky {
	constructor(color) {
		this.hue = hue(color);
		this.saturation = saturation(color);
		this.brightness = brightness(color);
		this.alpha = alpha(color);
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
	constructor(mtnPos, color) {
		this.hue = hue(color);
		this.saturation = saturation(color);
		this.brightness = brightness(color);
		this.widthOffset = width / 10;
		this.x = -this.widthOffset;
		this.y = mtnPos;
		this.width = width + this.widthOffset * 2;
		this.height = height;
	}

	draw() {
		strokeWeight(5);
		stroke(this.hue, this.saturation, this.brightness - 20);
		//noStroke();
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		rect(this.x, this.y, this.width, this.height);
	}
}

class Mountains {
	constructor(color, position, mountainHeight, offset, index, indexMax, satOffset, brightOffset) {
		this.satOffset = satOffset;
		this.brightOffset = brightOffset;
		this.div = indexMax - index;
		this.hue = hue(color);
		this.saturation = saturation(color) + this.satOffset;
		this.brightness = brightness(color) + this.brightOffset;
		this.xoff = 0.01;
		this.yoff = random(10000000);
		this.x = random(-width / 4, width / 1.3);
		this.y = position;
		this.width = this.x + random(width / 7, width / 4);
		this.height = (mountainHeight * this.div) / indexMax;
	}

	draw() {
		// make a custom shape using beginShape() and endShape() and noise();
		beginShape();
		strokeWeight(5);
		stroke(this.hue, this.saturation + 30, this.brightness - 10);
		//noStroke();
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		beginShape();
		curveVertex(-width * 2, this.y);
		// use noise to create the mountain shape
		for (let x = -width * 2; x < width * 2; x += 10) {
			let y = map(noise(this.xoff, this.yoff), 0, 1, this.y, this.y - this.height);
			curveVertex(x, y);
			this.xoff += $fxhashFeatures.mountain_softness;
		}
		curveVertex(width * 2, this.y);
		endShape(CLOSE);
	}
}

class Sun {
	constructor(color) {
		this.hue = hue(color);
		this.saturation = saturation(color);
		this.brightness = brightness(color);
		this.radius = random(width / 10, width / 3);
		this.x = random(this.radius, width - this.radius);
		this.y = random(this.radius, height / 3 - this.radius);
		this.alpha = 100;
	}

	draw() {
		strokeWeight(5);
		stroke(this.hue, this.saturation / 2, 100, this.alpha);
		noStroke();
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		ellipse(this.x, this.y, this.radius, this.radius);
	}
}
