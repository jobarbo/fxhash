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

var {center_piece_type} = composition_params; // unpacking parameters we need in main.js and turning them into globals

//* FXHASH FEATURES DEFINITION *//
window.$fxhashFeatures = {
	'Center piece type': center_piece_type,
};

//* CONSOLE LOGGING *//

var jbarbeau_logo = '%c                                                                         \n' + '%c     Art by Jonathan Barbeau and Melivoros  |  { @jbarbeau.art }  |  2022              \n' + '%c                                                                         \n';

console.log(jbarbeau_logo, 'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;', 'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;', 'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;');
console.log('%cLa nuit porte... de garage\n', 'font-style: italic; font-family: "Courier New", monospace;');

console.log('%cTOKEN FEATURES', 'color: white; background: #000000;', '\n', 'Center piece type -> ' + center_piece_type, '\n');

console.log('%cCONTROLS', 'color: white; background: #000000;', '\n', 'cmd + s   : save artwork with date', '\n');

//* END CONSOLE LOGGING *//
