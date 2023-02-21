let features = '';
function setup() {
	features = window.$fxhashFeatures;
	pixelDensity(2.0);
	createCanvas(1500, 1500);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let bgHue = random([0, 10, 20, 30, 40, 50]);
	let bgSat = 10;
	let bgBri = features.bg_mode === 'light' ? 100 : 10;
	background(bgHue, bgSat, bgBri);

	let angleArr = [0, 45, 90, 135, 180, 225, 270, 315];
	let colorArr = [
		color(155, 94, 40),
		color(40, 80, 100),
		color(206, 98, 50),
		color(350, 97, 73),
		color(0, 0, 10),
		color(0, 0, 10),
		color(0, 0, 10),
	];

	let margin = width / 6;

	blendMode(MULTIPLY);

	// create balls
	console.log(features.shape_type);
	// check if features.shape_type substring contains 'ellipse'
	if (features.shape_type.includes('ellipse')) {
		createBalls(margin, colorArr, bgHue);
	}
	if (features.shape_type.includes('line')) {
		createLines(margin, colorArr, angleArr, bgHue);
	}
	if (features.shape_type.includes('rectangle')) {
		createRectangles(margin, colorArr, angleArr, bgHue);
	}

	blendMode(BLEND);

	//createTexture(0);
}

function createBalls(margin, colorArr, bgHue) {
	let balls = [];
	let ballNum = features.ellipse_num;
	for (let i = 0; i < ballNum; i++) {
		balls[i] = new Ball(margin, colorArr, bgHue);
		// check if the ball is overlapped
		for (let j = 0; j < balls.length; j++) {
			let d = dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
			if (d < balls[i].r + balls[j].r && j != i) {
				balls[i].r = random(20, 100, 200);
				balls[i].x = random(margin + balls[i].r, width - (balls[i].r + margin));
				balls[i].y = random(margin + balls[i].r, height - (balls[i].r + margin));
				j = -1;
			}
		}

		balls[i].draw();
	}
}

function createLines(margin, colorArr, angleArr, bgHue) {
	let lines = [];
	let lineNum = features.line_num;
	for (let i = 0; i < lineNum; i++) {
		lines[i] = new Line(margin, colorArr, angleArr, bgHue);
		// store the number of tries to avoid infinite loop
		let tries = 0;
		for (let j = 0; j < lines.length; j++) {
			// check if the bounding box of the two rects are overlapping
			// if the leftmost point of the first rect bounding box is to the right of the rightmost point of the second rect bounding box then they are not overlapping
			if (i != j) {
				if (
					lines[i].topLeft.x > lines[j].topRight.x ||
					lines[i].topRight.x < lines[j].topLeft.x ||
					lines[i].topLeft.y > lines[j].bottomLeft.y ||
					lines[i].bottomLeft.y < lines[j].topLeft.y
				) {
					//console.log('the boxes are not overlapping');
					continue;
				} else {
					//console.log('the boxes are overlapping');
					// replace the line elsewhere on the canvas
					if (tries > 100) {
						lines[i] = new Line(margin, colorArr, angleArr, bgHue, 25, 2);
					} else {
						lines[i] = new Line(margin, colorArr, angleArr, bgHue);
						j = -1;
						tries++;
					}
				}
			}
		}

		lines[i].draw();
	}
}

function createRectangles(margin, colorArr, angleArr, bgHue) {
	let rects = [];
	let rectNum = features.rectangle_num;
	for (let i = 0; i < rectNum; i++) {
		rects[i] = new Rect(margin, colorArr, angleArr, bgHue);
		// check if the rect is overlapped

		let tries = 0;
		for (let j = 0; j < rects.length; j++) {
			if (i != j) {
				// check if the bounding box of the two rects are overlapping
				// if the leftmost point of the first rect bounding box is to the right of the rightmost point of the second rect bounding box then they are not overlapping
				if (
					rects[i].topLeft.x > rects[j].topRight.x ||
					rects[i].topRight.x < rects[j].topLeft.x ||
					rects[i].topLeft.y > rects[j].bottomLeft.y ||
					rects[i].bottomLeft.y < rects[j].topLeft.y
				) {
					//console.log('the boxes are not overlapping');
					continue;
				} else {
					console.log('the boxes are overlapping');
					// replace the rect elsewhere on the canvas
					console.log('tries: ' + tries);
					if (tries > 200) {
						rects[i] = new Rect(margin, colorArr, angleArr, bgHue, 20, 20);
						j = -1;
						tries++;
					} else {
						rects[i] = new Rect(margin, colorArr, angleArr, bgHue);
						j = -1;
						tries++;
					}
				}
			}
		}
		rects[i].draw();
	}
}

function createTexture(hue) {
	let texture = [];

	for (let index = 0; index < 2000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(width / 8, width / 2);
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
		for (let j = 0; j < 500; j++) {
			texture[index].display();
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
}
