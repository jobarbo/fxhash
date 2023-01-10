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
	jurassic: {
		white: [0, 0, 100],
		red: [8, 95, 90],
		white1: [0, 0, 100],
		black: [0, 0, 0],
		black1: [0, 0, 0],
		red1: [8, 95, 90],
		red2: [8, 95, 90],
		black2: [0, 0, 0],
		black3: [0, 0, 0],
		yellow: [43, 90, 95],
		black2: [0, 0, 0],
		white2: [0, 0, 100],
		black3: [0, 0, 0],
	},
};

// choose a random key from the palettes object
// chose a random key from the key array using math.random
let themeArray = Object.keys(palettes);
let randomThemeKey = themeArray[0];

// chose a palette randomly from the palettes object
let chosenPalette = palettes[randomThemeKey];
// create an array of the chosen palette colors withouth the name
let paletteArr = Object.values(palettes[randomThemeKey]);
console.log(paletteArr);
// chose a random number of mountains between 2 and 5

window.$fxhashFeatures = {
	// chose a random palette from the palettes object in vanilla JS
	palette: chosenPalette,
	biome: randomThemeKey,
	biomeColorList: paletteArr,
};
console.log(window.$fxhashFeatures);
