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
	'temperate broadleaf': {
		// array of colors

		deep_sea: [220, 200, 70],
		open_sea: [210, 75, 85],
		shallow_sea: [100, 40, 100],
		beach: [45, 35, 100],
		cliff: [10, 45, 70],
		grassland: [75, 35, 80],
		deciduous_forest: [95, 80, 60],
		coniferous_forest: [100, 75, 40],
		mountain_base: [15, 10, 25],
		mountain_high: [15, 15, 50],
		mountain_top: [10, 0, 100],
	},
};

// choose a random key from the palettes object
// chose a random key from the key array using math.random
let themeArray = Object.keys(palettes);
let randomThemeKey = themeArray[Math.floor(Math.random() * themeArray.length)];

// chose a palette randomly from the palettes object
let chosenPalette = palettes[randomThemeKey];
// chose a random number of mountains between 2 and 5

window.$fxhashFeatures = {
	// chose a random palette from the palettes object in vanilla JS
	palette: chosenPalette,
	theme: randomThemeKey,
};
console.log(window.$fxhashFeatures);
