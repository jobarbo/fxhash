class Ocean {
	constructor(topY, baseY) {
		this.topY = topY;
		this.baseY = baseY;
	}
	display() {
		// display the ocean
		strokeWeight(15);
		stroke(0, 0, 10, 100);
		fill(180, 70, 100, 0);
		beginShape();
		vertex(-100, this.baseY);
		vertex(-100, this.topY);
		for (let i = 0; i < width; i += 10) {
			vertex(i, this.topY);
		}
		vertex(width + 100, this.topY);
		vertex(width + 100, this.baseY);
		endShape(CLOSE);

		// make multiple waves
		for (let i = 0; i < 3; i++) {
			let wave = new Wave(this.topY, this.baseY);
			wave.display();
		}
	}
}

class Wave {
	constructor(top, base) {
		this.xoff = random(1000000);
		this.yoff = random(1000000);
		this.a = random(0, 360);
		this.x = 0;
		this.y = random(top, base - 200);
		this.iteration = TWO_PI / 25;
		this.multiplier = 3;
	}
	display() {
		// draw simple wave lines using sin and cos
		strokeWeight(15);
		stroke(0, 0, 10, 100);
		noFill();

		beginShape();
		let startX = -50;
		let endX = width + 50;
		for (let i = startX; i < endX; i += 10) {
			// make a wave using sin and cos on the y axis only
			this.y = this.y + sin(this.a) * this.multiplier;
			this.a += this.iteration;
			vertex(i, this.y);
		}
		endShape();
	}
}
