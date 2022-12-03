let bleed = 0;
let inc = 0.05;
let cells = [];
let w = Math.floor(20 * 300);
let h = Math.floor(20 * 300);

function setup() {
	createCanvas(1000, 500);
	pixelDensity(1);
	colorMode(HSB, 360, 100, 100, 100);
	background(10, 10, 0, 100);
	rectMode(CENTER);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let palette = window.$fxhashFeatures.biomeColorList;

	// canvas bleed for printing
	bleed = w * 0.005;

	// number of columns and rows
	let cellCountX = 200;
	let cellCountY = int(cellCountX * (height / width));
	let cellCount = cellCountX * cellCountY;

	// calculate the width and height of the cells to always be 1:1 ratio
	let cellWidth = (width - bleed * 2) / cellCountX;
	let cellHeight = (height - bleed * 2) / cellCountY;

	//let margin = int(cellWidth * 0);
	let margin = 0;

	// create a grid of cells that fill the sreen and is relative to the width and height of the screen
	noiseDetail(5, 0.55);

	let yoff = 0;
	for (let gridY = 0; gridY < cellCountY; gridY++) {
		let xoff = 110;
		for (let gridX = 0; gridX < cellCountX; gridX++) {
			let posX = bleed + cellWidth * gridX;
			let posY = bleed + cellHeight * gridY;
			let cell = new Cell(posX, posY, cellWidth, cellHeight, margin, xoff, yoff, inc, palette);
			cells.push(cell);
			xoff += inc;
		}
		yoff += inc;
	}
}

function draw() {
	inc = 0.0002;

	for (let i = 0; i < cells.length; i++) {
		cells[i].display(inc);
	}
}
