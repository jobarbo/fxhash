function setup() {
	pixelDensity(3.0);
	createCanvas(1000, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	background(210, 23, 92);
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	// make a grid, 5 columns, 5 rows of squares, their size is relative to the canvas size
	let cols = 100;
	let rows = 100;
	let size = width / cols;
	let margin = size * 0.001;

	// chose a random color on the color wheel
	let hue = random(360);
	let saturation = random(30, 100);
	let brightness = random(40, 100);

	// display the grid
	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			// calculate the position of the square
			let posX = x * size + margin;
			let posY = y * size + margin;

			// draw the background square
			fill(40, 10, 100);
			noStroke();
			rect(posX, posY, size - margin * 2, size - margin * 2);

			let triangleArr = [];

			let triangleNum = int(random(3));
			console.log(triangleNum);

			if (triangleNum != 0) {
				// put each corner of the square in an object
				let corners = {
					topLeft: {
						x: posX,
						y: posY,
						next_to1: 'topRight',
						next_to2: 'bottomLeft',
					},
					topRight: {
						x: posX + size - margin * 2,
						y: posY,
						next_to1: 'topLeft',
						next_to2: 'bottomRight',
					},
					bottomLeft: {
						x: posX,
						y: posY + size - margin * 2,
						next_to1: 'bottomRight',
						next_to2: 'topLeft',
					},
					bottomRight: {
						x: posX + size - margin * 2,
						y: posY + size - margin * 2,
						next_to1: 'bottomLeft',
						next_to2: 'topRight',
					},
				};

				// pick a random corner or pick nothing
				for (let i = 0; i < triangleNum; i++) {
					let corner = random(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']);

					triangleArr[i] = new Triangle(corners, corner, hue, saturation, brightness, i + 1);
					triangleArr[i].display();
				}
			}
		}
	}
}

function draw() {}

// make a triangle class with a constructor
class Triangle {
	constructor(cornersArr, corner, hue, saturation, brightness, num) {
		this.id = num;
		this.hue = hue;
		this.saturation = saturation;
		this.brightness = brightness;
		this.althue = (this.hue + 180) % 360;
		this.corner = corner;
		this.cornersArr = cornersArr;
		this.cornerA = this.cornersArr[this.corner];
		this.cornerB = this.cornersArr[this.cornerA.next_to1];
		this.cornerC = this.cornersArr[this.cornerA.next_to2];
	}

	display() {
		// if the id is even, draw a triangle with the color
		// if the id is odd, draw a triangle with the complementary color
		// draw the triangle
		if (this.id % 2 == 0) {
			stroke(this.hue, this.saturation, this.brightness);
			fill(this.hue, this.saturation, this.brightness);
			noFill();
		} else {
			stroke(this.althue, this.saturation, this.brightness);
			fill(this.althue, this.saturation, this.brightness);
			noFill();
		}

		triangle(this.cornerA.x, this.cornerA.y, this.cornerB.x, this.cornerB.y, this.cornerC.x, this.cornerC.y);
	}
}
