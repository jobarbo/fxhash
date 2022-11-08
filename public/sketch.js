let balle_mc = [];
let balleNum = 5;
function setup() {
	pixelDensity(3.0);
	createCanvas(1920, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	// create 1000 balle_mc objects

	for (var i = 0; i < balleNum; i++) {
		balle_mc[i] = new Balle_mc();
	}
}

function draw() {
	// draw 1000 balle_mc objects
	for (var i = 0; i < balleNum; i++) {
		balle_mc[i].draw();
	}
}

// make the balle_mc Class
class Balle_mc {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.vx = 0;
		this.vy = 0;
		this.xoff = random(1000);
		this.yoff = random(1000);
		this.r = 10;
		this.h = random(0, 360);
		this.s = random(0, 100);
		this.b = random(0, 100);
		this.a = random(30, 100);
	}

	draw() {
		this.update();
		this.render();
	}
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.h += 1;

		// make the ball move around according to perlin noise
		this.vx = map(noise(this.xoff), 0, 1, -10, 10);
		this.vy = map(noise(this.yoff), 0, 1, -10, 10);

		// change the xoff and yoff values
		this.xoff += 0.1;
		this.yoff += 0.000001;

		// make the ball reset the hue when it reaches 360
		if (this.h > 360) {
			this.h = 0;
		}
		if (this.h < 0) {
			this.h = 360;
		}

		// make the ball reset once it reaches the edge of the canvas
		if (this.x > width + this.r) {
			this.x = -this.r;
		}
		if (this.x < -this.r) {
			this.x = width + this.r;
		}
		if (this.y > height + this.r) {
			this.y = -this.r;
		}
		if (this.y < -this.r) {
			this.y = height + this.r;
		}
	}
	render() {
		stroke(this.h, 20, 100, this.a);
		fill(this.h, this.s, this.b, this.a);
		ellipse(this.x, this.y, this.r, this.r);
	}
}
