let features = '';
let rectTexture = '';

function preload() {
	rectTexture = loadImage('image/texture2.png');
}
function setup() {
	features = window.$fxhashFeatures;
	pixelDensity(2.0);
	createCanvas(1500, 1500);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let bgHue = random([0, 10, 20, 30, 40, 50]);
	let bgSat = 10;
	let blndMode =
		features.bg_mode === 'light'
			? random([BLEND, DARKEST, DIFFERENCE, EXCLUSION, MULTIPLY])
			: random([BLEND, EXCLUSION, SCREEN, ADD, DIFFERENCE]);
	let bgBri = features.bg_mode === 'light' ? 100 : 15;
	background(bgHue, bgSat, bgBri);
	// Apply transparency without changing color
	let basecolor = features.bg_mode === 'light' ? color(0, 0, 10) : color(0, 10, 100);

	let angleArr = [0, 45, 90, 135, 180, 225, 270, 315];
	let colorArr = [color(155, 94, 40), color(40, 80, 100), color(206, 98, 50), color(350, 97, 73), basecolor];
	let margin = width / 5;
	//blendMode(blndMode);

	// create balls
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
				balls[i].r = random([20, 100, 150, 200]);
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
					continue;
				} else {
					// replace the line elsewhere on the canvas
					if (tries > 1000) {
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
		rects[i] = new Rect(margin, colorArr, angleArr, bgHue, rectTexture);
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
					continue;
				} else {
					// replace the rect elsewhere on the canvas
					if (tries > 1000) {
						rects[i] = new Rect(margin, colorArr, angleArr, bgHue, rectTexture, 20, 20);
						j = -1;
						tries++;
					} else {
						rects[i] = new Rect(margin, colorArr, angleArr, bgHue, rectTexture);
						j = -1;
						tries++;
					}
				}
			}
		}
		rects[i].draw();
	}
}

function createTexturehue() {
	let texture = [];

	for (let index = 0; index < 5000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(width / 8, width / 2);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1, 0);
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
	let draw_every = 5000;
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 50; j++) {
			texture[index].display();
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
}
