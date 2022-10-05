class Mountains {
	constructor(ID, color, position, mountainHeight, index, indexMax, satOffset, brightOffset, skyColor, skySatOffset, skyBrightOffset, sunPos) {
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
		this.textureNum = 50000;
		this.mask = '';

		// sun position
		this.sunPosX = sunPos[0];
		this.sunPosY = sunPos[1];

		// sky color
		this.skySatOffset = skySatOffset;
		this.skyBrightOffset = skyBrightOffset;
		this.skyHue = hue(skyColor);
		this.skySaturation = constrain(saturation(skyColor) + this.skySatOffset, 10, 100);
		this.skyBrightness = constrain(brightness(skyColor) + this.skyBrightOffset, 10, 100);
		this.skyAlpha = 10;
		this.reflectionAngle = 0;
		this.rYoff = random(10000);
		this.rXoff = random(10000);
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
			let density = map(this.mtnID, 1, 5, 0.1, 0.08);

			// change the value of yBleed to change the height of the texture with perlins noise
			let yBleed = map(noise(this.rYoff), 0, 1, 60, 500);
			let xBleed = 10;
			this.rYoff += 0.05;
			this.rXoff += 0.1;

			let textureNum = this.textureNum * density;
			// calculate the difference between the current X vertex and the sun x position
			let xDiff = this.sunPosX - x1;
			this.reflectionAngle = xDiff / 15;
			// do not draw the texture if the currentVertexArr X position outside the canvas
			if (x1 > -100 && x1 < width + 100) {
				for (let j = 0; j < textureNum; j++) {
					this.mask.push();
					this.mask.translate(x1, y1);
					this.mask.angleMode(DEGREES);
					this.mask.rotate(this.reflectionAngle);
					let xoff = random(100000);
					let yoff = random(100000);

					let x2 = map(noise(xoff), 0, 1, 0 - xBleed, 0 + xBleed);
					let y2 = map(noise(yoff), 0, 1, 0 - yBleed, 0 + yBleed);
					let strokeWeight = map(y2, 0, this.baseY, 2, 0.3);
					this.mask.strokeWeight(strokeWeight);
					this.mask.stroke(this.skyHue, this.skySaturation, this.skyBrightness, this.skyAlpha);
					this.mask.point(x2, y2);
					this.mask.pop();
				}
			}
		}

		// draw texture on the mountain but evenly distributed
		/* 		for (let i = 0; i < this.textureNum * 3; i++) {
			let x = random(width);
			let y = random(this.maxY, this.baseY);
			this.mask.strokeWeight(1);
			this.mask.stroke(this.skyHue, this.skySaturation, this.skyBrightness - 10, this.skyAlpha);
			this.mask.point(x, y);
		} */
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
