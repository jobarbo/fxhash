let sky;
let sun;
let ground;
let mountains = [];
let clouds;
let sea;
let night = false;

function setup() {
	pixelDensity(3.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	noLoop();

	pallette = window.$fxhashFeatures.palette;
	skyColor = color(pallette.sky[0], pallette.sky[1], pallette.sky[2]);
	sunColor = color(pallette.sun[0], pallette.sun[1], pallette.sun[2]);
	groundColor = color(pallette.ground[0], pallette.ground[1], pallette.ground[2]);
	mountainsColor = color(pallette.mountain[0], pallette.mountain[1], pallette.mountain[2]);
	seaColor = color(pallette.sea[0], pallette.sea[1], pallette.sea[2]);

	// draw the sky
	sky = new Sky(skyColor);
	sky.draw();

	// draw the sun
	sun = new Sun(sunColor);
	sun.draw();

	// draw the mountains
	let mtnPos = height * random(0.6, 0.9);
	let mtnHeight = random(height / 3, height / 1.5);
	//let mtnNum = window.$fxhashFeatures.mountain_num;
	let mtnNum = 4;
	let xoff = 0.001;
	let satOffset = (-mtnNum * mtnNum) / 2;
	let brightOffset = (mtnNum * mtnNum) / 2;
	let offsetIterator = map(mtnNum, 1, 5, 10, 2);
	for (let i = 0; i < mtnNum; i++) {
		mountains[i] = new Mountains(mountainsColor, mtnPos, mtnHeight, xoff, i, mtnNum, satOffset, brightOffset);
		mountains[i].draw();
		satOffset += offsetIterator * mtnNum;
		brightOffset -= offsetIterator * mtnNum;
	}

	// draw the ground
	ground = new Ground(mtnPos, groundColor);
	ground.draw();
}

function draw() {}

