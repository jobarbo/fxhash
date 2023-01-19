let R = (a = 1) => Math.random() * a; // custom random function

let L = (x, y) => (x * x + y * y) ** 0.5; //

let xOff = 0;
let yOff = 0.5;
let cr = 0.3;

function setup() {
	pixelDensity(2.0);
	createCanvas(1500, 1500);
	colorMode(HSB, 360, 100, 100, 100);
	background(0, 0, 10);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
}

function draw_circle([x, y], r, c) {
	//xy is positon
	//r is radius
	//c is color
	lxa = ((x + 1) * width) / 2;
	lya = ((y + 1) * height) / 2;
	lxb = lxa + random(-15, 15);
	lyb = lya + random(-15, 15);

	fill(c);
	stroke(c);
	strokeWeight(random(0.01, 3));

	circle(lxa, lya, 4);
	line(lxa, lya, lxb, lyb);
}

function sdf_circle([x, y], [cx, cy], r) {
	x -= cx;
	y -= cy;
	return L(x, y) - r;
}

function sdf([x, y], n) {
	let bal = sdf_circle([x, y], [0, 0], 0.02);
	let mx = map(mouseX, 0, width, -1, 1);
	let my = map(mouseY, 0, height, -1, 1);
	let lin = -y + 0.4;
	let lin2 = -y + 0.5;
	bal = bal - abs(n);
	bal = abs(bal) - n * n;
	bal = constrain(bal, -1, 1);
	return lin + bal * -100;
}

function draw() {
	for (let k = 0; k < 2000; k++) {
		let p = [R(2) - 1, R(2) - 1];
		let n = n3(xOff, yOff, 0.01, 2);

		let d = sdf(p, n);
		//let d = map(sdf(p), -cr, 1 + cr, 0, 1);
		// map d from -cr to 1+cr to 0 to 1

		let col = color(0, 0, 10);
		if (d < -0.011) {
			col = color(120, 0, 10);
		}
		if (d > -0.01) {
			col = color(100 * n, 100, 100);
		}

		draw_circle(p, 2, col);
		yOff += 0.00001;
	}
	xOff += 0.1;
}
