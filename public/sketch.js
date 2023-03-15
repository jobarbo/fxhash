let features = '',
	rects = [],
	balls = [],
	bgTextureDone = false,
	rectDrawn = false,
	margin = 0;

function setup() {
	features = window.$fxhashFeatures;
	pixelDensity(1);
	createCanvas(2000, 2000);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	rectMode(CENTER);

	let bgHue = random([0, 10, 20, 30, 40, 50]);
	let bgSat = 10;
	let bgBri = features.bg_mode === 'light' ? 100 : 10;
	let bgColor = color(bgHue, bgSat, bgBri);
	background(bgColor);
	let basecolor = features.bg_mode === 'light' ? color(0, 0, 10) : color(0, 10, 100);

	let angleArr = [0, 45, 90, 135, 180, 225, 270, 315];
	let colorArr = [color(44, 96, 100), color(19, 97, 98), color(334, 100, 100), color(265, 76, 93), color(217, 77, 100)];
	margin = width / 10;
	let total_shape_num = features.ellipse_num + features.rectangle_num;

	noStroke();
	fill(bgHue, bgSat, features.bg_mode == 'light' ? 10 : 100);
	rect(width / 2, height / 2, width - margin, height - margin);

	createTexture(bgColor);
	bgTextureDone = true;
	checkTexturesAndDrawShapes(features, colorArr, angleArr, bgColor, bgHue, total_shape_num);
}

function checkTexturesAndDrawShapes(features, colorArr, angleArr, bgColor, bgHue, total_shape_num) {
	const intervalId = setInterval(() => {
		if (bgTextureDone) {
			clearInterval(intervalId);
			if (features.shape_type.includes('line') || features.shape_type.includes('rectangle')) {
				createRectangles(
					margin,
					colorArr,
					angleArr,
					bgColor,
					features.shape_type,
					features.line_num,
					features.rectangle_num,
					total_shape_num
				);
			} else {
				console.log('no lines or rectangles');
				rectDrawn = true;
			}
			if (features.shape_type.includes('ellipse')) {
				const elIntervalId = setInterval(() => {
					if (rectDrawn) {
						createBalls(margin, colorArr, bgHue, rects, total_shape_num);
						clearInterval(elIntervalId);
					}
				}, 1000);
			}
		}
	}, 100);
}
function createBalls(margin, colorArr, bgHue, rects, totalShapes) {
	const ballNum = features.ellipse_num;
	const balls = [];

	for (let i = 0; i < ballNum; i++) {
		let ball = new Ball(margin, colorArr, bgHue, ballNum, totalShapes, i + 1, 0);
		let colliding = true;
		let tries = 0;

		while (colliding) {
			colliding =
				balls.some((b) => collideCircleCircle(ball.x, ball.y, ball.d, b.x, b.y, b.d, true)) ||
				rects.some((r) => collideCirclePoly(ball.x, ball.y, ball.d, r.points, true));

			if (colliding) {
				ball = new Ball(margin, colorArr, bgHue, ballNum, totalShapes, i + 1, tries++);
			}
		}

		balls.push(ball);
		ball.draw();
	}
}

function createRectangles(margin, colorArr, angleArr, bgColor, rectType, lineNum = 0, rectNum = 0, totalShapes) {
	if (!rectType.includes('line')) lineNum = 0;
	if (!rectType.includes('rectangle')) rectNum = 0;

	const rects = Array(rectNum + lineNum)
		.fill(null)
		.map((_, i) => {
			const type = i < rectNum ? 'rectangle' : 'line';
			let tries = 0;
			let rect = new Rect(margin, colorArr, angleArr, bgColor, type, rectNum, totalShapes, i + 1, tries);

			while (rects.some((r, j) => i !== j && collidePolyPoly(rect.points, r.points, true))) {
				rect = new Rect(margin, colorArr, angleArr, bgColor, type, rectNum, totalShapes, i + 1, tries++);
			}

			rect.draw();
			return rect;
		});

	console.log('rect drawn');
	rectDrawn = true;
}

function createTexture(bgColor) {
	const texture = Array(20)
		.fill(null)
		.map(() => new Smudge(random(0, width), random(0, height), random(width / 8, width / 2), bgColor));
	const sketchTexture = drawTexture(texture);
	const interval = setInterval(() => {
		const result = sketchTexture.next();
		if (result.done) {
			bgTextureDone = true;
			clearInterval(interval);
		}
	}, 0);
}

function* drawTexture(texture) {
	let count = 0;
	const drawEvery = 1000;

	for (const t of texture) {
		for (let j = 0; j < 100000; j++) {
			t.display();
			if (++count > drawEvery) {
				count = 0;
				yield;
			}
		}
	}
}
