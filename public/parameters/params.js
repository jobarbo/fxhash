//* PARAMS *//
// put global settings here if needed

//* COMPOSITION TYPE DEFINITION *//
// CATEGORISE VARIABILITY INSIDE ARRAYS //

const aura_array = [
	// name, probability(0-100)
	['angle', 16.66],
	['hazy', 16.66],
	['rebel', 16.66],
	['grassy', 16.66],
	['crossy', 16.66],
	['confused', 16.66],
];

const shape_array = [
	// name, probability(0-100)
	['circle', 33.33],
	['square', 33.33],
	['triangle', 33.33],
];

const post_processing_array = [
	// name, probability(0-100)
	[true, 50],
	[false, 50],
];

// all input parameters are optional, they will be chosen at random if not passed into the function
function generate_composition_params(aura_type, shape_type, post_processing) {
	// SET DEFAULTS IF NOT PASSED IN
	if (aura_type === undefined) {
		aura_type = weighted_choice(aura_array);
	}
	if (shape_type === undefined) {
		shape_type = weighted_choice(shape_array);
	}
	if (post_processing === undefined) {
		post_processing = weighted_choice(post_processing_array);
	}

	//* EXCEPTIONS AND OVER-RIDES *//
	// if necessary, add exceptions and over-rides here

	//* PACK PARAMETERS INTO OBJECT *//
	var composition_params = {
		aura_type: aura_type,
		post_processing: post_processing,
		shape_type: shape_type,
	};

	//* RETURN PARAMETERS *//
	return composition_params;
}

function preload() {
	bgSpriteJSON = loadJSON('assets/json/background.json');
	bgSpriteSheets = loadImage('assets/spritesheets/background.png');
}
