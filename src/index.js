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
		abyss: [220, 200, 45],
		open_sea: [210, 75, 65],
		shallow_sea: [210, 50, 100],
		coast: [40, 40, 90],
		beach: [45, 35, 100],
		lowland: [70, 35, 85],
		grassland: [75, 35, 80],
		deciduous_forest: [95, 80, 60],
		coniferous_forest: [100, 75, 40],
		mountain_base: [15, 10, 25],
		mountain_high: [15, 15, 50],
		mountain_top: [10, 0, 100],
	},
	'barren rocky': {
		veryhotlava: [40, 100, 100],
		hotlava: [30, 100, 100],
		lava: [0, 100, 100],
		cold_lava: [0, 60, 60],
		plateau1: [0, 100, 10],
		plateau: [0, 100, 20],
		mountain_base: [15, 10, 25],
		mountain_high: [15, 15, 50],
		mountain_top: [10, 0, 100],
	},
	redblack: {
		black: [0, 0, 10],
		white: [30, 10, 100],
		black2: [0, 0, 10],
		white2: [30, 10, 100],
		black3: [0, 60, 100],
		white3: [30, 10, 100],
		black4: [0, 0, 10],
		white4: [30, 10, 100],
		black5: [0, 0, 10],
		white5: [30, 10, 100],
	},
	new_palette2: {
		black5: [0, 0, 0],
		white5: [0, 0, 100],
		white: [211, 100, 24],
		black2: [209, 100, 40],
		white2: [46, 100, 100],
		black5: [0, 0, 0],
		white5: [0, 0, 100],
		black3: [50, 96, 100],
		black5: [0, 0, 0],
		white5: [0, 0, 100],
	},
	pastel: {
		1: [60, 2, 93],
		2: [30, 9, 84],
		3: [31, 9, 96],
		4: [26, 11, 89],
		5: [22, 18, 84],
		6: [22, 18, 84],
		7: [26, 11, 89],
		8: [31, 9, 96],
		9: [30, 9, 84],
		10: [60, 2, 93],
	},
	blue_pink: {
		1: [278, 18, 86],
		2: [337, 22, 100],
		3: [338, 31, 100],
		4: [208, 26, 100],
		5: [209, 36, 100],
		6: [209, 36, 100],
		7: [208, 26, 100],
		8: [338, 31, 100],
		9: [337, 22, 100],
		10: [278, 18, 86],
	},
	hunt: {
		1: [74, 48, 42],
		2: [88, 56, 21],
		3: [52, 12, 100],
		4: [32, 57, 87],
		5: [28, 80, 74],
		6: [28, 80, 74],
		7: [32, 57, 87],
		8: [52, 12, 100],
		9: [88, 56, 21],
		10: [74, 48, 42],
	},
	france: {
		2: [105, 5, 98],
		3: [182, 24, 86],
		4: [203, 56, 62],
		5: [215, 67, 34],
		6: [215, 67, 34],
		7: [203, 56, 62],
		8: [182, 24, 86],
		9: [105, 5, 98],
	},
	grayscale: {
		1: [40, 30, 90],
		2: [40, 30, 0],
		3: [40, 30, 10],
		4: [40, 30, 90],
		5: [40, 30, 20],
		6: [40, 30, 80],
		7: [40, 30, 30],
		8: [40, 30, 70],
		9: [40, 30, 40],
		10: [40, 30, 60],
		11: [40, 30, 50],
		12: [40, 30, 80],
		13: [40, 30, 50],
		14: [40, 30, 60],
		15: [40, 30, 40],
		16: [40, 30, 70],
		17: [40, 30, 30],
		18: [40, 30, 80],
		19: [40, 30, 20],
		20: [40, 30, 90],
		21: [40, 30, 10],
		22: [40, 30, 90],
		23: [40, 30, 0],
		24: [40, 30, 90],
	},
};

// choose a random key from the palettes object
// chose a random key from the key array using math.random
let themeArray = Object.keys(palettes);
let randomThemeKey = themeArray[8];

// chose a palette randomly from the palettes object
let chosenPalette = palettes[randomThemeKey];
// create an array of the chosen palette colors withouth the name
let paletteArr = Object.values(palettes[randomThemeKey]);
// chose a random number of mountains between 2 and 5

window.$fxhashFeatures = {
	// chose a random palette from the palettes object in vanilla JS
	palette: chosenPalette,
	biome: randomThemeKey,
	biomeColorList: paletteArr,
};
console.log(window.$fxhashFeatures);
