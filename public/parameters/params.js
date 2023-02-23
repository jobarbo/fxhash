//* PARAMS *//
// put global settings here if needed

//* COMPOSITION TYPE DEFINITION *//
// CATEGORISE VARIABILITY INSIDE ARRAYS //

const shapeArr = [
	// name, probability(0-100)
	['ellipse', 13],
	['line', 13],
	['rectangle', 13],
	['ellipse & line', 13],
	['ellipse & rectangle', 13],
	['line & rectangle', 13],
	['ellipse & line & rectangle', 13],
];

const ellipseNumArr = [
	// name, probability(0-100)
	[1, 30],
	[2, 30],
	[3, 15],
	[4, 10],
	[5, 10],
	[6, 5],
];

const lineNumArr = [
	// name, probability(0-100)
	[1, 30],
	[2, 30],
	[3, 15],
	[4, 10],
	[5, 10],
	[6, 5],
];

const rectangleNumArr = [
	// name, probability(0-100)
	[1, 30],
	[2, 30],
	[3, 15],
	[4, 10],
	[5, 10],
	[6, 5],
];

const bgModeArr = [
	// name, probability(0-100)
	['light', 50],
	['dark', 50],
];

// all input parameters are optional, they will be chosen at random if not passed into the function
function generate_composition_params(shape_type, ellipse_num, line_num, rectangle_num, bg_mode) {
	// SET DEFAULTS IF NOT PASSED IN
	if (shape_type === undefined) {
		shape_type = weighted_choice(shapeArr);
	}

	if (ellipse_num === undefined) {
		ellipse_num = weighted_choice(ellipseNumArr);
	}

	if (line_num === undefined) {
		line_num = weighted_choice(lineNumArr);
	}

	if (rectangle_num === undefined) {
		rectangle_num = weighted_choice(rectangleNumArr);
	}

	if (bg_mode === undefined) {
		bg_mode = weighted_choice(bgModeArr);
	}

	//* EXCEPTIONS AND OVER-RIDES *//
	// if necessary, add exceptions and over-rides here

	//* PACK PARAMETERS INTO OBJECT *//
	var composition_params = {
		shape_type: shape_type,
		ellipse_num: ellipse_num,
		line_num: line_num,
		rectangle_num: rectangle_num,
		bg_mode: bg_mode,
	};

	//* RETURN PARAMETERS *//
	return composition_params;
}
