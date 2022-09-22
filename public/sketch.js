let swatches = [];
let swatchesLength = [];
let playHead = 0;
let posY = 0;
let posX = 0;
let ballW = 0;
let ballH = 0;
let ball = [];
function preload() {
	for (i = 0; i <= 15; i++) {
		swatches[i] = loadImage('./assets/grid_' + i + '.jpg');
	}
}

function setup() {
	pixelDensity(3);
	createCanvas(12 * 100, 18 * 100);
	rectMode(CENTER);
	background(245);
	for (i = 0; i <= 15; i++) {
		swatchesLength[i] = swatches[i].height;
	}
	for (i = 0; i <= height * 6; i++) {
		if (i % 5 == 0) {
			ballW = width / 300;
			ballH = width / 40;
			ball[i] = new Walker(swatches[13], swatchesLength[13], ballW, ballH);
		} else if (i % 6 == 0) {
			ballW = width / 40;
			ballH = width / 300;
			ball[i] = new Walker(swatches[15], swatchesLength[15], ballW, ballH);
		} else {
			ballW = width / 70;
			ballH = width / 70;
			ball[i] = new Walker(swatches[14], swatchesLength[14], ballW, ballH);
		}
	}

	for (i = 0; i < ball.length; i++) {
		for (step = 0; step < 1000; step++) {
			ball[i].display();
			ball[i].move();
		}
	}

	//makeScanlines();
}

function makeScanlines() {
	for (i = 0; i < width; i++) {
		if (i % 4 == 0) {
			strokeWeight(2);
			stroke(0, 0, 100, 50);
			line(i, 0, i, height);
		}
	}
}

function draw() {}
