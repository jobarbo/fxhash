let rows = 40;
let rowSpacing = 30;
let margin = 50;
function setup() {
	pixelDensity(2.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(40, 5, 10);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	// calculate how many rows we can fit in the canvas according to the margin and rowSpacing
	rows = floor((height - 2 * margin) / rowSpacing);
	rowSpacing = (height - 2 * margin) / rows;

	// create a track for each row
	for (let i = 0; i < rows; i++) {
		let trackY = margin + i * rowSpacing;
		let track = new Track(trackY, rowSpacing, margin);
		track.draw();
		while (track.x < width - margin) {
			track.move();
			track.display();
		}
	}
}

function draw() {}

class Track {
	constructor(trackY, rowSpacing, margin) {
		this.trackY = trackY;
		this.y = trackY + rowSpacing / 2;
		this.headY = 0;
		this.w = width;
		this.h = rowSpacing;
		this.x = margin;
		this.xoff = random(1000);
		this.poff = random(1000);
		this.nHead = 0;
		this.isPlaying = false;
		this.isVertical = false;
	}

	draw() {
		// draw the track
		stroke(220, 100, 100);
		strokeWeight(2);
		noFill();
		//line(this.x, this.trackY, width - margin, this.trackY);
		//line(this.x, this.trackY + this.h, width - margin, this.trackY + this.h);
	}
	display() {
		// display the track head
		let nScript = random(-noise(this.x / 100, this.poff) * this.h, noise(this.x / 100, this.poff) * this.h);
		if (this.nHead > 0.5 && !this.isPlaying) {
			// get the head position and keep it until false
			this.headY = this.y;
			this.isPlaying = true;
			this.isVertical = random(1) > 0.7;
		} else if (this.nHead < 0.5 && this.isPlaying) {
			this.isPlaying = false;
		}
		if (this.isPlaying) {
			if (this.isVertical) {
				let rd = map(noise(this.x, this.xoff) * 1, 0, 1, 0, 1);
				stroke(40, 20, 90);
				strokeWeight(1);
				if (rd > 0.5) {
					line(this.x, this.y, this.x, this.y - nScript);
					if (this.x < width - margin * 2) {
						line(this.x, this.y - nScript, this.x + random(10, 50), this.y - nScript);
					}
					this.isVertical = false;
				} else {
					noFill();
					strokeWeight(2);
					line(this.x, this.y, this.x, this.y - (noise(this.x / 100, this.poff) * this.h) / 2);
				}
			} else {
				stroke(40, 20, 90);
				strokeWeight(3);
				noFill();
				point(this.x, this.headY);
			}
		}
	}

	move() {
		// move the track
		this.x += random(2);
		this.y = map(noise(this.x / 100, this.xoff), 0, 1, this.trackY, this.trackY + this.h);
		this.nHead = map(noise(this.x / 100, this.poff), 0, 1, 0, 1);
		this.xoff += 0.01;
		this.poff += 0.05;
	}
}
