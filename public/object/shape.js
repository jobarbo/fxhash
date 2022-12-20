class Shape {
	constructor(shape_type, pp_offset_x, pp_offset_y) {
		//! GET THE SHAPE WITH DISTANCE MAYBE SO WE CAN DRAW DOTS FOR POST PROCESSING
		this.type = shape_type;
		this.post_processing = post_processing;
		this.offset_x = pp_offset_x;
		this.offset_y = pp_offset_y;
		this.position_vector_array = [];
	}

	drawShape() {
		// make a switch statement for each shape type

		noStroke();
		switch (this.type) {
			case 'circle':
				this.drawCircle();
				break;
			case 'square':
				this.drawSquare();
				break;
			case 'triangle':
				this.drawTriangle();
				break;
			default:
				this.drawCircle();
				break;
		}
	}

	drawCircle() {
		if (this.post_processing) {
			fill(200, 100, 100, 100);
			ellipse(width / 2 + this.offset_x, height / 2 + this.offset_y, width / 3, height / 3);
			fill(0, 100, 100, 100);
			ellipse(width / 2 - this.offset_x, height / 2 - this.offset_y, width / 3, height / 3);
			fill(0, 0, 0, 100);
			ellipse(width / 2, height / 2, width / 3, height / 3);
		} else {
			fill(0, 0, 0, 100);
			ellipse(width / 2, height / 2, width / 3, height / 3);
		}
	}

	drawSquare() {
		if (this.post_processing) {
			fill(200, 100, 100, 100);
			rect(width / 2 + this.offset_x, height / 2 + this.offset_y, width / 3, height / 3);
			fill(0, 100, 100, 100);
			rect(width / 2 - this.offset_x, height / 2 - this.offset_y, width / 3, height / 3);
			fill(0, 0, 0, 100);
			rect(width / 2, height / 2, width / 3, height / 3);
		} else {
			fill(0, 0, 0, 100);
			rect(width / 2, height / 2, width / 3, height / 3);
		}
	}

	drawTriangle() {
		let v1 = createVector(width / 2 - 250, 650);
		let v2 = createVector(width / 2, 250);
		let v3 = createVector(width / 2 + 250, 650);
		if (this.post_processing) {
			fill(200, 100, 100, 100);
			triangle(v1.x + this.offset_x, v1.y + this.offset_y, v2.x + this.offset_x, v2.y + this.offset_y, v3.x + this.offset_x, v3.y + this.offset_y);
			fill(0, 100, 100, 100);
			triangle(v1.x - this.offset_x, v1.y - this.offset_y, v2.x - this.offset_x, v2.y - this.offset_y, v3.x - this.offset_x, v3.y - this.offset_y);
			fill(0, 0, 0, 100);
			triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
		} else {
			fill(0, 0, 0, 100);
			triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
		}
	}
}
