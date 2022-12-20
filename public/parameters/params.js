//* PARAMS *//
// put global settings here if needed

//* COMPOSITION TYPE DEFINITION *//
// CATEGORISE VARIABILITY INSIDE ARRAYS //

const background_type = [
	// name, probability(0-100)
	['angle', 16.66],
	['hazy', 16.66],
	['rebel', 16.66],
	['grassy', 16.66],
	['crossy', 16.66],
	['confused', 16.66],
];

// all input parameters are optional, they will be chosen at random if not passed into the function
function generate_composition_params(background_type) {
	// SET DEFAULTS IF NOT PASSED IN
	if (background_type === undefined) {
		console.log('background_type not passed in, choosing at random');
		console.log(background_type);
		background_type = weighted_choice(background_type);
	}

	console.log('background_type: ' + background_type);

	//* EXCEPTIONS AND OVER-RIDES *//
	// if necessary, add exceptions and over-rides here

	//* PACK PARAMETERS INTO OBJECT *//
	var composition_params = {
		center_piece_type: center_piece_type,
		left_piece_type: left_piece_type,
	};

	//* RETURN PARAMETERS *//
	return composition_params;
}

function preload() {
	bgSpriteJSON = loadJSON('assets/json/background.json');
	bgSpriteSheets = loadImage('assets/spritesheets/background.png');

	console.log(bgSpriteJSON);
}
