let gui = '';

let balles = [];
let rectangles = [];
let ballesNum = 2000;
let rectNum = 500;

function setup() {
	createCanvas(1280, 1920);
	pixelDensity(3);
	colorMode(HSB, 360, 100, 100, 100);

	gui = new dat.GUI();
	console.log(gui);

	let bgHue = random(360);
	background(bgHue, 10, 10);
	let ballHue = (bgHue + 180) % 360;
	for (i = 0; i < ballesNum; i++) {
		balles[i] = new Balle_mc(ballHue, i);
	}

	// add Balle_mc to gui
	let ballFolder = gui.addFolder('Balle_mc');

	ballFolder.add(balles[0], 'size', 0, 100);
	ballFolder.add(balles[0], 'hue', 0, 360);
	ballFolder.add(balles[0], 'speed', 0, 10);

	let rectHue = random(360);
	for (i = 0; i < rectNum; i++) {
		rectangles[i] = new Rect_mc(rectHue);
	}
}

function draw() {
	for (i = 0; i < balles.length; i++) {
		balles[i].display();
		balles[i].move();
	}
	for (i = 0; i < rectangles.length; i++) {
		rectangles[i].display();
		rectangles[i].move();
	}
}

class Balle_mc {
	constructor(hue, id) {
		this.yoff = random(0.001);
		this.xoff = random(0.001);

		this.x = random(width);
		this.y = random(height);

		this.speed = 1;
		this.size = 1;
		this.hue = hue;
	}

	display() {
		fill(this.hue, 10, 80, 10);
		noStroke();
		ellipse(this.x, this.y, this.size);
	}

	move() {
		this.x += map(noise(this.xoff, this.y), 0, 1, -this.speed, this.speed);
		this.y += map(noise(this.yoff, this.x), 0, 1, -this.speed, this.speed);

		//this.xoff += 0.01
		//this.yoff += 0.002

		if (this.hue <= 0) {
			this.hue = 359;
		} else if (this.hue >= 360) {
			this.hue = 1;
		}

		if (this.x <= 0) {
			this.x = width;
		} else if (this.x >= width) {
			this.x = 0;
		}
		if (this.y <= 0) {
			this.y = height;
		} else if (this.y >= height) {
			this.y = 0;
		}
	}
}

class Rect_mc {
	constructor(hue) {
		this.yoff = random(0.00001);
		this.xoff = random(0.00001);
		this.x = random(width);
		this.y = random(height);
		this.size = random(1, 2);
		this.hue = hue;
	}

	display() {
		fill(this.hue, 70, 70, 50);
		stroke(255);
		noStroke();
		rect(this.x, this.y, this.size);
	}

	move() {
		this.hue += map(noise(this.xoff, this.yoff), 0, 1, -0.1, 0.1);
		this.x += map(noise(this.xoff, this.y), 0, 1, -0.5, 0.5);
		this.y += map(noise(this.yoff, this.x), 0, 1, -0.5, 0.5);

		//this.xoff += 0.01;
		//this.yoff += 0.002;

		if (this.hue <= 0) {
			this.hue = 359;
		} else if (this.hue >= 360) {
			this.hue = 1;
		}

		if (this.x <= 0) {
			this.x = width;
		} else if (this.x >= width) {
			this.x = 0;
		}
		if (this.y <= 0) {
			this.y = height;
		} else if (this.y >= height) {
			this.y = 0;
		}
	}
}
