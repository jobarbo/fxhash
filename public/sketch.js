function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 10);
	noiseSeed(fxrand() * 10);
	rectMode(CENTER);
	smooth();
	background(255);
	let margin = width / 50;
	let xstart = random(10);
	let xnoise = xstart;
	let ynoise = random(10);
	let basew = 1;
	let step = 1;

	let netwidth = width - margin * 2;
	let netheight = height - margin * 2;

	//rect(width/2,height/2,netwidth,netheight);
	//rect(margin,margin,netwidth,netheight);

	for (let y = margin + basew; y < height - margin; y += step) {
		ynoise += 0.01;
		xnoise = xstart;
		for (let x = margin + basew; x < width - margin; x += step) {
			xnoise += 0.01;
			drawPoint(x, y, noise(xnoise, ynoise), basew);
		}
	}
}

function drawPoint(x, y, noiseFactor, basew) {
	let len = basew * noiseFactor;
	fill(255, 0, 0);
	noStroke();
	rect(x, y, len, len);
}
