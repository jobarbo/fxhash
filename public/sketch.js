let source;

let pieces = [];

let cols = 100;
let rows = 100;

let w, h;

function preload() {
	source = loadImage('https://source.unsplash.com/random/1000x1000');
}

function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	// create a tile that store a piece of the image
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let w = random(20, 650);
			let h = random(3, 50);
			let x = i * w;
			let y = j * h;

			let img = source.get(x, y, w, h);
			pieces.push(new Tile(x, y, w, h, j, i, img));
		}
	}

	image(source, 0, 0);
	console.log(pieces.length);
	// display all the tiles
	for (let i = 0; i < pieces.length; i++) {
		pieces[i].show();
	}
}

function draw() {}
