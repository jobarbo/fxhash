let gui = '';

let balls = [];
let rectangles = [];
let ballsNum = 1000;
let rectNum = 1000;

function setup() {
	createCanvas(1080, 1080);
	pixelDensity(3);
	colorMode(HSB, 360, 100, 100, 100);
	rectMode(CENTER);
	gui = new dat.GUI();
	console.log(gui);

	let bgHue = random(360);
	background(bgHue, 0, 10);
	let ballHue = (bgHue + 180) % 360;
	for (i = 0; i < ballsNum; i++) {
		balls[i] = new Noise_2d(ballHue, i);
	}

	let rectHue = random(360);
	for (i = 0; i < rectNum; i++) {
		rectangles[i] = new Noise_1d(rectHue, i);
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
		range: balls.length,
		xWidthMax: width,
		xWidthMin: 0,
		yHeightMax: height,
		yHeightMin: 0,
	};
	let rectRange = rectDynamicVar.range;
	rectFolder.add(rectDynamicVar, 'range', 0, rectangles.length).onChange(function (value) {
		rectRange = value;
	});

	let rectMaxWidth = rectDynamicVar.xWidthMax;
	rectFolder.add(rectDynamicVar, 'xWidthMax', 0, width).onFinishChange(function (value) {
		for (i = 0; i < rectRange; i++) {
			rectangles[i].xWidthMax = value;
		}
	});

	let rectMinWidth = rectDynamicVar.xWidthMin;
	rectFolder.add(rectDynamicVar, 'xWidthMin', 0, width).onFinishChange(function (value) {
		for (i = 0; i < rectRange; i++) {
			rectangles[i].xWidthMin = value;
		}
	});

	let rectMaxHeight = rectDynamicVar.yHeightMax;
	rectFolder.add(rectDynamicVar, 'yHeightMax', 0, height).onFinishChange(function (value) {
		for (i = 0; i < rectRange; i++) {
			rectangles[i].yHeightMax = value;
		}
	});

	let rectMinHeight = rectDynamicVar.yHeightMin;
	rectFolder.add(rectDynamicVar, 'yHeightMin', 0, height).onFinishChange(function (value) {
		for (i = 0; i < rectRange; i++) {
			rectangles[i].yHeightMin = value;
		}
	});
	rectFolder
		.add(rectDynamicVar, 'size', 0, 10)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < rectRange; i++) {
				rectangles[i].size = value;
				if (rectangles[i].size < 0) {
					rectangles[i].size = 0;
				}
			}
		});
	rectFolder
		.add(rectDynamicVar, 'speedX', -30, 30)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < rectRange; i++) {
				rectangles[i].speedX = value;
			}
		});
	rectFolder
		.add(rectDynamicVar, 'speedY', -30, 30)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < rectRange; i++) {
				rectangles[i].speedY = value;
			}
		});
	rectFolder
		.add(rectDynamicVar, 'hue', 0, 360)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < rectRange; i++) {
				rectangles[i].hue = value;
			}
		});
	rectFolder
		.add(rectDynamicVar, 'saturation', 0, 100)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < rectRange; i++) {
				rectangles[i].saturation = value;
			}
		});
	rectFolder.add(rectDynamicVar, 'brightness', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < rectRange; i++) {
			rectangles[i].brightness = value;
		}
	});
	rectFolder.add(rectDynamicVar, 'alpha', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < rectRange; i++) {
			rectangles[i].alpha = value;
		}
	});

	rectFolder
		.add(rectDynamicVar, 'xoffIteration', -0.3, 0.3)
		.step(0.001)
		.onFinishChange(function (value) {
			for (i = 0; i < rectRange; i++) {
				rectangles[i].xoffIteration = value;
			}
		});
	rectFolder
		.add(rectDynamicVar, 'yoffIteration', -0.3, 0.3)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < rectRange; i++) {
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
		saturation: 0,
		brightness: 100,
		alpha: 0,
		xoffIteration: 0,
		yoffIteration: 0,
		range: balls.length,
		xWidthMax: width,
		xWidthMin: 0,
		yHeightMax: height,
		yHeightMin: 0,
	};
	let ballRange = ballDynamicVar.range;
	ballFolder.add(ballDynamicVar, 'range', 0, balls.length).onChange(function (value) {
		ballRange = value;
	});

	let ballMaxWidth = ballDynamicVar.xWidthMax;
	ballFolder.add(ballDynamicVar, 'xWidthMax', 0, width).onFinishChange(function (value) {
		for (i = 0; i < ballRange; i++) {
			balls[i].xWidthMax = value;
		}
	});

	let ballMinWidth = ballDynamicVar.xWidthMin;
	ballFolder.add(ballDynamicVar, 'xWidthMin', 0, width).onFinishChange(function (value) {
		for (i = 0; i < ballRange; i++) {
			balls[i].xWidthMin = value;
		}
	});

	let ballMaxHeight = ballDynamicVar.yHeightMax;
	ballFolder.add(ballDynamicVar, 'yHeightMax', 0, height).onFinishChange(function (value) {
		for (i = 0; i < ballRange; i++) {
			balls[i].yHeightMax = value;
		}
	});

	let ballMinHeight = ballDynamicVar.yHeightMin;
	ballFolder.add(ballDynamicVar, 'yHeightMin', 0, height).onFinishChange(function (value) {
		for (i = 0; i < ballRange; i++) {
			balls[i].yHeightMin = value;
		}
	});

	ballFolder.add(ballDynamicVar, 'size', 0, 10).onFinishChange(function (value) {
		for (i = 0; i < ballRange; i++) {
			balls[i].size = value;
			if (balls[i].size < 0) {
				balls[i].size = 0;
			}
		}
	});
	ballFolder
		.add(ballDynamicVar, 'speedX', -50, 50)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].speedX = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'speedY', -50, 50)
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
		.add(ballDynamicVar, 'xoffIteration', -0.3, 0.3)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].xoffIteration = value;
			}
		});
	ballFolder
		.add(ballDynamicVar, 'yoffIteration', -0.3, 0.3)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < ballRange; i++) {
				balls[i].yoffIteration = value;
			}
		});
}

