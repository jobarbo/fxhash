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

// unpacking parameters we need in main.js and turning them into globals
for (var key in composition_params) {
	window[key] = composition_params[key];
}

generateConsoleLogs(composition_params);

//* FXHASH FEATURES DEFINITION *//
window.$fxhashFeatures = {
	aura: aura_type,
};

//* VIEWPORT SETUP *//

var viewport;
viewport = setTimeout(() => {
	return (viewport = document.getElementById('defaultCanvas0'));
}, 100);

var viewportHeight;
var viewportWidth;
