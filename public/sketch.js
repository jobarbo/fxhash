let features = '',
	rects = [],
	balls = [],
	bgTextureDone = false,
	rectDrawn = false,
	margin = 0,
	format = {
		portrait: [1500, 2000],
		landscape: [2000, 1500],
		square: [1500, 1500],
	},
	angles = {
		straight: [0, 90],
		diagonal: [45, 135],
		straight_0: [0],
		straight_90: [90],
		diagonal_45: [45],
		diagonal_135: [135],
		random: [0, 90, 180, 270, 45, 135, 225, 315],
	};
paletteObj = '';

function setup() {
	features = window.$fxhashFeatures;

	let formatMode = features.format_mode;
	var ua = window.navigator.userAgent;
	var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
	var webkit = !!ua.match(/WebKit/i);
	var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
	console.log(ua);
	console.log(iOS);
	console.log(webkit);
	console.log(iOSSafari);
	// if safari mobile use pixelDensity(2.0) to make the canvas bigger else use pixelDensity(3.0)
	if (iOSSafari) {
		pixelDensity(1.0);
	} else {
		pixelDensity(3.0);
	}
	createCanvas(format[formatMode][0], format[formatMode][1]);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	rectMode(CENTER);

	margin = (width + height) / random([25, 40, 50, 60, 80]);

	let bgHue = random([0, 10, 20, 30, 40, 50]);
	let bgSat = 10;
	let bgBri = features.bg_mode === 'light' ? 100 : 10;
	let bgColor = color(bgHue, bgSat, bgBri);
	background(bgColor);

	let angleArr = angles[features.angle_mode];
	let paletteObj = {
		'80s': [color(44, 96, 100), color(19, 97, 98), color(334, 100, 100), color(265, 76, 93), color(217, 77, 100)],
		'90s': [color(333, 85, 97), color(276, 95, 72), color(258, 93, 64), color(229, 72, 93), color(194, 68, 88)],
		june: [color(199, 56, 90), color(192, 82, 74), color(200, 97, 48), color(43, 99, 100), color(32, 100, 98)],
		mango: [color(196, 69, 92), color(340, 80, 92), color(146, 66, 91), color(29, 98, 92), color(45, 100, 90)],
		traditional: [
			color(223, 80, 75),
			color(145, 100, 60),
			color(43, 88, 85),
			color(16, 81, 85),
			color(1, 96, 85),
			color(334, 75, 75),
		],
		mono: [color(bgHue, bgSat, 10), color(bgHue, bgSat, 90)],
	};

	if (features.palette_mode === 'mono' && features.bg_mode === 'light') {
		paletteObj.mono = [color(bgHue, bgSat, 10)];
	} else if (features.palette_mode === 'mono' && features.bg_mode === 'dark') {
		paletteObj.mono = [color(bgHue, bgSat, 90)];
	}
	let colorArr = paletteObj[features.palette_mode];
	let total_shape_num = features.ellipse_num + features.rectangle_num;

	if (features.border_mode === 'border') {
		strokeWeight(margin);
		stroke(bgHue, bgSat, features.bg_mode == 'light' ? 10 : 100);
		noFill();
		rect(width / 2, height / 2, width - margin, height - margin);
	}

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
				rectDrawn = true;
			}
			if (features.shape_type.includes('ellipse')) {
				const elIntervalId = setInterval(() => {
					if (rectDrawn) {
						createBalls(margin, colorArr, bgColor, rects, total_shape_num);
						clearInterval(elIntervalId);
					}
				}, 100);
			}
		}
	}, 100);
}

function createBalls(margin, colorArr, bgColor, rects, totalShapes) {
	const ballNum = features.ellipse_num;
	const balls = [];

	for (let i = 0; i < ballNum; i++) {
		let tries = 1;
		let ball = new Ball(margin, colorArr, bgColor, ballNum, totalShapes, i + 1, 0);
		let colliding = true;

		do {
			colliding =
				balls.some((b) => collideCircleCircle(ball.x, ball.y, ball.d, b.x, b.y, b.d, true)) ||
				rects.some((r) => collideCirclePoly(ball.x, ball.y, ball.d, r.points, true));

			if (colliding) {
				ball = new Ball(margin, colorArr, bgColor, ballNum, totalShapes, i + 1, ++tries);
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
