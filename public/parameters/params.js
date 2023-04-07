//* PARAMS *//
// put global settings here if needed

//* COMPOSITION TYPE DEFINITION *//
// CATEGORISE VARIABILITY INSIDE ARRAYS //

const example_type = [
	// name, probability(0-100)
	['none', 10],
	['plane', 15],
	['triangle', 15],
	['double_triangle', 5],
	['tetrahedron', 5],
	['pentagon', 10],
	['octahedron', 10],
	['hexahedron', 10],
	['dodecahedron', 10],
	['station_h', 3],
	['station_t', 3],
	['station_o', 2],
	['station_d', 2],
];

// all input parameters are optional, they will be chosen at random if not passed into the function
function generate_composition_params(center_piece_type) {
	// SET DEFAULTS IF NOT PASSED IN
	if (center_piece_type === undefined) {
		center_piece_type = weighted_choice(example_type);
	}

	//* EXCEPTIONS AND OVER-RIDES *//
	// if necessary, add exceptions and over-rides here

	//* PACK PARAMETERS INTO OBJECT *//
	var composition_params = {
		center_piece_type: center_piece_type,
	};

	//* RETURN PARAMETERS *//
	return composition_params;
}
