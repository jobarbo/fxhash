let features = '';
let movers = [];
let scl1;
let scl2;
let rseed;
let nseed;
function setup() {
	console.log(features);
	features = $fx.getFeatures();

	let formatMode = features.format_mode;
	var ua = window.navigator.userAgent;
	var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
	var webkit = !!ua.match(/WebKit/i);
	var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

	// if safari mobile use pixelDensity(2.0) to make the canvas bigger else use pixelDensity(3.0)
	if (iOSSafari) {
		pixelDensity(1.0);
	} else {
		pixelDensity(3.0);
	}
	createCanvas(1500, 1500);
	colorMode(HSB, 360, 100, 100, 100);
	rseed = randomSeed(fxrand() * 10000);
	nseed = noiseSeed(fxrand() * 10000);
	INIT(rseed);
}

function draw() {
	// put drawing code here
	for (let i = 0; i < movers.length; i++) {
		movers[i].show();
		movers[i].move();
	}

	if (frameCount > 50) {
		console.log('done');
		noLoop();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	INIT(rseed);
}

function INIT(seed) {
	movers = [];
	scl1 = random(0.0001, 0.01);
	scl2 = random(0.0001, 0.01);
	let hue = random(360);
	for (let i = 0; i < 100000; i++) {
		let x = random(-0.1, 1.1) * width;
		let y = random(-0.1, 1.1) * height;
		movers.push(new Mover(x, y, hue, scl1, scl2, seed));
	}

	background(35, 20, 100);
}
