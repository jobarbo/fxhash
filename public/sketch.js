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
	createCanvas(1000, 1000);
	rectMode(CENTER);
	background(245);

	for (i = 0; i <= 6; i++) {
		swatchesLength[i] = swatches[i].height;
	}

	let colors = imgToColorArray(swatches[5]);

	for (i = 0; i <= width; i++) {
		if (i % 5 == 0) {
			ballW = width / 400;
			ballH = width / 50;
			ball[i] = new Walker(swatches[5], swatchesLength[5], ballW, ballH);
		} else if (i % 6 == 0) {
			ballW = width / 50;
			ballH = width / 400;
			ball[i] = new Walker(swatches[6], swatchesLength[6], ballW, ballH);
		} else {
			ballW = width / 100;
			ballH = width / 100;
			ball[i] = new Walker(swatches[4], swatchesLength[4], ballW, ballH);
		}
	}

	for (i = 0; i < ball.length; i++) {
		for (step = 0; step < 1000; step++) {
			ball[i].display();
			ball[i].move();
		}
	}
}

// take each pixel from the image and make an array of HSB colors from it
function imgToColorArray(img) {
	let colors = [];
	img.loadPixels();
	for (let i = 0; i < img.pixels.length; i += 4) {
		let r = img.pixels[i];
		let g = img.pixels[i + 1];
		let b = img.pixels[i + 2];
		let a = img.pixels[i + 3];
		let c = color(r, g, b, a);
		colors.push(c.levels);
	}
	return colors;
}
function draw() {}
