let horizon;
let trees = [];
let horizonVectorPoints = [];
function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	// in this sketch we will creating the horizon line and populate it with trees
	// the horizon line is made of multiple vector points that are connected together
	// each vector point will be stored in an array so we can use it later to also draw the trees
	// the horizon line is drawn from the left to the right of the screen
	// each vector point position is calculated using the noise function

	// we will create a new horizon object
}

function draw() {}
