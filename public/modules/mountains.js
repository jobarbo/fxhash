class Mountains {
	constructor(ID, color, position, mountainHeight, index, indexMax, satOffset, brightOffset) {
		this.mtnID = ID;
		this.mtnTotal = indexMax;
		this.satOffset = satOffset;
		this.brightOffset = brightOffset;
		this.div = indexMax - index;
		this.hue = hue(color);
		this.saturation = constrain(saturation(color) + this.satOffset, 10, 100);
		this.brightness = constrain(brightness(color) + this.brightOffset, 10, 100);
		this.xoff = 0.01;
		this.yoff = random(10000000);
		this.baseY = position;
		this.y = position;
		this.maxY = height;
		this.minY = 0;
		this.maxX = 0;
		this.height = (mountainHeight * this.div) / indexMax;
		this.textureNum = 20000;
		this.mask = '';
	}

	draw() {
		// make a custom shape using beginShape() and endShape() and noise();
		beginShape();
		strokeWeight(5);
		stroke(this.hue, this.saturation + 30, this.brightness - 10);

		// make an array to store each current x and y position in the loop
		let currentVertexArr = [];
		let i = 0;
		for (let x = -width * 2; x <= width * 2; x += 10) {
			let y = map(noise(this.xoff, this.yoff), 0, 1, this.y, this.y - this.height);

			// /point(x, y);
			// store the current x and y position in the array
			currentVertexArr[i] = [x, y];
			this.xoff += $fxhashFeatures.mountain_softness;
			if (y < this.maxY && x > 0 && x < width) {
				// highest point of the mountain
				this.maxY = y;
				this.maxX = x;
			}
			if (y > this.minY && x > 0 && x < width) {
				// lowest point of the mountain
				this.minY = y;
			}
			i++;
		}
		// create a mask for the mountain
		this.mask = createGraphics(1000, 1000);
		this.mask.pixelDensity(3);
		this.mask.colorMode(HSB, 360, 100, 100, 100);
		this.mask.background(this.hue, this.saturation, this.brightness, this.alpha);

		// draw the texture on the mask with a higher density near the currentVertexArr Y position

		for (let i = 0; i < currentVertexArr.length; i++) {
			let x1 = currentVertexArr[i][0];
			let y1 = currentVertexArr[i][1];
			let density = map(y1, y1, this.baseY, 0.1, 1);
			let yBleed = random(-500, 500);
			let xBleed = random(-100, 100);
			if (yBleed < 20 && yBleed > -20) {
				yBleed = 20;
			}
			if (xBleed < 20 && xBleed > -20) {
				xBleed = 20;
			}
			let textureNum = this.textureNum * density;

			for (let j = 0; j < textureNum; j++) {
				let xoff = random(100000);
				let yoff = random(100000);

				let x2 = map(noise(xoff), 0, 1, x1 - xBleed, x1 + xBleed);
				let y2 = map(noise(yoff), 0, 1, y1 - yBleed, y1 + yBleed);
				this.mask.strokeWeight(1);
				this.mask.stroke(this.hue, this.saturation, this.brightness - 10, 100);
				this.mask.point(x2, y2);
			}
		}

		// draw texture on the mountain but evenly distributed
		for (let i = 0; i < this.textureNum * 3; i++) {
			let x = random(width);
			let y = random(this.maxY, this.baseY);
			this.mask.strokeWeight(1);
			this.mask.stroke(this.hue, this.saturation, this.brightness - 5, 100);
			this.mask.point(x, y);
		}
		this.mask.drawingContext.globalCompositeOperation = 'destination-in';

		this.mask.noStroke();
		this.mask.fill(this.hue, this.saturation, this.brightness, this.alpha);
		this.mask.beginShape();
		this.mask.vertex(-width * 2, this.y);
		// use noise to create the mountain shape
		for (let index = 0; index < currentVertexArr.length; index++) {
			this.mask.vertex(currentVertexArr[index][0], currentVertexArr[index][1]);
			this.xoff += $fxhashFeatures.mountain_softness;
		}
		this.mask.vertex(width * 2, this.y);
		this.mask.endShape(CLOSE);
		image(this.mask, 0, 0);
	}
}
