//* PARAMS *//
// put global settings here if needed

//* COMPOSITION TYPE DEFINITION *//
// CATEGORISE VARIABILITY INSIDE ARRAYS //

const shapeArr = [
	// name, probability(0-100)
	['ellipse', 15],
	['line', 15],
	['rectangle', 15],
	['ellipse & line', 15],
	['ellipse & rectangle', 15],
	['line & rectangle', 20],
	['ellipse & line & rectangle', 5],
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
	[1, 10],
	[2, 20],
	[3, 30],
	[4, 15],
	[5, 15],
	[6, 10],
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
	// if shape_type includes ellipse, choose ellipse_num
	if (ellipse_num === undefined && shape_type.includes('ellipse')) {
		ellipse_num = weighted_choice(ellipseNumArr);
	} else {
		ellipse_num = 0;
	}

	if (line_num === undefined && shape_type.includes('line')) {
		line_num = weighted_choice(lineNumArr);
	} else {
		line_num = 0;
	}

	if (rectangle_num === undefined && shape_type.includes('rectangle')) {
		rectangle_num = weighted_choice(rectangleNumArr);
	} else {
		rectangle_num = 0;
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
