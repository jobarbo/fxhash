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
		this.textureNum = $fxhashFeatures.mountain_texture.count;
		this.backgroundTextureNum = this.textureNum * 1;
		this.mask = '';

		this.bgTextureDone = false;
		this.fgTextureDone = false;
		this.outlineTextureDone = false;
		this.started = false;
		this.done = false;

		this.currentVertexArr = [];

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
		this.started = true;
		console.log(`'draw' started for mtnID: ${this.mtnID}`);
		// make a custom shape using beginShape() and endShape() and noise();
		beginShape();
		strokeWeight(5);
		stroke(this.hue, this.saturation + 30, this.brightness - 10);

		// make an array to store each current x and y position in the loop
		this.createVertexArr();

		// create a mask for the mountain
		this.createMask();

		// draw base background texture on the mountain but evenly distributed

		let drawBackgroundTexture = this.drawBackgroundTexture();
		let drawBackgroundTextureInterval = setInterval(() => {
			drawBackgroundTexture.next();
			if (this.bgTextureDone) {
				clearInterval(drawBackgroundTextureInterval);
				//console.log(`mountain Id: ${this.mtnID} bgTextureDone`);
				this.bgTextureDone = true;
			}
		}, 0);

		// when this.bgTextureDone is true, draw the foreground texture
		let drawForegroundTexture = this.drawForegroundTexture();
		let drawForegroundTextureInterval = setInterval(() => {
			if (this.bgTextureDone) {
				drawForegroundTexture.next();
				if (this.fgTextureDone) {
					clearInterval(drawForegroundTextureInterval);
					//console.log(`mountain Id: ${this.mtnID} fgTextureDone`);
					this.fgTextureDone = true;
				}
			}
		}, 0);

		// when this.fgTextureDone is true, draw the outline of the mountain
		let drawOutline = this.drawOutline();
		let drawOutlineInterval = setInterval(() => {
			if (this.fgTextureDone) {
				drawOutline.next();
				if (this.outlineTextureDone) {
					clearInterval(drawOutlineInterval);
					console.log(`'draw' finished for mtnID: ${this.mtnID}`);
					this.drawMask();
					this.done = true;
				}
			}
		}, 0);

		// draw an outline on top of the mountain
		//this.drawOutline();

		// check if drawBackgroundTexture is done
	}

	createVertexArr() {
		let i = 0;
		for (let x = -width * 1.1; x <= width * 1.1; x += 10) {
			let y = map(noise(this.xoff, this.yoff), 0, 1, this.y, this.y - this.height);

			// /point(x, y);
			// store the current x and y position in the array
			this.currentVertexArr[i] = [x, y];
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
	}

	createMask() {
		this.mask = createGraphics(width, height);
		this.mask.pixelDensity(1);
		this.mask.colorMode(HSB, 360, 100, 100, 100);
		this.mask.background(this.hue, this.saturation, this.brightness, this.alpha);
	}

	*drawBackgroundTexture() {
		let count = 0;
		let draw_every = 4000;
		let density = map(this.mtnID, 1, 5, 0.2, 0.05);
		let textureMult = 60 / this.mtnID;
		let bgTextureNum = this.backgroundTextureNum * density * textureMult;

		for (let i = 0; i < bgTextureNum; i++) {
			let x = random(width);
			let y = random(this.maxY, this.baseY);
			let alpha = map(y, this.maxY, this.baseY, 70, 100);
			let weight = map(y, this.maxY, this.baseY, 1, 1.5);
			//this.mask.strokeWeight(weight);
			this.mask.noStroke();
			this.mask.fill(this.hue, this.saturation + random(-5, 5), this.brightness + random(-5, 5), alpha);
			this.mask.rect(x, y, weight);
			if (count >= draw_every) {
				//console.log('yield');
				count = 0;
				yield;
			}
			count++;
		}
		this.bgTextureDone = true;
		console.log('bgTextureDone');
	}

	*drawForegroundTexture() {
		let count = 0;
		let draw_every = 4000;
		for (let i = 0; i < this.currentVertexArr.length; i++) {
			let x1 = this.currentVertexArr[i][0];
			let y1 = this.currentVertexArr[i][1];

			// change the value of yBleed to change the height of the texture with perlins noise
			let yBleed = map(noise(this.rYoff), 0, 1, 20, this.height * 1.5);
			let xBleed = map(noise(this.rXoff), 0, 1, $fxhashFeatures.mountain_texture.xBleedMin, $fxhashFeatures.mountain_texture.xBleedMax);
			this.rYoff += 0.2;
			this.rXoff += 0.1;
			let density = map(this.mtnID, 1, 5, 0.2, 0.05);
			let fgTextureNum = this.textureNum * density;
			// calculate the difference between the current X vertex and the sun x position
			let xDiff = this.sunPosX - x1;
			this.reflectionAngle = xDiff / 15;
			this.mask.push();
			this.mask.translate(x1, y1);
			this.mask.angleMode(DEGREES);
			this.mask.rotate(this.reflectionAngle);
			// do not draw the texture if the currentVertexArr X position outside the canvas
			if (x1 > -100 && x1 < width + 100) {
				for (let j = 0; j < fgTextureNum; j++) {
					let xoff = random(100000);
					let yoff = random(100000);
					let ry = random();
					let skewed = this.easeInCirc(ry);
					let yEnd = map(noise(yoff), 0, 1, yBleed / 4, yBleed);

					let x2 = map(noise(xoff), 0, 1, 0 - xBleed, 0 + xBleed);
					//let y2 = map(noise(yoff), 0, 1, 0 - yBleed, 0 + yBleed);
					let y2 = map(skewed, 0, 1, -20, yEnd);
					let sw = map(y2, 0, this.height, 2, 0.1);
					/*
					this.mask.strokeWeight(sw);
					this.mask.stroke(this.skyHue, this.skySaturation, this.skyBrightness, this.skyAlpha);
					this.mask.point(x2, y2); */
					this.mask.noStroke();
					this.mask.fill(this.skyHue, this.skySaturation, this.skyBrightness, this.skyAlpha);
					this.mask.rect(x2, y2, sw);
					if (count >= draw_every) {
						//console.log('yield');
						count = 0;
						yield;
					}
					count++;
				}
			}
			this.mask.pop();
		}
		this.fgTextureDone = true;
		console.log('fgTextureDone');
	}

	*drawOutline() {
		let count = 0;
		let draw_every = 4000;
		let lineAlpha = 100;
		for (let j = 0; j < 20; j++) {
			for (let i = 0; i < this.currentVertexArr.length; i++) {
				let prevX1 = this.currentVertexArr[i - 1] ? this.currentVertexArr[i - 1][0] : this.currentVertexArr[0][0];
				let prevY1 = this.currentVertexArr[i - 1] ? this.currentVertexArr[i - 1][1] : this.currentVertexArr[0][1];

				let x1 = this.currentVertexArr[i][0];
				let y1 = this.currentVertexArr[i][1];
				let lineBrightOffset = map(j, 0, 20, 10, 0);
				this.mask.strokeWeight(1);
				this.mask.strokeCap(SQUARE);
				this.mask.strokeJoin(MITER);
				this.mask.stroke(this.skyHue, this.skySaturation, this.skyBrightness + lineBrightOffset, lineAlpha);
				this.mask.line(prevX1, prevY1 + j, x1, y1 + j);
				if (count >= draw_every) {
					count = 0;
					yield;
				}
				count++;
			}
			lineAlpha -= 5;
		}
		this.outlineTextureDone = true;
		console.log('outlineTextureDone');
	}
	drawMask() {
		this.mask.drawingContext.globalCompositeOperation = 'destination-in';

		this.mask.noStroke();
		this.mask.fill(this.hue, this.saturation, this.brightness, this.alpha);
		this.mask.beginShape();
		this.mask.vertex(-width * 1.1, this.y);
		// use noise to create the mountain shape
		for (let index = 0; index < this.currentVertexArr.length; index++) {
			this.mask.vertex(this.currentVertexArr[index][0], this.currentVertexArr[index][1]);
			this.xoff += $fxhashFeatures.mountain_softness;
		}
		this.mask.vertex(width * 1.1, this.y);
		this.mask.endShape(CLOSE);

		image(this.mask, 0, 0);
	}

	easeInCirc(y) {
		return 1 - sqrt(1 - pow(y, 2));
	}
}
