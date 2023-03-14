let features = '';

let rects = [];
let balls = [];
let bgTextureDone = false;
let rectDrawn = false;

let margin = 0;

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
	// Apply transparency without changing color
	let basecolor = features.bg_mode === 'light' ? color(0, 0, 10) : color(0, 10, 100);

	let angleArr = [0, 45, 90, 135, 180, 225, 270, 315];
	let colorArr = [color(155, 94, 40), color(45, 100, 80), color(206, 98, 50), color(350, 97, 73)];
	margin = width / 10;

	// shape_num is the number of shapes that are selected in the feature selection
	let total_shape_num = features.ellipse_num + features.rectangle_num;

	// draw the border
	noStroke();
	if (features.bg_mode == 'light') {
		fill(bgHue, 0, 10);
	} else {
		fill(bgHue, bgSat, 100);
	}

	rect(width / 2, height / 2, width - margin, height - margin);

	// create textures
	//createTexture(bgColor);
	bgTextureDone = true;
	// only start drawing the shapes once the textures are done

	const intervalId = setInterval(() => {
		if (bgTextureDone) {
			// stop the interval and start drawing the shapes
			clearInterval(intervalId);
			//blendMode(OVERLAY);
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
			// create balls
			// check if features.shape_type substring contains 'ellipse'
			if (features.shape_type.includes('ellipse')) {
				const elIntervalId = setInterval(() => {
					if (rectDrawn) {
						createBalls(margin, colorArr, bgHue, rects, total_shape_num);
						clearInterval(elIntervalId);
					}
				}, 1000);
			}
		} else {
			// keep checking
		}
	}, 100);
}

function createBalls(margin, colorArr, bgHue, rects, total_shape_num) {
	let rectArr = rects;
	console.log(rectArr);
	let ballNum = features.ellipse_num;
	let all_shapes_num = total_shape_num;
	let balls = [];

	for (let i = 0; i < ballNum; i++) {
		let ball = new Ball(margin, colorArr, bgHue, ballNum, all_shapes_num, i + 1, 0);

		// check for collisions with other shapes
		let colliding = true;
		let tries = 0;
		let collidingType = '';

		while (colliding) {
			colliding = false;

			if (!colliding) {
				// check for collisions with other ellipses
				for (let j = 0; j < balls.length; j++) {
					if (collideCircleCircle(ball.x, ball.y, ball.d, balls[j].x, balls[j].y, balls[j].d, true)) {
						colliding = true;
						collidingType = 'ellipse';
						break;
					}
				}
			}

			if (!colliding) {
				// check for collisions with rectangles
				for (let j = 0; j < rectArr.length; j++) {
					if (collideCirclePoly(ball.x, ball.y, ball.d, rectArr[j].points, true)) {
						colliding = true;
						collidingType = 'rectangle';
						break;
					}
				}
			}

			// if there's a collision, move the ellipse to a new position
			if (colliding) {
				ball = new Ball(margin, colorArr, bgHue, ballNum, all_shapes_num, i + 1, tries);
				tries++;
			}
		}

		balls.push(ball);

		ball.draw();
	}
}

function createRectangles(margin, colorArr, angleArr, bgColor, rectType, line_num = 0, rect_num = 0, total_shape_num) {
	let type = rectType;
	let rectNum = rect_num;
	let lineNum = line_num;

	let all_shapes_num = total_shape_num;

	// if rectType doenpms not contain 'line'
	if (!rectType.includes('line')) {
		lineNum = 0;
	}
	// if rectType does not contain 'rectangle'
	if (!rectType.includes('rectangle')) {
		rectNum = 0;
	}

	let totalNum = rectNum + lineNum;

	for (let i = 0; i < totalNum; i++) {
		if (i < rectNum) {
			type = 'rectangle';
		} else {
			type = 'line';
		}

		let tries = 0;
		rects[i] = new Rect(margin, colorArr, angleArr, bgColor, type, rectNum, all_shapes_num, i + 1, tries);

		for (let j = 0; j < rects.length; j++) {
			if (i != j) {
				let hit = collidePolyPoly(rects[i].points, rects[j].points, true);

				if (hit) {
					// replace the rect elsewhere on the canvas
					if (tries > 1000) {
						rects[i] = new Rect(margin, colorArr, angleArr, bgColor, type, rectNum, all_shapes_num, i + 1, tries, 0, 0);
					} else {
						rects[i] = new Rect(margin, colorArr, angleArr, bgColor, type, rectNum, all_shapes_num, i + 1, tries);
						j = -1;
						tries++;
					}
				}
			}
		}

		rects[i].draw();
	}
	console.log(`rect drawn`);
	rectDrawn = true;
}

function createTexture(bgColor) {
	let texture = [];

	for (let index = 0; index < 20; index++) {
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
			clearInterval(interval);
		}
	}, 0);
}

function* drawTexture(texture) {
	let count = 0;
	let draw_every = 1000;
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 100000; j++) {
			texture[index].display();
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
}
