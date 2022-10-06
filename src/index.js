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
	'Damp Highland': {
		// array of colors
		mountain: [16, 59, 76],
		sun: [43, 42, 98],
		sea: [183, 87, 39],
		sky: [127, 19, 55],
		ground: [59, 56, 43],
	},
	// another palette
	'Rain Forest': {
		mountain: [134, 23, 37],
		sun: [42, 20, 85],
		sea: [123, 17, 45],
		sky: [101, 9, 71],
		ground: [20, 59, 69],
	},
	'Northern Ridge': {
		mountain: [186, 21, 52],
		sun: [46, 58, 81],
		sea: [192, 76, 21],
		sky: [88, 9, 76],
		ground: [54, 76, 59],
	},
	'Scorched Land': {
		mountain: [357, 89, 72],
		sun: [30, 98, 97],
		sea: [171, 74, 47],
		sky: [154, 39, 75],
		ground: [19, 87, 98],
	},
	'Arid Cliff': {
		mountain: [37, 99, 95],
		sun: [45, 43, 98],
		sea: [168, 81, 58],
		sky: [143, 41, 38],
		ground: [14, 89, 93],
	},
	'Vapor Fjord': {
		mountain: [191, 81, 50],
		sun: [19, 74, 96],
		sea: [172, 60, 51],
		sky: [347, 73, 86],
		ground: [141, 18, 67],
	},
	'Fiji Shrubland': {
		mountain: [159, 54, 49],
		sun: [34, 55, 98],
		sea: [95, 12, 76],
		sky: [91, 12, 82],
		ground: [5, 29, 85],
	},
	'Sakura Steppe': {
		mountain: [177, 76, 55],
		sun: [39, 50, 96],
		sea: [159, 25, 60],
		sky: [20, 26, 84],
		ground: [138, 27, 58],
	},
};
let MountainTextureStyle = {
	// name of the texture
	'Smooth Shading': {
		xBleedMin: 20,
		xBleedMax: 40,
		count: 50000,
	},
	'Corduroy Insanity': {
		xBleedMin: 6,
		xBleedMax: 14,
		count: 50000,
	},
	/* 'Basic Shading': {
		xBleedMin: 20,
		xBleedMax: 40,
		count: 10000,
	}, */
};

// choose a random key from the palettes object
// chose a random key from the key array using math.random
let themeArray = Object.keys(palettes);
let randomThemeKey = themeArray[Math.floor(Math.random() * themeArray.length)];

// chose a palette randomly from the palettes object
let chosenPalette = palettes[randomThemeKey];
// chose a random number of mountains between 1 and 5
let mountainNum = Math.floor(Math.random() * 5) + 2;
// chose a between 0.009 and 0.03
let mountainXoffIterator = Math.random() * 0.02 + 0.005;

let mountainTextureNameArray = Object.keys(MountainTextureStyle);
let randomMountainTextureKey = mountainTextureNameArray[Math.floor(Math.random() * mountainTextureNameArray.length)];
let chosenMountainTexture = MountainTextureStyle[randomMountainTextureKey];

window.$fxhashFeatures = {
	// chose a random palette from the palettes object in vanilla JS
	palette: chosenPalette,
	theme: randomThemeKey,
	mountain_num: mountainNum,
	mountain_softness: mountainXoffIterator,
	mountain_texture_type: randomMountainTextureKey,
	mountain_texture: chosenMountainTexture,
};
console.log(window.$fxhashFeatures);
