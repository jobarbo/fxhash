let sky;
let sun;
let ground;
let mountains = [];
let clouds;
let sea;
let night = false;

function setup() {
	pixelDensity(3.0);
	createCanvas(720, 1280);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	noLoop();

	let pallette = window.$fxhashFeatures.palette;
	let skyColor = color(pallette.sky[0], pallette.sky[1], pallette.sky[2]);
	let sunColor = color(pallette.sun[0], pallette.sun[1], pallette.sun[2]);
	let groundColor = color(pallette.ground[0], pallette.ground[1], pallette.ground[2]);
	let mountainsColor = color(pallette.mountain[0], pallette.mountain[1], pallette.mountain[2]);
	let seaColor = color(pallette.sea[0], pallette.sea[1], pallette.sea[2]);

	// draw the sky
	sky = new Sky(skyColor);
	sky.draw();

	// draw the sun
	sun = new Sun(sunColor);
	sun.draw();
	let sunPosition = sun.getSunPosition();

	// draw the mountains
	let mtnPos = height * random(0.7, 0.9);
	let mtnHeight = random(height / 2, height / 1.1);
	let mtnNum = window.$fxhashFeatures.mountain_num;
	let mtnID = 1;
	let satOffset = (-mtnNum * mtnNum) / 2;
	let brightOffset = (mtnNum * mtnNum) / 2;
	let offsetIterator = map(mtnNum, 1, 5, 7, 2);
	let mtnDone = false;

	let skySatOffset = -15;
	let skyBrightOffset = 0;

	for (let i = 0; i < mtnNum; i++) {
		mountains[i] = new Mountains(mtnID, mountainsColor, mtnPos, mtnHeight, i, mtnNum, satOffset, brightOffset, skyColor, skySatOffset, skyBrightOffset, sunPosition);

		satOffset += offsetIterator * mtnNum;
		brightOffset -= offsetIterator * mtnNum;
		skySatOffset += mtnNum / 2;
		skyBrightOffset -= mtnNum / 2;
		mtnHeight -= 50;
		mtnID++;
	}
	var startTime = performance.now();
	// draw a mountain and wait for mountain.done to be true before drawing the next one
	let i = 0;
	let drawMountainInterval = setInterval(() => {
		if (mountains[i].done) {
			i++;
			if (i < mountains.length) {
				drawMountain = mountains[i].draw();
			} else {
				clearInterval(drawMountainInterval);
				mtnDone = true;
				var endTime = performance.now();
				console.log('mountain draw time: ' + (endTime - startTime) + 'ms');
			}
		} else {
			if (!mountains[i].started) {
				mountains[i].draw();
			}
		}
	}, 100);

	// draw the ground
	ground = new Ground(mtnPos, groundColor);
	ground.draw();
}

function draw() {}
