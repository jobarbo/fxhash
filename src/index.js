// these are the variables you can use as inputs to your algorithms
// console.log(fxhash); // the 64 chars hex number fed to your algorithm
// deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }
//* COMPOSITION GENERATION *//

let composition_params;

composition_params = generate_composition_params();
//console.log(composition_params);

var {shape_type, ellipse_num, line_num, rectangle_num, bg_mode, border_mode, format_mode, palette_mode, angle_mode} =
	composition_params; // unpacking parameters we need in main.js and turning them into globals

//* FXHASH FEATURES DEFINITION *//
window.$fxhashFeatures = {
	shape_type: shape_type,
	ellipse_num: ellipse_num,
	line_num: line_num,
	rectangle_num: rectangle_num,
	bg_mode: bg_mode,
	border_mode: border_mode,
	format_mode: format_mode,
	palette_mode: palette_mode,
	angle_mode: angle_mode,
};

//* CONSOLE LOGGING *//

var jbarbeau_logo =
	'%c                                                                         \n' +
	'%c     Art by Jonathan Barbeau  |  { @jbarbeau.art }  |  2023              \n' +
	'%c                                                                         \n';

console.log(
	jbarbeau_logo,
	'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;',
	'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;',
	'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;'
);
console.log('%cLa nuit porte... de garage\n', 'font-style: italic; font-family: "Courier New", monospace;');

console.log(
	'%cTOKEN FEATURES',
	'color: white; background: #000000;',
	'\n',
	'Shape Type -> ' + shape_type,
	'\n',
	'Ellipse Number -> ' + ellipse_num,
	'\n',
	'Line Number -> ' + line_num,
	'\n',
	'Rectangle Number -> ' + rectangle_num,
	'\n',
	'Background Mode -> ' + bg_mode,
	'\n',
	'Border Mode -> ' + border_mode,
	'\n',
	'Format Mode -> ' + format_mode,
	'\n',
	'Palette Mode -> ' + palette_mode,
	'\n',
	'Angle Mode -> ' + angle_mode
);

console.log('%cCONTROLS', 'color: white; background: #000000;', '\n', 'cmd + s   : save artwork with date', '\n');

//* END CONSOLE LOGGING *//
