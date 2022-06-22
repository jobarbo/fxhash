let sun;
let haze;
let ocean;

function setup() {
	createCanvas(window.innerHeight, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 100);

	randomSeed(fxrand() * 100000);
	noiseSeed(fxrand() * 100000);
	bgHue = random(0, 360);
	hazeHue = bgHue;
	background(bgHue, 50, 100);

	sun = new Sun(hazeHue);
	sun.display();

	ocean = new Ocean(hazeHue);
	ocean.display();

	haze = new Haze(hazeHue);
	haze.display();
}

class Haze {
	constructor(hazeHue) {
		this.hue = hazeHue;
		this.yoff = 0.1;
		this.xoff = 0.2;
		this.hoff = 0.1;
		this.minY = height / 2 + 200;
		this.maxY = height / 1.95 + 200;
		this.strokeSat = 30;
		this.strokeBright = 100;
		this.strokeAlpha = 0.0;
		this.fillSat = 0;
		this.fillBright = 0;
		this.fillAlpha = 0;
		this.limit = 0;
		this.bgHue = 0;
	}
	display() {
		while (this.minY > 0) {
			strokeWeight(2);
			// We are going to draw a polygon out of the wave points
			beginShape();
			noFill();

			this.xoff = 0.2;
			// Option #1: 2D Noise
			// let xoff = seaYoff; // Option #2: 1D Noise

			// Iterate over horizontal pixels
			for (let x = -100; x <= width + 100; x += 5) {
				// Calculate a y value according to noise, map to

				// Option #1: 2D Noise
				let y = map(noise(this.xoff, this.yoff), 0, 1, this.minY, this.maxY);
				let h = map(noise(this.yoff, this.hoff + this.xoff), 0, 1, this.hue - 30, this.hue + 30);
				// Option #2: 1D Noise
				//let h = map(noise(seaHoff), 0, 1, 170, 240);
				stroke(h, this.strokeSat, this.strokeBright, this.strokeAlpha);
				// Set the vertex
				if (this.minY > 0) {
					curveVertex(x, y);
					this.xoff += 0.01;
					this.hoff += 0.00002;
					this.minY -= 0.001;
					this.maxY -= 0.00115;
					if (this.strokeSat < 20) {
						this.strokeSat += 0.0005;
					}
					if (this.strokeBright > 75) {
						this.strokeBright -= 0.000003;
					}
					if (this.strokeAlpha < 100) {
						let strokeAlphaTimeline = map(this.minY, height / 2 + 200, 0, 0, 100);
						if (strokeAlphaTimeline < 30) {
							this.strokeAlpha += 0.000125;
						} else {
							this.strokeAlpha -= 0.000155;
						}
					}
				}

				// Increment x dimension for noise
			}
			// increment y dimension for noise
			this.yoff += 0.004;
			vertex(width + 100, -100);
			vertex(-100, -100);
			endShape(CLOSE);
		}
	}
}

class Ocean {
	constructor(hazeHue) {
		this.xoff = 0;
		this.yoff = 0.1;
		this.hueoff = 0.1;
		this.minY = height / 2;
		this.maxY = height / 1.95;
		this.hue = hazeHue;
		this.strokeSat = 20;
		this.strokeBright = 100;
		this.strokeAlpha = 0.001;
		this.fillSat = 60;
		this.fillBright = 100;
		this.fillAlpha = 0.001;
	}
	display() {
		while (this.minY < height) {
			strokeWeight(2);
			// We are going to draw a polygon out of the wave points
			beginShape();
			noFill();
			this.xoff = 0;
			// Option #1: 2D Noise
			// let xoff = seaYoff; // Option #2: 1D Noise

			// Iterate over horizontal pixels
			for (let x = -100; x <= width + 100; x += 5) {
				// Calculate a y value according to noise, map to

				// Option #1: 2D Noise
				let y = map(noise(this.xoff, this.yoff), 0, 1, this.minY, this.maxY);
				let h = map(noise(this.yoff, this.hueoff + this.xoff), 0, 1, 160, 230);

				// Option #2: 1D Noise
				//let h = map(noise(seaHoff), 0, 1, 170, 240);
				stroke(this.hue, this.strokeSat, this.strokeBright, this.strokeAlpha);
				fill(h, this.fillSat, this.fillBright, this.fillAlpha);
				// Set the vertex
				if (this.minY < height) {
					curveVertex(x, y);
					this.xoff += 0.01;
					this.hueoff += 0.000012;
					this.minY += 0.001;
					this.maxY += 0.00115;
					if (this.strokeSat < 20) {
						this.strokeSat += 0.0005;
					}
					if (this.strokeBright > 75) {
						this.strokeBright -= 0.000003;
					}
					if (this.strokeAlpha < 5) {
						this.strokeAlpha += 0.0003;
					}
					if (this.fillSat < 70) {
						this.fillSat += 0.0005;
					}
					if (this.fillBright > 70) {
						this.fillBright -= 0.001;
					}
					if (this.fillAlpha < 10) {
						this.fillAlpha += 0.00015;
					}
				}

				// Increment x dimension for noise
			}
			// increment y dimension for noise
			this.yoff += 0.004;
			vertex(width + 100, height + 100);
			vertex(-100, height + 100);
			endShape(CLOSE);
		}
	}
}

class Sun {
	constructor(hazeHue) {
		this.sunSize = random(150, 400);
		this.sunX = random(this.sunSize, width - this.sunSize);
		this.sunY = random(this.sunSize, height / 2 - this.sunSize);
		this.sunHue = hazeHue;
		this.sunSat = random(5, 25);
		this.sunBright = 100;
		this.sunAlpha = random(60, 95);
	}

	display() {
		noStroke();
		fill(this.sunHue, this.sunSat, this.sunBright, this.sunAlpha);
		ellipse(this.sunX, this.sunY, this.sunSize, this.sunSize);
	}
}
