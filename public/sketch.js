// import p5 sound
let mic;
let xoff;
let yoff;
let woff;
let hoff;
let hue;
let agentsArray = [];
let agentsNumber = 1000;
function setup() {
	pixelDensity(3.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 12);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);
	mic = new p5.AudioIn();

	// if the user clicks the canvas, let's get the audio input
	userStartAudio().then(function () {
		mic.start();
	});
	// create agents
	hue = random(360);
	for (let i = 0; i < agentsNumber; i++) {
		xoff = random(1);
		yoff = random(1);
		woff = random(1);
		hoff = random(1);

		agentsArray[i] = new Agent(xoff, yoff, woff, hoff, hue, mic, i);
	}
}

function draw() {
	vol = mic.getLevel();
	for (let i = 0; i < agentsNumber; i++) {
		agentsArray[i].display();
		agentsArray[i].move(vol);
	}
}

// Agent class
class Agent {
	constructor(xoff, yoff, woff, hoff, hue, mic, i) {
		this.mic = mic;

		this.elx = random(width);
		this.ely = random(height);
		this.elw = random(0.1, 1);
		this.elh = hue;
		this.elhInit = hue;
		this.xoff = xoff;
		this.yoff = yoff;
		this.woff = woff;
		this.hoff = hoff;
	}

	display() {
		noStroke();
		fill(this.elh, 100, 100, 10);
		ellipse(this.elx, this.ely, this.elw, this.elw);
	}

	move(vol) {
		this.elx = map(noise(this.xoff), 0, 1, 0, width);
		this.ely = map(noise(this.yoff), 0, 1, 0, height);
		this.elw = map(noise(this.woff), 0, 1, 0.1, 2);
		this.elh = this.elhInit + map(noise(this.hoff), 0, 1, -15, 15);
		this.xoff += map(vol, 0.01, 0.4, 0.001, 0.4, true);
		this.yoff += map(vol, 0.01, 0.4, 0.001, 0.4, true);
		this.woff += map(vol, 0.01, 0.4, 0.001, 10, true);
		this.hoff += map(vol, 0, 1, 0.0001, 0.4);
	}

	checkEdges() {
		if (this.x > width) {
			this.x = 0;
		} else if (this.x < 0) {
			this.x = width;
		}
		if (this.y > height) {
			this.y = 0;
		} else if (this.y < 0) {
			this.y = height;
		}
	}
}
