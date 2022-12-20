//! MAKE POST PROCESSING OFFSET GLOBAL

function setup() {
	pixelDensity(2);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(50, 5, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	rectMode(CENTER);

	let aura = new Aura(aura_type, bgSpriteJSON, bgSpriteSheets);
	aura.drawAura();

	let shape = new Shape(shape_type);
	shape.drawShape();
}

function draw() {}
