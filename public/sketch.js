let symmetry = 30;
let angle = 360 / symmetry;
let brushSizeSlider;
let sizeSlider;
let xoff = 0;
let yoff = 0;

let mx, my, mx2, my2, mx3, my3;

function setup() {
	pixelDensity(3.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 5, 10);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	angleMode(DEGREES);

	// Setting up the slider for the thickness of the brush
	brushSizeSlider = createButton('Brush Size Slider');
	sizeSlider = createSlider(1, 320, 4, 0.1);
}

function draw() {
	stroke(0, 0, 0, 10);
	strokeWeight(width / width);
	noSmooth();
	translate(width / 2, height);
	// MX and MY are the moving coordinates of the shape.
	// mx and my changes according to a noise function.
	let inc = sizeSlider.value() / 1;
	mx = 100 + noise(frameCount * 0.02) * xoff + inc;
	my = -100 + noise(frameCount * 0.011) * yoff + inc;
	mx2 = 100 + noise(frameCount * 0.003) * xoff + inc;
	my2 = noise(frameCount * 0.012) * yoff + inc;
	mx3 = noise(frameCount * 0.004) * xoff + inc;
	my3 = noise(frameCount * 0.013) * yoff + inc;
	xoff += 0.9;
	for (let i = 0; i < symmetry; i++) {
		rotate(angle);
		let sw = sizeSlider.value();
		strokeWeight(0.5);
		stroke(38, 100, 100, 100);
		fill(80, 5, 10, 100);

		beginShape();
		curveVertex(mx, my);
		curveVertex(mx, my);
		curveVertex(mx2, my2);
		curveVertex(mx3, my3);

		endShape(CLOSE);
		push();
		scale(1, -1);
		pop();
		yoff += 0.1;
	}
}
