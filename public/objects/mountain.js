class Mountain {
	constructor(mtnY, topY, baseY) {
		this.y = mtnY;
		this.baseY = baseY;
		this.topY = topY;
		this.yoff = random(1000000);
		this.xoff = random(1000000);
		this.iteration = n3(this.xoff, this.yoff, 2.5, 1);
		this.multiplier = random(10, 20);
	}

	display() {
		// draw a mountain using multiple vertices
		strokeWeight(15);
		stroke(0, 0, 10, 100);
		fill(0, 0, 10, 100);
		beginShape();

		vertex(-100, this.baseY);
		vertex(-100, this.y);
		for (let i = 0; i < width; i += 10) {
			this.iteration = n3(this.xoff, this.yoff, 10.005, 1) * this.multiplier;
			this.x = i;
			this.y += this.iteration;
			this.yoff += 0.01;
			this.xoff += 0.01;
			if (this.y >= this.baseY) {
				// leave the loop if the mountain reaches the base
				console.log('break', `this.y: ${this.y}`, `this.baseY: ${this.baseY}`);
				console.log(this.iteration);
				this.y = this.baseY;
				vertex(i, this.y);
			} else {
				vertex(i, this.y);
				console.log(this.iteration);
			}
		}

		vertex(width + 100, this.y);
		vertex(width + 100, this.baseY);

		endShape(CLOSE);
	}
}
