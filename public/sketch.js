let features = '';
let rectTexture = '';
let elTexture = '';
let rects = [];
let balls = [];

function preload() {
	rectTexture = loadImage('image/texture2.png');
	elTexture = loadImage('image/el_texture.png');
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
	let margin = width / 10;
	//blendMode(blndMode);

	// if features.shape_type substring contains 'line' and 'rectangle'
	if (features.shape_type.includes('line') || features.shape_type.includes('rectangle')) {
		createRectangles(margin, colorArr, angleArr, bgHue, features.shape_type, features.line_num, features.rectangle_num);
	}
	// create balls
	// check if features.shape_type substring contains 'ellipse'
	if (features.shape_type.includes('ellipse')) {
		createBalls(margin, colorArr, bgHue, rects);
	}
}

function createBalls(margin, colorArr, bgHue, rects) {
	let rectArr = rects;
	let ballNum = features.ellipse_num;
	for (let i = 0; i < ballNum; i++) {
		let ball = new Ball(margin, colorArr, bgHue, elTexture);
		let tries = 0;
		let collided = true;
		while (collided && tries < 1000) {
			collided = false;
			if (rectArr.length > 0) {
				for (let j = 0; j < rectArr.length; j++) {
					if (collideCirclePoly(ball.x, ball.y, ball.d, rectArr[j].points, true)) {
						collided = true;
						break;
					}
				}
			}
			for (let j = 0; j < i; j++) {
				if (collideCircleCircle(ball.x, ball.y, ball.d, balls[j].x, balls[j].y, balls[j].d)) {
					collided = true;
					break;
				}
			}
			if (collided) {
				ball = new Ball(margin, colorArr, bgHue, elTexture);
				tries++;
			}
		}
		if (tries >= 1000) {
			ball = new Ball(margin, colorArr, bgHue, elTexture, 25, 2);
		}
		balls.push(ball);
		ball.draw();
	}
}

function createRectangles(margin, colorArr, angleArr, bgHue, rectType, line_num = 0, rect_num = 0) {
	let type = rectType;
	let rectNum = rect_num;
	let lineNum = line_num;

	// if rectType does not contain 'line'
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
		rects[i] = new Rect(margin, colorArr, angleArr, bgHue, rectTexture, type);
		// check if the rect is overlapped

		let tries = 0;
		for (let j = 0; j < rects.length; j++) {
			if (i != j) {
				hit = collidePolyPoly(rects[i].points, rects[j].points, true);
				if (hit) {
					// replace the rect elsewhere on the canvas
					if (tries > 1000) {
						rects[i] = new Rect(margin, colorArr, angleArr, bgHue, rectTexture, type, 25, 2);
					} else {
						rects[i] = new Rect(margin, colorArr, angleArr, bgHue, rectTexture, type);
						j = -1;
						tries++;
					}
				}
			}
		}

		rects[i].draw();
	}
}

function createTexture() {
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
