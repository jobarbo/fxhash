function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(40, 10, 100);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

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
		let r = random(100, 200);
		let x = random(margin + r, width - (r + margin));
		let y = random(margin + r, height - (r + margin));
		// check if the ball is overlapped
		for (let j = 0; j < balls.length; j++) {
			let d = dist(x, y, balls[j].x, balls[j].y);
			if (d < r + balls[j].r) {
				r = random(20, 100, 200);
				x = random(margin + r, width - (r + margin));
				y = random(margin + r, height - (r + margin));
				j = -1;
			}
		}
		let ball = new Ball(x, y, r, colorArr);
		balls[i] = ball;
		balls[i].draw();
	}

	let lines = [];
	let lineNum = random([1, 2, 3, 5, 6]);
	for (let i = 0; i < lineNum; i++) {
		let l = random(100, 600);
		let x = random(margin, width - margin);
		let y = random(margin, height - margin);
		// check if the line is overlapped, if the line overlaps the ball and if the line is too close to the edge
		for (let j = 0; j < lines.length; j++) {
			let d = dist(x, y, lines[j].x, lines[j].y);
			if (d < l / 2 + lines[j].l / 2) {
				l = random(100, 600);
				x = random(margin, width - margin);
				y = random(margin, height - margin);
				j = -1;
			}
		}

		let line = new Line(x, y, l, angleArr, colorArr);
		lines[i] = line;
		lines[i].draw();
	}

	let rects = [];
	let rectNum = random([1, 2, 4]);
	for (let i = 0; i < rectNum; i++) {
		let w = random(100, 400);
		let h = w / 2;
		let x = random(margin, width - margin);
		let y = random(margin, height - margin);
		// check if the rect is overlapped, if the rect overlaps the ball and if the rect is too close to the edge
		for (let j = 0; j < rects.length; j++) {
			let d = dist(x, y, rects[j].x, rects[j].y);
			if (d < w / 2 + rects[j].w / 2) {
				w = random(100, 400);
				h = random([w, w / 2]);
				x = random(margin, width - margin);
				y = random(margin, height - margin);
				j = -1;
			}
		}

		let rect = new Rect(x, y, w, h, angleArr, colorArr);
		rects[i] = rect;
		rects[i].draw();
	}

	blendMode(BLEND);

	createTexture(0);
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
		for (let j = 0; j < 10500; j++) {
			texture[index].display();
			count++;
			if (count > draw_every) {
				count = 0;
				yield;
			}
		}
	}
}

class Ball {
	constructor(x, y, r, colorArr) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = random(colorArr);
	}

	draw() {
		fill(this.color);
		noStroke();
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
}

class Line {
	constructor(x, y, l, angleArr, colorArr) {
		this.x = x;
		this.y = y;
		this.l = l;
		this.angles = angleArr;
		this.color = random(colorArr);
	}

	draw() {
		push();
		translate(this.x, this.y);
		rotate(radians(random(this.angles)));
		strokeCap(SQUARE);
		strokeWeight(random([5, 10, 15, 20, 30]));
		fill(this.color);
		stroke(this.color);
		line(-this.l / 2, 0, this.l / 2, 0);
		pop();
	}
}

class Rect {
	constructor(x, y, w, h, angleArr, colorArr) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.angles = angleArr;
		this.color = random(colorArr);
	}

	draw() {
		push();
		translate(this.x, this.y);
		rotate(radians(random(this.angles)));

		fill(this.color);
		noStroke();
		rect(-this.w / 2, -this.h / 2, this.w, this.h);
		pop();
	}
}
