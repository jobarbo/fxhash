let swatches = [];
let swatchesLength = [];
let playHead = 0;
let posY = 0;
let posX = 0;
let ballW = 0;
let ballH = 0;
let ball = [];
function preload() {
	for (i = 0; i <= 12; i++) {
		swatches[i] = loadImage('./assets/grid_' + i + '.jpg');
	}
}

function setup() {
	pixelDensity(3);
	createCanvas(1000, 1000);
	rectMode(CENTER);
	background(245);
	for (i = 0; i <= 12; i++) {
		swatchesLength[i] = swatches[i].height;
	}
	for (i = 0; i <= height * 6; i++) {
		if (i % 5 == 0) {
			ballW = width / 300;
			ballH = width / 40;
			ball[i] = new Walker(swatches[10], swatchesLength[10], ballW, ballH);
		} else if (i % 6 == 0) {
			ballW = width / 40;
			ballH = width / 300;
			ball[i] = new Walker(swatches[11], swatchesLength[11], ballW, ballH);
		} else {
			ballW = width / 70;
			ballH = width / 70;
			ball[i] = new Walker(swatches[12], swatchesLength[12], ballW, ballH);
		}
	}

	for (i = 0; i < ball.length; i++) {
		for (step = 0; step < 1000; step++) {
			ball[i].display();
			ball[i].move();
		}
	}

	makeScanlines();
}

function makeScanlines() {
	for (i = 0; i < width; i++) {
		if (i % 2 == 0) {
			stroke(0, 0, 100, 100);
			line(i, 0, i, height);
		}
	}
}

function draw() {}
