function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let bgHue = random([0, 10, 20, 30, 40, 50]);
	background(bgHue, 10, 100);

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

	let margin = 200;

	blendMode(MULTIPLY);

	let balls = [];
	let ballNum = random([1, 2, 5]);
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

	let lines = [];
	let lineNum = random([1, 2, 3]);
	console.log(lineNum);
	for (let i = 0; i < lineNum; i++) {
		lines[i] = new Line(margin, angleArr, colorArr);
		lines[i].draw();
	}

	let rects = [];
	let rectNum = random([1, 2, 4]);
	for (let i = 0; i < rectNum; i++) {
		rects[i] = new Rect(margin, colorArr, angleArr, bgHue);

		// check if the rect is overlapped

		for (let j = 0; j < rects.length; j++) {
			let d = dist(rects[i].x, rects[i].y, rects[j].x, rects[j].y);
			if (d < rects[i].w + rects[j].w && j != i) {
				rects[i].w = rects[i].w / 2;
				rects[i].x = random(margin + rects[i].w, width - (rects[i].w + margin));
				rects[i].y = random(margin + rects[i].w, height - (rects[i].w + margin));
				j = -1;
			}
		}
		rects[i].draw();
	}

	blendMode(BLEND);

	//createTexture(0);
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
		console.log(result);
		if (result.done) {
			clearInterval(interval);
		}
	}, 0);
}

function* drawTexture(texture) {
	console.log('drawTexture');
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
