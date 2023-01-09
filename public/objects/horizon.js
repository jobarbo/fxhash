// this class create the horizon line
// the horizon line is drawn from the left to the right of the screen
// there is multiple vector points that are used to draw the line
// each vector point position is calculated using the noise function

class Horizon {
	constructor() {
		this.startX = -150;
		this.endX = width + 150;
		this.startY = height / 2;
		this.endY = height + 150;
		this.hue = 35;
		this.saturation = 6;
		this.brightness = 100;
		this.points;
	}

	init() {
		this.points = [];
		for (let x = this.startX; x < this.endX; x += 250) {
			// use the noise function to calculate the y position of the vector point from n3() function in the file public/library/utils/piterNoise.js
			let n = n3(x, 0, 19, 3) * 100;
			let y = this.startY + n;
			this.points.push(createVector(x, y));
		}
	}

	// this function is called in the draw function of the sketch
	// it draws the horizon line
	draw() {
		strokeWeight(0);
		fill(this.hue, this.saturation, this.brightness);
		stroke(this.hue, this.saturation, this.brightness - 10);
		beginShape();
		vertex(this.startX, this.endY);
		vertex(this.startX, this.startY);
		for (let i = 0; i < this.points.length; i++) {
			// use the noise function to calculate the y position of the vector point from n3() function in the file public/library/utils/piterNoise.js

			curveVertex(this.points[i].x, this.points[i].y);
		}

		vertex(this.endX, this.startY);
		vertex(this.endX, this.endY);
		endShape(CLOSE);
	}

	getPoints() {
		return this.points;
	}
}
