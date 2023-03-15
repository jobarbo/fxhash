let features = '',
	rects = [],
	balls = [],
	bgTextureDone = false,
	rectDrawn = false,
	margin = 0;
format = {
	portrait: [1600, 2000],
	landscape: [2000, 1600],
	square: [1600, 1600],
};

function setup() {
	features = window.$fxhashFeatures;

	let formatMode = features.format_mode;
	pixelDensity(3);
	createCanvas(format[formatMode][0], format[formatMode][1]);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	rectMode(CENTER);

	margin = (width + height) / random([15, 25, 40, 50, 60, 80]);

	let bgHue = random([0, 10, 20, 30, 40, 50]);
	let bgSat = 10;
	let bgBri = features.bg_mode === 'light' ? 100 : 10;
	let bgColor = color(bgHue, bgSat, bgBri);
	background(bgColor);

	let angleArr = [0, 45, 90, 135, 180, 225, 270, 315];
	let colorArr = [color(44, 96, 100), color(19, 97, 98), color(334, 100, 100), color(265, 76, 93), color(217, 77, 100)];

	let total_shape_num = features.ellipse_num + features.rectangle_num;

	if (features.border_mode === 'border') {
		noStroke();
		fill(bgHue, bgSat, features.bg_mode == 'light' ? 10 : 100);
		rect(width / 2, height / 2, width - margin, height - margin);
	}

	createTexture(bgColor);

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
				rectDrawn = true;
			}
			if (features.shape_type.includes('ellipse')) {
				const elIntervalId = setInterval(() => {
					if (rectDrawn) {
						createBalls(margin, colorArr, bgHue, rects, total_shape_num);
						clearInterval(elIntervalId);
					}
				}, 100);
			}
		}
	}, 100);
}

function createBalls(margin, colorArr, bgHue, rects, totalShapes) {
	const ballNum = features.ellipse_num;
	const balls = [];
	let tries = 1;

	for (let i = 0; i < ballNum; i++) {
		let ball = new Ball(margin, colorArr, bgHue, ballNum, totalShapes, i + 1, 0);
		let colliding = true;

		do {
			colliding =
				balls.some((b) => collideCircleCircle(ball.x, ball.y, ball.d, b.x, b.y, b.d, true)) ||
				rects.some((r) => collideCirclePoly(ball.x, ball.y, ball.d, r.points, true));

			if (colliding) {
				ball = new Ball(margin, colorArr, bgHue, ballNum, totalShapes, i + 1, ++tries);
			}
		} while (colliding);

		balls.push(ball);
		ball.draw();
	}
}

function createRectangles(margin, colorArr, angleArr, bgColor, rectType, lineNum = 0, rectNum = 0, totalShapes) {
	const totalNum = lineNum + rectNum;

	for (let i = 0; i < totalNum; i++) {
		const type = i < rectNum ? 'rectangle' : 'line';
		let rect = new Rect(margin, colorArr, angleArr, bgColor, type, rectNum, totalShapes, i + 1, 0);
		let tries = 0;

		while (rects.some((r, j) => i !== j && collidePolyPoly(rect.points, r.points, true))) {
			if (tries > 1000) {
				rect = new Rect(margin, colorArr, angleArr, bgColor, type, rectNum, totalShapes, i + 1, tries, 0, 0);
			} else {
				rect = new Rect(margin, colorArr, angleArr, bgColor, type, rectNum, totalShapes, i + 1, tries);
			}
			tries++;
		}

		rects.push(rect);
		rect.draw();
	}

	rectDrawn = true;
}

function createTexture(bgColor) {
	let texture = [];
	console.time('drawTexture');
	for (let index = 0; index < 5; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(width / 8, width / 2);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1, bgColor);
	}
	let sketch_texture = drawTexture(texture);
	let interval = setInterval(() => {
		let result = sketch_texture.next();
		if (result.done) {
			bgTextureDone = true;
			console.timeEnd('drawTexture');
			clearInterval(interval);
		}
	}, 0);
}

function* drawTexture(texture) {
	let count = 0;
	let draw_every = 2000;
	// 100 is too long;
	// 1000 is 10 seconds;

	// track time spent to draw

	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 300000; j++) {
			texture[index].display();
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
}
