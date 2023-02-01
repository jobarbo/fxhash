let gui = '';

let n2d = [];
let n1d = [];
let n2dNum = 2000;
let n1dNum = 2000;

function setup() {
	createCanvas(1080, 1080);
	pixelDensity(3);
	colorMode(HSB, 360, 100, 100, 100);
	rectMode(CENTER);
	angleMode(DEGREES);
	gui = new dat.GUI();
	console.log(gui);

	let bgHue = random(360);
	background(bgHue, 0, 10);
	let n2dHue = (bgHue + 180) % 360;
	for (i = 0; i < n2dNum; i++) {
		n2d[i] = new Noise_2d(n2dHue, i);
	}

	let n1dHue = random(360);
	for (i = 0; i < n1dNum; i++) {
		n1d[i] = new Noise_1d(n1dHue, i);
	}

	addN1dFolder(n1dHue);
	addN2dFolder(n2dHue);
}

function draw() {
	for (i = 0; i < n2d.length; i++) {
		n2d[i].display();
		n2d[i].move();
	}
	for (i = 0; i < n1d.length; i++) {
		n1d[i].display();
		n1d[i].move();
	}
}

function addN1dFolder(n1dHue) {
	// add N1d_mc to gui
	let n1dFolder = gui.addFolder('1D noise');
	let n1dDynamicVar = {
		size: 1,
		speedX: 0,
		speedY: 0,
		angle: 0,
		rCenter: 0,
		hue: n1dHue,
		saturation: 0,
		brightness: 100,
		alpha: 0,
		xoffIteration: 0,
		yoffIteration: 0,
		roffIteration: 0,
		range: n1d.length,
		xWidthMax: width,
		xWidthMin: 0,
		yHeightMax: height,
		yHeightMin: 0,
	};
	let n1dRange = n1dDynamicVar.range;
	n1dFolder.add(n1dDynamicVar, 'range', 0, n1d.length).onChange(function (value) {
		n1dRange = value;
	});

	let n1dMaxWidth = n1dDynamicVar.xWidthMax;
	n1dFolder.add(n1dDynamicVar, 'xWidthMax', 0, width).onFinishChange(function (value) {
		for (i = 0; i < n1dRange; i++) {
			n1d[i].xWidthMax = value;
		}
	});

	let n1dMinWidth = n1dDynamicVar.xWidthMin;
	n1dFolder.add(n1dDynamicVar, 'xWidthMin', 0, width).onFinishChange(function (value) {
		for (i = 0; i < n1dRange; i++) {
			n1d[i].xWidthMin = value;
		}
	});

	let n1dMaxHeight = n1dDynamicVar.yHeightMax;
	n1dFolder.add(n1dDynamicVar, 'yHeightMax', 0, height).onFinishChange(function (value) {
		for (i = 0; i < n1dRange; i++) {
			n1d[i].yHeightMax = value;
		}
	});

	let n1dMinHeight = n1dDynamicVar.yHeightMin;
	n1dFolder.add(n1dDynamicVar, 'yHeightMin', 0, height).onFinishChange(function (value) {
		for (i = 0; i < n1dRange; i++) {
			n1d[i].yHeightMin = value;
		}
	});
	n1dFolder
		.add(n1dDynamicVar, 'size', 0, 10)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].size = value;
				if (n1d[i].size < 0) {
					n1d[i].size = 0;
				}
			}
		});
	n1dFolder
		.add(n1dDynamicVar, 'speedX', 0, 50)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].speedX = value;
			}
		});
	n1dFolder
		.add(n1dDynamicVar, 'speedY', 0, 50)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].speedY = value;
			}
		});
	n1dFolder
		.add(n1dDynamicVar, 'angle', 0, 360)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].angle = value;
			}
		});

	n1dFolder
		.add(n1dDynamicVar, 'rCenter', 0, 100)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].rCenter = value;
			}
		});

	n1dFolder
		.add(n1dDynamicVar, 'hue', 0, 360)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].hue = value;
			}
		});
	n1dFolder
		.add(n1dDynamicVar, 'saturation', 0, 100)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].saturation = value;
			}
		});
	n1dFolder.add(n1dDynamicVar, 'brightness', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < n1dRange; i++) {
			n1d[i].brightness = value;
		}
	});
	n1dFolder.add(n1dDynamicVar, 'alpha', 0, 100).onFinishChange(function (value) {
		for (i = 0; i < n1dRange; i++) {
			n1d[i].alpha = value;
		}
	});

	n1dFolder
		.add(n1dDynamicVar, 'xoffIteration', 0, 0.3)
		.step(0.001)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].xoffIteration = value;
			}
		});
	n1dFolder
		.add(n1dDynamicVar, 'yoffIteration', 0, 0.3)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].yoffIteration = value;
			}
		});
	n1dFolder
		.add(n1dDynamicVar, 'roffIteration', 0, 0.3)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < n1dRange; i++) {
				n1d[i].roffIteration = value;
			}
		});
}

