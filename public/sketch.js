function setup() {
	pixelDensity(3.0);
	createCanvas(1920, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
}

function draw() {
	stroke(0, 0, 0, 10);
	strokeWeight(width / width);
	noSmooth();
	ellipse(width / 2, height / 2, width / 20, width / 20);
}

function keyPressed() {
	if (key == 's' || key == 'S') {
		saveArtwork();
	}
}

// make a function to save the canvas as a png file with the git branch name and a timestamp
function saveArtwork() {
	var timestamp = Date.now();
	save('artwork' + '-' + timestamp + '.png');
}
