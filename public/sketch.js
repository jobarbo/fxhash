//! MAKE POST PROCESSING OFFSET GLOBAL
let pp_offset_x = 0;
let pp_offset_y = 0;
function setup() {
	pixelDensity(2);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(50, 5, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	rectMode(CENTER);

	pp_offset_x = random(-4, 4);
	pp_offset_y = random(-4, 4);

	let aura = new Aura(aura_type, bgSpriteJSON, bgSpriteSheets, pp_offset_x, pp_offset_y);
	aura.drawAura();

	let shape = new Shape(shape_type, pp_offset_x, pp_offset_y);
	shape.drawShape();
	console.log(outlineSpriteJSON);

	let outline = new Outline(outline_type, outlineSpriteJSON, outlineSpriteSheets, pp_offset_x, pp_offset_y);
	outline.drawOutline();

	let nose = new Nose(nose_type, noseSpriteJSON, noseSpriteSheets, pp_offset_x, pp_offset_y);
	nose.drawNose();
}

function draw() {}