class Noise_2d {
	constructor(hue, id) {
		this.xoffIteration = 0;
		this.yoffIteration = 0;
		this.x = random(width);
		this.y = random(height);
		this.yoff = random(100000);
		this.xoff = random(100000);
		this.xWidthMax = width;
		this.xWidthMin = 0;
		this.yHeightMax = height;
		this.yHeightMin = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.size = 1;
		this.hue = hue;
		this.saturation = 0;
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

		if (this.x <= this.xWidthMin) {
			this.x = this.xWidthMax;
		} else if (this.x >= this.xWidthMax) {
			this.x = this.xWidthMin;
		}
		if (this.y <= this.yHeightMin) {
			this.y = this.yHeightMax;
		} else if (this.y >= this.yHeightMax) {
			this.y = this.yHeightMin;
		}
	}
}

class Noise_1d {
	constructor(hue, id) {
		this.xoffIteration = 0;
		this.yoffIteration = 0;
		this.yoff = random(100000);
		this.yoff2 = id;
		this.xoff = id;
		this.xoff2 = random(100000);
		this.x = random(width);
		this.y = random(height);
		this.xWidthMax = width;
		this.xWidthMin = 0;
		this.yHeightMax = height;
		this.yHeightMin = 0;
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
		noStroke();
		ellipse(this.x, this.y, this.size);
	}

	move() {
		this.x += map(noise(this.xoff), 0, 1, -this.speedX, this.speedX);
		this.y += map(noise(this.yoff), 0, 1, -this.speedY, this.speedY);

		this.xoff += this.xoffIteration;
		this.yoff += this.yoffIteration;
		this.xoff2 += this.xoffIteration;
		this.yoff2 += this.yoffIteration;

		if (this.hue <= 0) {
			this.hue = 359;
		} else if (this.hue >= 360) {
			this.hue = 1;
		}

		if (this.x <= this.xWidthMin) {
			this.x = this.xWidthMax;
		} else if (this.x >= this.xWidthMax) {
			this.x = this.xWidthMin;
		}
		if (this.y <= this.yHeightMin) {
			this.y = this.yHeightMax;
		} else if (this.y >= this.yHeightMax) {
			this.y = this.yHeightMin;
		}
	}
}
