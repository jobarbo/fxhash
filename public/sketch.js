let w = 0;
let h = 0;
let initx1,
	inity1,
	initx2,
	inity2,
	initx3,
	inity3,
	initx4,
	inity4;
let d1x, d1y, d2x, d2y, d3x, d3y, d4x, d4y;

let xoff1, yoff1, xoff2, yoff2, xoff3, yoff3, xoff4, yoff4;

function setup() {
	pixelDensity(1);
	createCanvas(1080, 1080);
	colorMode(HSB, 360, 100, 100, 100);
	background(50, 23, 15);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	createLoop({
		gif: {
			options: {quality: 5},
			fileName: 'noiseLoop.gif',
			startLoop: 1,
			endLoop: 2,
		},
	});
	animLoop.noiseFrequency(0.2);

	d1x = random(3, 6);
	d1y = random(3, 16);
	d2x = random(3, 4);
	d2y = random(3, 9);
	d3x = random(3, 10);
	d3y = random(3, 11);
	d4x = random(3, 7);
	d4y = random(3, 5);

	initx1 = random(-200, 200);
	inity1 = random(-200, 200);
	initx2 = random(-200, 200);
	inity2 = random(-200, 200);
	initx3 = random(-200, 200);
	inity3 = random(-200, 200);
	initx4 = random(-200, 200);
	inity4 = random(-200, 200);

	xoff1 = random(100);
	yoff1 = random(100);

	console.log('d1x', d1x);
	console.log('d1y', d1y);
	console.log('d2x', d2x);
	console.log('d2y', d2y);
	console.log('d3x', d3x);
	console.log('d3y', d3y);
	console.log('d4x', d4x);
	console.log('d4y', d4y);

	console.log(animLoop);
}

function draw() {
	translate(width / 2, height / 2);
	const x1 = initx1 + (cos(animLoop.theta) * width) / d1x;
	const y1 = inity1 + (animLoop.noise() * height) / d1y;
	const x2 = initx2 + (sin(animLoop.theta) * width) / d2x;
	const y2 = inity2 + (animLoop.noise() * height) / d2y;
	const x3 = initx3 + (cos(animLoop.theta) * width) / d3x;
	const y3 = inity3 + (animLoop.noise() * height) / d3y;
	const x4 = initx4 + (sin(animLoop.theta) * width) / d4x;
	const y4 = inity4 + (animLoop.noise() * height) / d4y;

	w = constrain(40 + animLoop.noise() * 200, 40, 200);

	stroke(50, 23, 90, 100);
	fill(50, 23, 15);
	ellipse(x1, y1, w, w);
	ellipse(-x2, -y2, w, w);
	ellipse(x3, -y3, w, w);
	ellipse(-x4, y4, w, w);
}
