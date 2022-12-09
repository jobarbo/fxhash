let bleed = 0;
let inc = 0.02;
let cells = [];
let w = Math.floor(15 * 100);
let h = Math.floor(15 * 100);

function setup() {
	createCanvas(w, h);
	pixelDensity(1);
	colorMode(HSB, 360, 100, 100, 100);
	background(10, 0, 10, 100);
	rectMode(CENTER);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let palette = window.$fxhashFeatures.biomeColorList;

	// have a cell width unit that is relative to the width of the screen

	let cellWidth = 1;
	let cellHeight = cellWidth;
	console.log('cellWidth: ' + cellWidth);
	console.log('cellHeight: ' + cellHeight);

	//	calculates the number of cells that can fit in the screen according to cellWidth and cellHeight
	let cellCountX = width / cellWidth;
	let cellCountY = height / cellHeight;

	console.log('cellCountX: ' + cellCountX);
	console.log('cellCountY: ' + cellCountY);

	let margin = cellWidth * 0;
	console.log(margin);

	// create a grid of cells that fill the sreen and is relative to the width and height of the screen
	//noiseDetail(5, 0.55);

	// calculate the time it takes to create the grid
	let t0 = performance.now();
	let yoff = 0;
	for (let gridY = 0; gridY < cellCountY; gridY++) {
		let xoff = 110;
		for (let gridX = 0; gridX < cellCountX; gridX++) {
			let posX = cellWidth * gridX;
			let posY = cellHeight * gridY;
			let cell = new Cell(posX, posY, cellWidth, cellHeight, margin, xoff, yoff, inc, palette);
			cells.push(cell);
			xoff += inc;
		}
		yoff += inc;
	}
	for (let i = 0; i < cells.length; i++) {
		cells[i].display(inc);
	}
	let t1 = performance.now();
	console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');

	// make a bleed around the canvas that match the cellWidth and cellHeight
	let bleed = cellWidth * 0;
	noFill();
	stroke(0, 0, 10, 100);
	strokeWeight(bleed);
	rect(width / 2, height / 2, width - bleed, height - bleed);
}

function draw() {
	/* 	inc = 0.002;

	for (let i = 0; i < cells.length; i++) {
		cells[i].display(inc);
	} */

	noLoop();
}
