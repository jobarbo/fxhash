class Mountains {
	constructor(color, position, mountainHeight, offset, index, indexMax, satOffset, brightOffset) {
		this.satOffset = satOffset;
		this.brightOffset = brightOffset;
		this.div = indexMax - index;
		this.hue = hue(color);
		this.saturation = constrain(saturation(color) + this.satOffset, 20, 100);
		this.brightness = constrain(brightness(color) + this.brightOffset, 20, 100);
		this.xoff = 0.01;
		this.yoff = random(10000000);
		this.initY = position;
		this.x = random(-width / 4, width / 1.3);
		this.y = position;
		this.maxY = height;
		this.maxX = 0;
		this.width = this.x + random(width / 7, width / 4);
		this.height = (mountainHeight * this.div) / indexMax;
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
		for (let x = -width * 2; x < width * 2; x += 10) {
			let y = map(noise(this.xoff, this.yoff), 0, 1, this.y, this.y - this.height);

			// /point(x, y);
			// store the current x and y position in the array
			currentVertexArr[i] = [x, y];
			this.xoff += $fxhashFeatures.mountain_softness;
			if (y < this.maxY && x > 0 && x < width) {
				this.maxY = y;
				this.maxX = x;
			}
			i++;
		}
		console.log(currentVertexArr);

		//calculate the mask height
		let maskHeight = map(this.maxY, this.y, this.y - this.height, 0, this.height);

		// create a mask for the mountain
		this.mask = createGraphics(1000, 1000);
		this.mask.pixelDensity(3);
		this.mask.colorMode(HSB, 360, 100, 100, 100);
		this.mask.background(this.hue, this.saturation, this.brightness, this.alpha);

		for (let i = 0; i < 60000; i++) {
			let h = random(0, 360);
			this.mask.fill(this.hue, this.saturation, this.brightness - 5, 100);
			this.mask.noStroke();
			this.mask.ellipse(random(width), random(this.initY, this.maxY), random(3), random(3));
		}
		this.mask.drawingContext.globalCompositeOperation = 'destination-in';

		this.mask.noStroke();
		this.mask.fill(this.hue, this.saturation, this.brightness, this.alpha);
		this.mask.beginShape();
		this.mask.vertex(-width * 2, this.y);
		// use noise to create the mountain shape
		for (let index = 0; index < currentVertexArr.length; index++) {
			let y = map(noise(this.xoff, this.yoff), 0, 1, this.y, this.y - this.height);
			this.mask.vertex(currentVertexArr[index][0], currentVertexArr[index][1]);
			this.xoff += $fxhashFeatures.mountain_softness;
		}
		this.mask.vertex(width * 2, this.y);
		this.mask.endShape(CLOSE);
		image(this.mask, 0, 0);
	}
}
