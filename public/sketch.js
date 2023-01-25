function setup() {
	pixelDensity(2.0);
	createCanvas(1500, 1500); // create a 1280x720 canvas
	colorMode(HSB, 360, 100, 100, 100); // utilise l'espace de couleur HSB (teinte, saturation, luminosité)
	background(0, 0, 90); // Utilise HSB pour définir le fond en noir
	randomSeed(fxrand() * 10000);
	noiseSeed(fxrand() * 10000);

	let spacingX = width / 25; // Cette variable détermine la taille des cellules de notre grille
	let spacingY = 5; // Cette variable détermine la taille des cellules de notre grille
	let margin = width / 15 - spacingY; // Cette variable détermine la marge de notre grille
	let pass = 100; // This variable determines the number of passes
	for (i = 0; i < pass; i++) {
		for (let x = margin; x < width - margin; x += spacingX) {
			// loop through x
			for (let y = margin; y < height - margin; y += spacingY) {
				// loop through y
				let hue = noise(x * 0.01, y * 0.01, i * 0.00252) * 360; // map x and y to hue (0-360
				let sat = random([0, 10, 100, 90, 70, 80, 60, 100, 20, 10, 0]); // map x and y to saturation (0-100
				let bri = random([0, 20, 50, 80, 100]); // map x and y to brightness (0-100

				let rand = random(1); // get a random number between 0 and 1
				if (rand < 0.75) {
					// make a blue line for baseline
				} else if (rand > 0.75) {
					// set random bezier control points
					let xanchor1 = random(-spacingX * 1, spacingX * 2);
					let yanchor1 = random(-spacingY * 10, spacingY * 2);
					let xanchor2 = random(-spacingX * 1, spacingX * 2);
					let yanchor2 = random(-spacingY * 2, spacingY * 10);

					// make a bezier curve
					stroke(hue, sat, bri, 20); // utilise HSB pour définir la couleur de la ligne
					strokeWeight(random(1, 2));
					noFill();
					bezier(x, y + spacingY, x + xanchor1, y + yanchor1, x + xanchor2, y + yanchor2, x + spacingX, y + spacingY);

					// if random number is between 0.75 and 0.85
					if (rand > 0.75 && rand < 0.8) {
						// draw a line
						line(x, y + spacingY / 2, x + spacingX, y + spacingY / 2);
					}
					// if random number is between 0.8 and 0.85
					if (rand > 0.8 && rand < 0.85) {
						// draw two dots
						strokeWeight(5);
						point(x, y + spacingY / 2);
						point(x + spacingX, y + spacingY / 2);
					}
				}
			}
		}
	}
}

function draw() {
	// create a 10_print-like pattern
}
