let features = '';

let rects = [];
let balls = [];
let bgTextureDone = false;

function setup() {
	features = window.$fxhashFeatures;
	pixelDensity(1);
	createCanvas(2000, 2000);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let bgHue = random([0, 10, 20, 30, 40, 50]);
	let bgSat = 10;
	let bgBri = features.bg_mode === 'light' ? 100 : 15;
	let bgColor = color(bgHue, bgSat, bgBri);
	background(bgColor);
	// Apply transparency without changing color
	let basecolor = features.bg_mode === 'light' ? color(0, 0, 10) : color(0, 10, 100);

	let angleArr = [0, 45, 90, 135, 180, 225, 270, 315];
	let colorArr = [color(155, 94, 40), color(45, 100, 80), color(206, 98, 50), color(350, 97, 73)];
	let margin = 0;

	// shape_num is the number of shapes that are selected in the feature selection
	let total_shape_num = features.ellipse_num + features.rectangle_num;

	// create textures
	createTexture(bgColor);

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
					bgHue,
					features.shape_type,
					features.line_num,
					features.rectangle_num,
					total_shape_num
				);
			}
			// create balls
			// check if features.shape_type substring contains 'ellipse'
			if (features.shape_type.includes('ellipse')) {
				createBalls(margin, colorArr, bgHue, rects, total_shape_num);
			}
			//blendMode(BLEND);
		} else {
			console.log('drawing textures...');
		}
	}, 100);
}

function createBalls(margin, colorArr, bgHue, rects, total_shape_num) {
	let rectArr = rects;
	let ballNum = features.ellipse_num;
	let all_shapes_num = total_shape_num;
	let balls = [];
	let hit_ball = false;
	let hit_rect = false;
	for (let i = 0; i < ballNum; i++) {
		let ball = new Ball(margin, colorArr, bgHue, ballNum, all_shapes_num, i + 1);
		let tries = 0;
		while (tries < 500) {
			hit_ball = false;
			hit_rect = false;
			for (let j = 0; j < balls.length; j++) {
				if (collideCircleCircle(ball.x, ball.y, ball.d, balls[j].x, balls[j].y, balls[j].d)) {
					hit_ball = true;
					break;
				}
			}
			if (!hit_ball) {
				for (let j = 0; j < rectArr.length; j++) {
					if (collideCirclePoly(ball.x, ball.y, ball.d, rectArr[j].points)) {
						hit_rect = true;
						break;
					}
				}
			}
			if (!hit_ball && !hit_rect) {
				break;
			} else {
				ball = new Ball(margin, colorArr, bgHue, ballNum, all_shapes_num, i + 1);
				tries++;
			}
		}
		if (tries >= 500) {
			ball = new Ball(margin, colorArr, bgHue, ballNum, all_shapes_num, i + 1, 0, 0);
		}
		balls.push(ball);
		ball.draw();
	}
}

function createRectangles(margin, colorArr, angleArr, bgHue, rectType, line_num = 0, rect_num = 0, total_shape_num) {
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
		if (i < lineNum) {
			type = 'line';
		} else {
			type = 'rectangle';
		}
		rects[i] = new Rect(margin, colorArr, angleArr, bgHue, type, rectNum, all_shapes_num, i + 1);
		// check if the rect is overlapped

		let tries = 0;
		for (let j = 0; j < rects.length; j++) {
			if (i != j) {
				hit = collidePolyPoly(rects[i].points, rects[j].points, true);
				if (hit) {
					// replace the rect elsewhere on the canvas
					if (tries > 1000) {
						rects[i] = new Rect(margin, colorArr, angleArr, bgHue, type, rectNum, all_shapes_num, i + 1, 0, 0);
					} else {
						rects[i] = new Rect(margin, colorArr, angleArr, bgHue, type, rectNum, all_shapes_num, i + 1);
						j = -1;
						tries++;
					}
				}
			}
		}

		rects[i].draw();
	}
}

function createTexture(bgColor) {
	let texture = [];

	for (let index = 0; index < 1000; index++) {
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
	let draw_every = 10000;
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 2000; j++) {
			texture[index].display();
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
}
