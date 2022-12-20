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

// all input parameters are optional, they will be chosen at random if not passed into the function
function generate_composition_params(aura_type) {
	// SET DEFAULTS IF NOT PASSED IN
	if (aura_type === undefined) {
		console.log('aura_type not passed in, choosing at random');
		console.log(aura_type);
		aura_type = weighted_choice(aura_array);
	}

	console.log('aura_type: ' + aura_type);

	//* EXCEPTIONS AND OVER-RIDES *//
	// if necessary, add exceptions and over-rides here

	//* PACK PARAMETERS INTO OBJECT *//
	var composition_params = {
		aura_type: aura_type,
	};

	//* RETURN PARAMETERS *//
	return composition_params;
}

function preload() {
	bgSpriteJSON = loadJSON('assets/json/background.json');
	bgSpriteSheets = loadImage('assets/spritesheets/background.png');
}
