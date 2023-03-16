class Rect {
	constructor(margin, colorArr, angleArr, bgColor, rectType, rectNum, all_shapes_num, id, tries, w = 0, h = 0) {
		this.type = rectType;
		this.margin = margin;
		// if width is bigger than height, it's a landscape rectangle use height as the base
		// if height is bigger than width, it's a portrait rectangle use width as the base
		// if width and height are the same, it's a square use width as the base\
		let base = width;
		if (width > height) {
			base = height;
		}

		this.w_shape = (base / 1.35 - this.margin) / (all_shapes_num / 10 + id) / (tries + 1);
		this.w_shape = constrain(this.w_shape, base / 5 - this.margin, base / 1.35 - this.margin);
		// I want to make the width of the shape smaller as the number of shapes increases and the number of tries increases

		if (this.type === 'rectangle') {
			if (w === 0 && h === 0) {
				// make the rectangle a random size but always 16:9 ratio
				this.ratio = random([1 / 1, 1 / 2, 3 / 4, 9 / 16, 10 / 16]);
				this.w = this.w_shape;
				this.h = this.w * this.ratio;
			} else {
				this.ratio = w / h;
				this.w = w;
				this.h = h;
			}
		} else {
			if (w === 0 && h === 0) {
				this.ratio = random([1 / 40, 1 / 50, 1 / 70, 1 / 100]);
				this.w = random(base / 5, base / 3);
				this.h = this.w * this.ratio;
			} else {
				this.ratio = w / h;
				this.w = w;
				this.h = h;
			}
		}
		this.x = random(margin + this.w / 1.5, width - margin - this.w / 1.5);
		this.y = random(margin + this.w / 1.5, height - margin - this.w / 1.5);
		this.bgHue = hue(bgColor);
		this.bgSat = saturation(bgColor);
		this.bgBright = brightness(bgColor);
		this.sHue = hue(bgColor);
		this.sSat = saturation(bgColor);
		this.sBright = brightness(bgColor);
		this.rotation = radians(random(angleArr));
		this.color = random(colorArr);
		this.hue = hue(this.color);
		this.saturation = saturation(this.color);
		this.brightness = brightness(this.color);
		this.padding = 0;
		this.center = createVector(this.x, this.y);
		this.margin = margin;

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

		this.id = id;

		// rotate each point around the center of the rectangle
		for (let i = 0; i < 4; i++) {
			this.points[i] = this.rotatePoint(this.points[i], this.center, this.rotation);
		}
	}

	draw() {
		// draw a preview of the rectangle

		push();
		translate(this.x, this.y);
		rotate(this.rotation);
		noStroke();
		fill(this.color);
		rect(0, 0, this.w, this.h);

		// make the stroke inside the rectangle
		strokeWeight(15);
		pop();
		// create a new canvas graphics the same size as the canvas to draw textures on
		this.mask = createGraphics(width, height);
		if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
			this.mask.pixelDensity(2.0);
		} else {
			this.mask.pixelDensity(3.0);
		}
		this.mask.colorMode(HSB, 360, 100, 100, 100);
		this.mask.rectMode(CENTER);
		this.mask.background(this.color);
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
		let texture_num = int(map(this.w, 0, width - this.margin, 1, 10, true));

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
				this.mask.rect(0, 0, this.w, this.h);

				this.mask.pop();

				image(this.mask, 0, 0);

				//blendMode(HARD_LIGHT);
				push();
				translate(this.x, this.y);
				rotate(this.rotation);
				noFill();
				// make the stroke width relative to the size of the rectangle
				let sw = map(this.h, 0, width - this.margin, 0, 3, true);
				let shue = this.hue;
				let ssaturation = this.saturation;
				let sbrightness = constrain(this.brightness - 35, 10, 100);
				let salpha = 50;
				let incr = sw;
				let sRectWidth = this.w;
				let sRectHeight = this.h;
				// slowly reduce the rect size and the stroke alpha to create a gradient effect
				for (let i = 0; i < 50; i++) {
					stroke(shue, ssaturation, sbrightness, salpha);
					strokeWeight(sw);
					rect(0, 0, sRectWidth, sRectHeight);
					salpha = salpha - 1;
					sRectWidth = sRectWidth - sw;
					sRectHeight = sRectHeight - sw;
					sbrightness += 0.5;
				}
				pop();
				//blendMode(BLEND);
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
