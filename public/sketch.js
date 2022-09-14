let swatches = [];
let swatchesLength = [];
let playHead = 0;
let posY = 0;
let posX = 0;
let ballW = 0;
let ballH = 0;
let ball = [];
function preload() {
	for (i = 0; i <= 6; i++) {
		swatches[i] = loadImage('./assets/grid_' + i + '.jpg');
	}
}

function setup() {
	pixelDensity(3);
	createCanvas(300, 1166);
	rectMode(CENTER);
	background(245);
	for (i = 0; i <= 6; i++) {
		swatchesLength[i] = swatches[i].height;
	}
	for (i = 0; i <= width * 6; i++) {
		if (i % 5 == 0) {
			ballW = width / 400;
			ballH = width / 50;
			ball[i] = new Walker(swatches[0], swatchesLength[0], ballW, ballH);
		} else if (i % 6 == 0) {
			ballW = width / 50;
			ballH = width / 400;
			ball[i] = new Walker(swatches[1], swatchesLength[1], ballW, ballH);
		} else {
			ballW = width / 100;
			ballH = width / 100;
			ball[i] = new Walker(swatches[2], swatchesLength[2], ballW, ballH);
		}
	}

	for (i = 0; i < ball.length; i++) {
		for (step = 0; step < 1000; step++) {
			ball[i].display();
			ball[i].move();
		}
	}
}

function draw() {}
