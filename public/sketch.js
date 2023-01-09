let horizon;
let trees = [];

function setup() {
	pixelDensity(1.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(35, 10, 99);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	noSmooth();

	// in this sketch we will creating the horizon line and populate it with trees
	// the horizon line is made of multiple vector points that are connected together
	// each vector point will be stored in an array so we can use it later to also draw the trees
	// the horizon line is drawn from the left to the right of the screen
	// each vector point position is calculated using the noise function

	// we will create a new horizon object

	horizon = new Horizon();
	horizon.init();
	// we will create a new tree object
	// get the points from the horizon object

	let points = horizon.getPoints();
	let lowestPoint = points[0];
	console.log(points);
	for (let i = 0; i < points.length; i++) {
		if (points[i].y > lowestPoint.y) {
			lowestPoint = points[i];
		}
	}

	for (let i = 0; i < 25; i++) {
		trees[i] = new Tree(lowestPoint);
		trees[i].draw();
	}

	horizon.draw();
}

function draw() {}

function createTexture(hue) {
	let texture = [];

	for (let index = 0; index < 2000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(width / 160, width / 6);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1, hue);
	}
	let sketch_texture = drawTexture(texture);
	let interval = setInterval(() => {
		let result = sketch_texture.next();
		if (result.done) {
			clearInterval(interval);
		}
	}, 0);
}

function* drawTexture(texture) {
	let count = 0;
	let draw_every = 500;
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 10500; j++) {
			texture[index].display();
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
}
