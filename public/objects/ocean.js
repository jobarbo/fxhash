class Ocean {
	constructor(topY, baseY) {
		this.topY = topY;
		this.baseY = baseY;
	}
	display() {
		// display the ocean
		strokeWeight(15);
		stroke(0);
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
		for (let i = 0; i < 5; i++) {
			let wave = new Wave(this.topY, this.baseY);
			wave.display();
		}
	}
}

class Wave {
	constructor(top, base) {
		this.xoff = random(1000000);
		this.yoff = random(1000000);
		this.a = 0;
		this.x = 0;
		this.y = random(top, base - 200);
		this.iteration = TWO_PI / 25;
		this.multiplier = 3;
	}
	display() {
		// draw simple wave lines using sin and cos
		strokeWeight(15);
		stroke(0);
		fill(35, 10, 92);

		beginShape();
		let startX = random(50, width - 1450);
		let endX = startX + 1400;
		for (let i = startX; i < endX; i += 10) {
			// make a wave using sin and cos on the y axis only
			this.y = this.y + sin(this.a) * this.multiplier;
			this.a += this.iteration;
			vertex(i, this.y);
		}
		endShape();
	}
}
