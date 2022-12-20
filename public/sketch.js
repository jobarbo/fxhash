function setup() {
	pixelDensity(2);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(45, 13, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let aura = new Aura(aura_type, bgSpriteJSON, bgSpriteSheets);
	aura.drawAura();
}

function draw() {}
