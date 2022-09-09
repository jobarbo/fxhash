let swatches = [];
let swatchesLength = [];
let brush;
let playHead = 0;
let posY = 0;
let posX = 0;
let walkerW = 0;
let walkerH = 0;
let walker = [];
function preload() {
	for (i = 0; i <= 3; i++) {
		swatches[i] = loadImage('./assets/grid_' + i + '.jpg');
	}
	brush = loadImage('./assets/brush2.png');
}

function setup() {
	pixelDensity(3);
	createCanvas(1000, 1000);
	rectMode(CENTER);
	imageMode(CENTER);
	background(255);

	const canvas = document.querySelector('.p5Canvas');
	const ctx = canvas.getContext('2d');

	for (i = 0; i <= 3; i++) {
		swatchesLength[i] = swatches[i].height;
	}
	for (i = 0; i <= width * 6; i++) {
		walker[i] = new Walker(swatches[1], swatchesLength[1], walkerW, walkerH, brush, ctx);
	}
	for (i = 0; i < walker.length; i++) {
		walker[i].display();
	}
}

function draw() {}
