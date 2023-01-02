let sun;

function setup() {
	pixelDensity(3.0);
	createCanvas(3000, 3000);
	colorMode(HSB, 360, 100, 100, 100);
	background(35, 10, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	noLoop();

	// create a sun object
	sun = new Sun();
	sun.display();

	// create a mountain object

	let mtnBaseY = random(height / 2, height / 1.5);
	let mtnTopY = mtnBaseY - random(100, height / 2);
	let mtnY = random(mtnBaseY, mtnTopY);
	console.log(mtnY, mtnTopY, mtnBaseY);
	mountain = new Mountain(mtnY, mtnTopY, mtnBaseY);
	mountain.display();

	let oceanTopY = mtnBaseY;
	let oceanBaseY = height + 100;
	let ocean = new Ocean(oceanTopY, oceanBaseY);
	ocean.display();
}

function draw() {}
