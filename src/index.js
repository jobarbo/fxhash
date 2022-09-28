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
window.$fxhashFeatures = {
	// create a palette object with multiple palettes to choose from and each palette has a name and an array of colors
	palettes: {
		// name of the palette
		default: [
			// array of colors
			'#000000',
			'#ffffff',
			'#ff0000',
			'#00ff00',
			'#0000ff',
		],
		pastel: ['#ff0000', '#00ff00', '#0000ff'],
	},
};
