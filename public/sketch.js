let gui = '';

let balls = [];
let rectangles = [];
let ballsNum = 2000;
let rectNum = 500;

function setup() {
	createCanvas(1280, 1920);
	pixelDensity(3);
	colorMode(HSB, 360, 100, 100, 100);
	rectMode(CENTER);
	gui = new dat.GUI();
	console.log(gui);

	let bgHue = random(360);
	background(bgHue, 10, 10);
	let ballHue = (bgHue + 180) % 360;
	for (i = 0; i < ballsNum; i++) {
		balls[i] = new Ball_mc(ballHue, i);
	}

	let rectHue = random(360);
	for (i = 0; i < rectNum; i++) {
		rectangles[i] = new Rect_mc(rectHue, i);
	}

	addRectFolder(rectHue);
	addBallFolder(ballHue);
}

function draw() {
	for (i = 0; i < balls.length; i++) {
		balls[i].display();
		balls[i].move();
	}
	for (i = 0; i < rectangles.length; i++) {
		rectangles[i].display();
		rectangles[i].move();
	}
}

function addRectFolder(rectHue) {
	// add Rect_mc to gui
	let rectFolder = gui.addFolder('1D noise');
	let rectDynamicVar = {
		size: 1,
		speedX: 0,
		speedY: 0,
		hue: rectHue,
		saturation: 0,
		brightness: 100,
		alpha: 0,
		xoffIteration: 0,
		yoffIteration: 0,
	};
	rectFolder.add(rectDynamicVar, 'size', 0, 10).onFinishChange(function (value) {
		for (i = 0; i < rectangles.length; i++) {
			rectangles[i].size = value;
			if (rectangles[i].size < 0) {
				rectangles[i].size = 0;
			}
		}
	});

	rectFolder
		.add(rectDynamicVar, 'hue', 0, 360)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < rectangles.length; i++) {
				rectangles[i].hue = value;
			}
		});
	rectFolder
		.add(rectDynamicVar, 'saturation', 0, 100)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < rectangles.length; i++) {
				rectangles[i].saturation = value;
			}
		});
	rectFolder.add(rectDynamicVar, 'brightness', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < rectangles.length; i++) {
			rectangles[i].brightness = value;
		}
	});
	rectFolder.add(rectDynamicVar, 'alpha', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < rectangles.length; i++) {
			rectangles[i].alpha = value;
		}
	});
	rectFolder
		.add(rectDynamicVar, 'speedX', 0, 10)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < rectangles.length; i++) {
				rectangles[i].speedX = value;
			}
		});
	rectFolder
		.add(rectDynamicVar, 'speedY', 0, 10)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < rectangles.length; i++) {
				rectangles[i].speedY = value;
			}
		});
	rectFolder
		.add(rectDynamicVar, 'xoffIteration', -0.1, 0.1)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < rectangles.length; i++) {
				rectangles[i].xoffIteration = value;
			}
		});
	rectFolder
		.add(rectDynamicVar, 'yoffIteration', -0.1, 0.1)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < rectangles.length; i++) {
				rectangles[i].yoffIteration = value;
			}
		});
}

function addBallFolder(ballHue) {
	// add Ball_mc to gui
	let ballFolder = gui.addFolder('Flawed 2D noise');
	let ballDynamicVar = {
		size: 1,
		speedX: 0,
		speedY: 0,
		hue: ballHue,
		saturation: 10,
		brightness: 80,
		alpha: 0,
		xoffIteration: 0,
		yoffIteration: 0,
		range: balls.length,
	};
	let ballRange = ballDynamicVar.range;
	ballFolder.add(ballDynamicVar, 'range', 0, balls.length).onChange(function (value) {
		ballRange = value;
	});
	ballFolder.add(ballDynamicVar, 'size', -10, 10).onFinishChange(function (value) {
		for (i = 0; i < ballRange; i++) {
			balls[i].size = value;
			if (balls[i].size < 0) {
				balls[i].size = 0;
			}
		}
	});
	ballFolder
		.add(ballDynamicVar, 'speedX', 0, 50)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].speedX = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'speedY', 0, 50)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].speedY = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'hue', 0, 360)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].hue = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'saturation', 0, 100)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].saturation = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'brightness', 0, 100)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].brightness = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'alpha', 0, 100)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].alpha = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'xoffIteration', -0.1, 0.1)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].xoffIteration = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'yoffIteration', -0.1, 0.1)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].yoffIteration = value;
			}
		});
}

class Ball_mc {
	constructor(hue, id) {
		this.xoffIteration = 0;
		this.yoffIteration = 0;
		this.x = random(width);
		this.y = random(height);
		this.yoff = random(100000);
		this.xoff = id;

		this.speedX = 0;
		this.speedY = 0;
		this.size = 1;
		this.hue = hue;
		this.saturation = 10;
		this.brightness = 80;
		this.alpha = 0;
	}

	display() {
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		noStroke();
		ellipse(this.x, this.y, this.size);
	}

	move() {
		let xIteration = map(noise(this.xoff, this.y), 0, 1, -this.speedX, this.speedX, true);
		let yIteration = map(noise(this.yoff, this.x), 0, 1, -this.speedY, this.speedY, true);

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
}

class Rect_mc {
	constructor(hue, id) {
		this.xoffIteration = 0;
		this.yoffIteration = 0;
		this.yoff = random(100000);
		this.yoff2 = id;
		this.xoff = id;
		this.xoff2 = random(100000);
		this.x = random(width);
		this.y = random(height);
		this.size = 1;
		this.hue = hue;
		this.saturation = 0;
		this.brightness = 100;
		this.alpha = 0;
		this.speedX = 0;
		this.speedY = 0;
	}

	display() {
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		stroke(255);
		noStroke();
		rect(this.x, this.y, this.size);
	}

	move() {
		this.x += map(noise(this.xoff), 0, 1, -this.speedX, this.speedX);
		this.y += map(noise(this.yoff), 0, 1, -this.speedY, this.speedY);

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
}
