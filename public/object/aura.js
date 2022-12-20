class Aura {
	constructor(aura_type, bgSpriteJSON, bgSpriteSheets, pp_offset_x, pp_offset_y) {
		this.type = aura_type;
		this.sprite_json = bgSpriteJSON.frames;
		this.sprite_sheets = bgSpriteSheets;
		console.log(pp_offset_x, pp_offset_y);
		this.chosen_sprite = this.chooseSprite();

		this.img = this.sprite_sheets.get(this.chosen_sprite.position.x, this.chosen_sprite.position.y, this.chosen_sprite.position.w, this.chosen_sprite.position.h);

		this.offset_x = pp_offset_x;
		this.offset_y = pp_offset_y;

		//is post processing on or off?
		this.post_processing = post_processing;
	}

	chooseSprite() {
		// loop through sprite json and find the sprite that matches the aura type
		for (var key in this.sprite_json) {
			if (this.sprite_json.hasOwnProperty(key)) {
				if (this.sprite_json[key].name == this.type) {
					return this.sprite_json[key];
				}
			}
		}
	}

	drawAura() {
		// draw the sprite
		//blendMode(OVERLAY);
		if (this.post_processing == true) {
			this.drawDots();
			tint(0, 0, 100, 100);
			image(this.img, 0, 0, width, height);
		} else {
			image(this.img, 0, 0, width, height);
		}
	}

	//draw dots where the sprite is not transparent
	drawDots() {
		this.img.loadPixels();
		//resize the image to the canvas size
		this.img.resize(width, height);

		for (var i = 0; i < this.img.width; i += 2) {
			for (var j = 0; j < this.img.height; j += 2) {
				var index = (j * this.img.width + i) * 4;
				if (this.img.pixels[index + 3] > 0) {
					//if the pixel is not transparent
					stroke(200, 100, 100, 100);
					strokeWeight(1);
					point(i + this.offset_x, j + this.offset_y);
					stroke(0, 100, 100, 100);
					strokeWeight(1);
					point(i - this.offset_x, j - this.offset_y);
					stroke(0, 0, 0, 100);
					strokeWeight(1.2);
					point(i, j);
				}
			}
		}
	}
}
