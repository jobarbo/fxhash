let gui = '';

let balls = [];
let rectangles = [];
let ballsNum = 2000;
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
	for (i = 0; i < ballsNum; i++) {
		balls[i] = new Ball_mc(ballHue, i);
	}

	// add Ball_mc to gui
	let ballFolder = gui.addFolder('Ball_mc');
	let ballDynamicVar = {
		size: 1,
		speed: 1,
		hue: 1,
		saturation: 10,
		brightness: 80,
		alpha: 10,
		xoffIteration: 0,
		yoffIteration: 0,
	};
	ballFolder.add(ballDynamicVar, 'size', 0, 10).onFinishChange(function (value) {
		for (i = 0; i < balls.length; i++) {
			balls[i].size = value;
		}
	});
	ballFolder.add(ballDynamicVar, 'speed', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < balls.length; i++) {
			balls[i].speed = value;
		}
	});
	ballFolder.add(ballDynamicVar, 'hue', 0, 360).onFinishChange(function (value) {
		for (i = 0; i < balls.length; i++) {
			balls[i].hue = value;
		}
	});
	ballFolder.add(ballDynamicVar, 'saturation', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < balls.length; i++) {
			balls[i].saturation = value;
		}
	});
	ballFolder.add(ballDynamicVar, 'brightness', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < balls.length; i++) {
			balls[i].brightness = value;
		}
	});
	ballFolder.add(ballDynamicVar, 'alpha', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < balls.length; i++) {
			balls[i].alpha = value;
		}
	});
	ballFolder
		.add(ballDynamicVar, 'xoffIteration', -1, 1)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < balls.length; i++) {
				balls[i].xoffIteration = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'yoffIteration', -1, 1)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < balls.length; i++) {
				balls[i].yoffIteration = value;
			}
		});

	let rectHue = random(360);
	for (i = 0; i < rectNum; i++) {
		rectangles[i] = new Rect_mc(rectHue);
	}
}

function draw() {
	for (i = 0; i < balls.length; i++) {
		balls[i].display();
		balls[i].move();
	}
	for (i = 0; i < rectangles.length; i++) {
		//rectangles[i].display();
		//rectangles[i].move();
	}
}

class Ball_mc {
	constructor(hue, id) {
		this.yoff = random(1);
		this.xoff = random(1);
		this.xoffIteration = random(0.0001);
		this.yoffIteration = random(0.0001);
		this.x = random(width);
		this.y = random(height);

		this.speed = 0.1;
		this.size = 1;
		this.hue = hue;
		this.saturation = 10;
		this.brightness = 80;
		this.alpha = 10;
	}

	display() {
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		noStroke();
		ellipse(this.x, this.y, this.size);
	}

	move() {
		let xIteration = map(noise(this.xoff, this.yoff), 0, 1, -this.speed, this.speed, true);
		let yIteration = map(noise(this.yoff, this.xoff), 0, 1, -this.speed, this.speed, true);

		this.x += xIteration;
		this.y += yIteration;
		this.xoff += this.xoffIteration;
		this.yoff += this.yoffIteration;

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

	update() {}
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
