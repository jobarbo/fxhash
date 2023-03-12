class Ball {
	constructor(margin, colorArr, bgHue, ballNum, all_shapes_num, id, r = 0) {
		this.margin = margin;
		this.w_shape = width / (all_shapes_num / 2 + id) - this.margin;
		console.log(id);
		if (r === 0) {
			this.d = this.w_shape;
			this.r = this.d / 2;
		} else {
			this.r = r;
			this.d = this.r * 2;
		}
		this.x = random(margin + this.r, width - (this.r + margin));
		this.y = random(margin + this.r, height - (this.r + margin));
		this.sHue = bgHue;
		this.color = random(colorArr);
		this.margin = margin;
		this.textureDone = false;
		this.runs = this.d * 100;
		this.mask = createGraphics(width, height);
		this.mask.pixelDensity(3);
		this.mask.colorMode(HSB, 360, 100, 100, 100);
		this.mask.background(this.color);
	}

	draw() {
		// draw a preview of the ball
		push();
		translate(this.x, this.y);
		rotate(this.rotation);
		noStroke();
		fill(this.color);
		ellipse(0, 0, this.d, this.d);
		pop();

		if (!this.textureDone) {
			this.createTexture();
		}
	}

	createTexture() {
		let texture = [];
		// make texture num relative to the size of the rectangle (the width and the height)
		let texture_num = int(map(this.d, 0, width - this.margin, 1, 10, true));

		for (let index = 0; index < texture_num; index++) {
			let rdnX = random(-this.d, this.d);
			let rdnY = random(-this.d, this.d);
			const rdnW1 = random(this.d / 8, this.d / 2);

			texture[index] = new Texture(0, this.x, this.y, this.d, this.d, rdnX, rdnY, rdnW1, this.color, this.mask);
		}
		let sketch_texture = this.drawTexture(texture);
		let interval = setInterval(() => {
			let result = sketch_texture.next();

			if (result.done) {
				this.textureDone = true;
				this.mask.drawingContext.globalCompositeOperation = 'destination-in';
				this.mask.noStroke();
				this.mask.fill(this.color);
				this.mask.ellipse(this.x, this.y, this.r * 2, this.r * 2);

				image(this.mask, 0, 0);

				clearInterval(interval);
			}
		}, 0);
	}

	*drawTexture(texture) {
		let count = 0;
		let draw_every = 1000;
		for (let index = 0; index < texture.length; index++) {
			for (let j = 0; j < this.runs; j++) {
				texture[index].display();
				count++;
				if (count > draw_every) {
					count = 0;
					yield;
				}
			}
		}
	}
}