function addN2dFolder(n2dHue) {
	// add N2d_mc to gui
	let n2dFolder = gui.addFolder('Flawed 2D noise');
	let n2dDynamicVar = {
		size: 1,
		speedX: 0,
		speedY: 0,
		angle: 0,
		rCenter: 0,
		hue: n2dHue,
		saturation: 0,
		brightness: 100,
		alpha: 0,
		xoffIteration: 0,
		yoffIteration: 0,
		roffIteration: 0,
		range: n2d.length,
		xWidthMax: width,
		xWidthMin: 0,
		yHeightMax: height,
		yHeightMin: 0,
	};
	let n2dRange = n2dDynamicVar.range;
	n2dFolder.add(n2dDynamicVar, 'range', 0, n2d.length).onChange(function (value) {
		n2dRange = value;
	});

	let n2dMaxWidth = n2dDynamicVar.xWidthMax;
	n2dFolder.add(n2dDynamicVar, 'xWidthMax', 0, width).onFinishChange(function (value) {
		for (i = 0; i < n2dRange; i++) {
			n2d[i].xWidthMax = value;
		}
	});

	let n2dMinWidth = n2dDynamicVar.xWidthMin;
	n2dFolder.add(n2dDynamicVar, 'xWidthMin', 0, width).onFinishChange(function (value) {
		for (i = 0; i < n2dRange; i++) {
			n2d[i].xWidthMin = value;
		}
	});

	let n2dMaxHeight = n2dDynamicVar.yHeightMax;
	n2dFolder.add(n2dDynamicVar, 'yHeightMax', 0, height).onFinishChange(function (value) {
		for (i = 0; i < n2dRange; i++) {
			n2d[i].yHeightMax = value;
		}
	});

	let n2dMinHeight = n2dDynamicVar.yHeightMin;
	n2dFolder.add(n2dDynamicVar, 'yHeightMin', 0, height).onFinishChange(function (value) {
		for (i = 0; i < n2dRange; i++) {
			n2d[i].yHeightMin = value;
		}
	});

	n2dFolder.add(n2dDynamicVar, 'size', 0, 10).onFinishChange(function (value) {
		for (i = 0; i < n2dRange; i++) {
			n2d[i].size = value;
			if (n2d[i].size < 0) {
				n2d[i].size = 0;
			}
		}
	});
	n2dFolder
		.add(n2dDynamicVar, 'speedX', 0, 50)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].speedX = value;
			}
		});
	n2dFolder
		.add(n2dDynamicVar, 'speedY', 0, 50)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].speedY = value;
			}
		});

	n2dFolder
		.add(n2dDynamicVar, 'angle', 0, 360)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].angle = value;
			}
		});

	n2dFolder
		.add(n2dDynamicVar, 'rCenter', 0, 100)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].rCenter = value;
			}
		});

	n2dFolder
		.add(n2dDynamicVar, 'hue', 0, 360)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].hue = value;
			}
		});
	n2dFolder
		.add(n2dDynamicVar, 'saturation', 0, 100)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].saturation = value;
			}
		});
	n2dFolder
		.add(n2dDynamicVar, 'brightness', 0, 100)
		.step(1)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].brightness = value;
			}
		});
	n2dFolder
		.add(n2dDynamicVar, 'alpha', 0, 100)
		.step(0.1)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].alpha = value;
			}
		});
	n2dFolder
		.add(n2dDynamicVar, 'xoffIteration', 0, 0.3)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].xoffIteration = value;
			}
		});
	n2dFolder
		.add(n2dDynamicVar, 'yoffIteration', 0, 0.3)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].yoffIteration = value;
			}
		});
	n2dFolder
		.add(n2dDynamicVar, 'roffIteration', 0, 0.3)
		.step(0.0001)
		.onFinishChange(function (value) {
			for (i = 0; i < n2dRange; i++) {
				n2d[i].roffIteration = value;
			}
		});
}

class Noise_2d {
	constructor(hue, id) {
		this.xoffIteration = 0;
		this.yoffIteration = 0;
		this.roffIteration = 0;
		this.x = random(width);
		this.y = random(height);
		this.yoff = random(100000);
		this.xoff = random(100000);
		this.roff = random(100000);
		this.xWidthMax = width;
		this.xWidthMin = 0;
		this.yHeightMax = height;
		this.yHeightMin = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.size = 1;
		this.hue = hue;
		this.saturation = 0;
		this.brightness = 100;
		this.alpha = 0;
		this.rotation = 0;
		this.angle = 0;
		this.rCenter = 0;
	}

	display() {
		push();
		translate(this.x, this.y);
		rotate(this.rotation);
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		noStroke();
		ellipse(this.rCenter, this.rCenter, this.size);
		pop();
	}

	move() {
		//let xIteration = map(noise(this.xoff, this.x), 0, 1, -this.speedX, this.speedX, true);
		//let yIteration = map(noise(this.yoff, this.y), 0, 1, -this.speedY, this.speedY, true);
		let xIteration = map(noise(this.xoff, this.y), 0, 1, -this.speedX, this.speedX, true);
		let yIteration = map(noise(this.yoff, this.x), 0, 1, -this.speedY, this.speedY, true);
		let rIteration = map(noise(this.roff), 0, 1, -this.angle, this.angle, true);
		this.x += xIteration;
		this.y += yIteration;
		this.rotation += rIteration;
		this.xoff += this.xoffIteration;
		this.yoff += this.yoffIteration;
		this.roff += this.roffIteration;

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
		this.roffIteration = 0;
		this.yoff = random(100000);
		this.yoff2 = id;
		this.xoff = id;
		this.xoff2 = random(100000);
		this.roff = random(100000);
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
		this.rotation = 0;
		this.angle = 0;
		this.rCenter = 0;
	}

	display() {
		push();
		translate(this.x, this.y);
		rotate(this.rotation);
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		noStroke();
		ellipse(this.rCenter, this.rCenter, this.size);
		pop();
	}

	move() {
		this.x += map(noise(this.xoff), 0, 1, -this.speedX, this.speedX);
		this.y += map(noise(this.yoff), 0, 1, -this.speedY, this.speedY);
		this.rotation += map(noise(this.roff), 0, 1, -this.angle, this.angle);
		this.xoff += this.xoffIteration;
		this.yoff += this.yoffIteration;
		this.xoff2 += this.xoffIteration;
		this.yoff2 += this.yoffIteration;
		this.roff += this.roffIteration;

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
