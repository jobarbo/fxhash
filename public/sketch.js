let files = [];
let tiles = [];
let tile_img = [];
let testImg;

function preload() {
	// check the number of files in the folder lib/image and load them
	for (let i = 1; i <= 8; i++) {
		let file = `./lib/image/t_tile_${i}.png`;
		files.push(file);
	}

	for (let i = 0; i < files.length; i++) {
		tile_img[i] = loadImage(files[i]);
	}
}

function setup() {
	//rectMode(CENTER);
	pixelDensity(3.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 4, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	// make a grid of 30 rows and 30 columns that are relative to the width and height of the canvas
	for (let x = 0; x < width; x += width / 10) {
		for (let y = 0; y < height; y += height / 10) {
			let imgIndex = int(random(0, tile_img.length));
			tiles = new Tile(x, y, width / 10, width / 10, tile_img[imgIndex]);
			tiles.display();
		}
	}
}

function draw() {}

class Tile {
	constructor(x, y, w, h, img) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = img;
	}

	display() {
		noStroke();
		rect(this.x, this.y, this.w, this.h);
		image(this.img, this.x, this.y, 100, 100);
	}
}
