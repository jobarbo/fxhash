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
let palettes = {
	// name of the palette
	0: {
		// array of colors
		mountain: [16, 59, 76],
		sun: [43, 42, 98],
		sea: [183, 87, 39],
		sky: [127, 19, 55],
		ground: [59, 56, 43],
	},
	// another palette
	1: {
		mountain: [134, 23, 37],
		sun: [42, 20, 85],
		sea: [123, 17, 45],
		sky: [101, 9, 71],
		ground: [20, 59, 69],
	},
	2: {
		mountain: [186, 21, 52],
		sun: [46, 58, 81],
		sea: [192, 76, 21],
		sky: [88, 9, 76],
		ground: [54, 76, 59],
	},
	3: {
		mountain: [357, 89, 72],
		sun: [30, 98, 97],
		sea: [171, 74, 47],
		sky: [154, 39, 75],
		ground: [19, 87, 98],
	},
	4: {
		mountain: [37, 99, 95],
		sun: [45, 43, 98],
		sea: [168, 81, 58],
		sky: [143, 41, 38],
		ground: [14, 89, 93],
	},
};
// chose a palette randomly from the palettes object
let chosenPalette = palettes[Object.keys(palettes)[Math.floor(Math.random() * Object.keys(palettes).length)]];
window.$fxhashFeatures = {
	// chose a random palette from the palettes object in vanilla JS
	palette: chosenPalette,
};
console.log(window.$fxhashFeatures);
