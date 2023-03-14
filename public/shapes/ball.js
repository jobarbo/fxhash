class Ball {
	constructor(margin, colorArr, bgHue, ballNum, all_shapes_num, id, tries, r = 0) {
		this.margin = margin;
		this.w_shape = (width / 1.25 - this.margin) / (all_shapes_num / 10 + id) / (tries + 1);
		this.w_shape = constrain(this.w_shape, width / 4 - this.margin, width / 1.5 - this.margin);
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
		this.hue = hue(this.color);
		this.sat = saturation(this.color);
		this.bri = brightness(this.color);
		this.alpha = 100;
		this.margin = margin;
		this.textureDone = false;
		this.runs = this.d * 100;
		this.id = id;
	}

	draw() {
		// draw a preview of the ball
		push();
		translate(this.x, this.y);
		//rotate(this.rotation);
		noStroke();
		fill(this.hue, this.sat, this.bri, this.alpha);
		ellipse(0, 0, this.d, this.d);
		pop();

		this.mask = createGraphics(width, height);
		this.mask.pixelDensity(3);
		this.mask.colorMode(HSB, 360, 100, 100, 100);
		this.mask.background(this.color);

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

				noFill();
				// make the stroke width relative to the size of the circle
				let sw = map(this.d, 0, width - this.margin, 0.25, 3, true);
				let shue = this.hue;
				let ssaturation = this.sat;
				let sbrightness = this.bri - 35;
				let salpha = 50;
				let incr = sw;
				let sElWidth = this.d;
				// slowly reduce the rect size and the stroke alpha to create a gradient effect
				for (let i = 0; i < 50; i++) {
					stroke(shue, ssaturation, sbrightness, salpha);
					strokeWeight(sw);
					ellipse(this.x, this.y, sElWidth - sw, sElWidth - sw);
					salpha = salpha - 1;
					sElWidth = sElWidth - sw;
					sbrightness += 0.5;
				}

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
