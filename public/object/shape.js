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
		fill(0, 0, 0, 100);
		ellipse(width / 2, height / 2, width / 2.5, height / 2.5);
	}

	drawSquare() {
		fill(0, 0, 0, 100);
		rect(width / 2, height / 2, width / 2.5, height / 2.5);
	}

	drawTriangle() {
		let v1 = createVector(width / 2 - 250, 700);
		let v2 = createVector(width / 2, 300);
		let v3 = createVector(width / 2 + 250, 700);

		fill(0, 0, 0, 100);
		triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
	}
}
