function setup() {
	pixelDensity(3.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
}

function draw() {
	background(255, 100);
	translate(width / 2, height / 2);
	let circleResolution = map(mouseY, 0, height, 20, 800);
	let radius = mouseX - width / 2 + 0.5;
	let angle = TWO_PI / circleResolution;
	let xoff = 3;

	strokeWeight(mouseY / 50);

	beginShape();
	noFill();
	for (let i = 0; i <= circleResolution; i++) {
		let x = 0 + cos(angle * i) * radius;
		let y = 0 + sin(angle * i) * radius;
		let yoff = random(y / 10);
		line(0, 0, x + xoff, y + yoff);
		curveVertex(x + xoff, y + yoff);
	}
	endShape(CLOSE);
}
