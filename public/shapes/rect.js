class Rect {
	constructor(margin, colorArr, angleArr, bgHue, rectType, rectNum, w = 0, h = 0) {
		this.type = rectType;
		if (this.type === 'rectangle') {
			if (w === 0 && h === 0) {
				// make the rectangle a random size but always 16:9 ratio
				this.ratio = random([1 / 1, 1 / 2, 3 / 4, 9 / 16, 10 / 16]);
				this.w = random(width / 10, width / 2);
				this.h = this.w * this.ratio;
			} else {
				this.ratio = w / h;
				this.w = w;
				this.h = h;
			}
		} else {
			if (w === 0 && h === 0) {
				this.ratio = random([1 / 30, 1 / 40, 1 / 20, 1 / 50]);
				this.w = random(width / 5, width / 3);
				this.h = this.w * this.ratio;
			} else {
				this.ratio = w / h;
				this.w = w;
				this.h = h;
			}
		}
		this.x = random(margin, width - margin);
		this.y = random(margin, height - margin);
		this.sHue = bgHue;
		this.rotation = radians(random(angleArr));
		this.color = random(colorArr);
		this.padding = 0;
		this.center = createVector(this.x, this.y);

		this.mask = '';
		this.textureDone = false;
		this.runs = this.h * 100;

		// store the 4 corners of the rectangle
		this.top_left = createVector(this.x - this.w / 2, this.y - this.h / 2);
		this.top_right = createVector(this.x + this.w / 2, this.y - this.h / 2);
		this.bottom_right = createVector(this.x + this.w / 2, this.y + this.h / 2);
		this.bottom_left = createVector(this.x - this.w / 2, this.y + this.h / 2);
		this.points = [this.top_left, this.top_right, this.bottom_right, this.bottom_left];

		// store the left and right x positions of the rectangle
		this.left = this.x - this.w / 2;
		this.right = this.x + this.w / 2;
		// store the top and bottom y positions of the rectangle
		this.top = this.y - this.h / 2;
		this.bottom = this.y + this.h / 2;

		// rotate each point around the center of the rectangle
		for (let i = 0; i < 4; i++) {
			this.points[i] = this.rotatePoint(this.points[i], this.center, this.rotation);
		}

		// create a new canvas graphics the same size as the canvas to draw textures on
		this.mask = createGraphics(width, height);
		this.mask.pixelDensity(3);
		this.mask.colorMode(HSB, 360, 100, 100, 100);
		this.mask.background(this.color);
	}

	draw() {
		// draw a preview of the rectangle

		push();
		translate(this.x, this.y);
		rotate(this.rotation);
		noStroke();
		fill(this.color);
		rectMode(CENTER);
		rect(0, 0, this.w, this.h);
		pop();

		// run the createTexture function and wait for this.textureDone to be true to continue executing the rest of the code, this is to prevent the rest of the code from running before the texture is done being drawn
		if (!this.textureDone) {
			this.createTexture();
		}
	}

	rotatePoint(point, center, angle) {
		// translate point to origin
		point.sub(center);

		// rotate point
		point.rotate(angle);

		// translate point back to original position
		point.add(center);

		return point;
	}

	createTexture() {
		let texture = [];
		// make texture num relative to the size of the rectangle (the width and the height)
		let texture_num = int(map(this.w, 0, width, 1, 10));
		console.log(texture_num);
		this.mask.push();
		this.mask.translate(this.x, this.y);
		this.mask.rotate(this.rotation);
		for (let index = 0; index < texture_num; index++) {
			let rdnX = random(-this.w, this.w);
			let rdnY = random(-this.w, this.w);
			const rdnW1 = random(this.w / 8, this.w / 2);

			texture[index] = new Texture(this.rotation, 0, 0, this.w, this.h, rdnX, rdnY, rdnW1, this.color, this.mask);
		}
		let sketch_texture = this.drawTexture(texture);
		let interval = setInterval(() => {
			let result = sketch_texture.next();
			if (result.done) {
				this.mask.noStroke();
				this.textureDone = true;
				this.mask.drawingContext.globalCompositeOperation = 'destination-in';
				this.mask.noStroke();

				this.mask.fill(this.color);
				this.mask.rect(-this.w / 2, -this.h / 2, this.w, this.h);

				this.mask.pop();

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
