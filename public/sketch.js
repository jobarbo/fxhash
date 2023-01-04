let source;
let source2;
let source3;
let bg;

let pieces = [];

let num = 200;

let fpsCount = [2, 5, 10, 25, 30, 60, 100];

let w, h;

function preload() {
	bg = loadImage('./medias/bg.png');
	source = loadImage('./medias/source.png');
	source2 = loadImage('./medias/source2.png');
	source3 = loadImage('./medias/source3.png');
}

function setup() {
	pixelDensity(1.0);
	createCanvas(2000, 2000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	image(bg, 0, 0, width, height);
	// create a tile that store a piece of the image
	for (let i = 0; i < num; i++) {
		let posX = random(200, width - 200);
		let posY = random(200, height - 200);
		let w = random(2, 250);
		let h = random(3, 50);
		let x = posX - w / 2;
		let y = posY - h / 2;

		let img = source.get(x, y, width, height);
		let img2 = source2.get(x, y, width, height);
		let img3 = source3.get(x, y, width, height);
		pieces.push(new Tile(x, y, w, h, img, img2, img3));
	}

	//image(source, 0, 0);
	console.log(pieces.length);
	// display all the tiles
}

function draw() {
	if (frameCount % 10 == 0) {
		// show the image in the background 75% smaller than the canvas and centered
		image(bg, 0, 0, width, height);
		image(
			source,
			(width - source.width * 0.85) / 2,
			(height - source.height * 0.85) / 2,
			source.width * 0.85,
			source.height * 0.85
		);
	}
	if (frameCount % random(fpsCount) == 0) {
		for (let i = 0; i < pieces.length; i++) {
			pieces[i].show();
		}
	}
}
