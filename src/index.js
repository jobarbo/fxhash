import palettes from 'nice-color-palettes/100.json';

window.palettes = palettes;
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
let modeArr = [
	['hard dunes', 0.1, 0.01],
	['dunes', 0.05, 0.01],
	['drapes', 0.001, 0.015],
	['soft drapes', 0.001, 0.005],
	['soft dunes', 0.02, 0.002],
	['super soft dunes', 0.01, 0.001],
	['hardcorn', 0.1, 0.08],
	['popcorn', 0.035, 0.025],
	['softcorn', 0.015, 0.01],
];
let modeIndex = Math.floor(fxrand() * modeArr.length);
let mode = modeArr[modeIndex];
console.log(`mode: ${mode[0]}`);

let baselenArr = [5, 10, 15, 25, 50, 60, 100];
let stepArr = [0.75, 1, 2, 3];
let maxswArr = [1, 2, 3, 5, 15, 40, 50, 100, 120];
let angledirArr = [1, -1];
let hueStepsArr = [20, 50, 80, 120, 150, 200];

let baselen = baselenArr[Math.floor(fxrand() * baselenArr.length)];

let step = stepArr[Math.floor(fxrand() * stepArr.length)];

let maxsw = maxswArr[Math.floor(fxrand() * maxswArr.length)];

let angledir = angledirArr[Math.floor(fxrand() * angledirArr.length)];
let baseAngle = 360 * angledir;

let hue = Math.floor(fxrand() * 360);
let hueSteps = hueStepsArr[Math.floor(fxrand() * hueStepsArr.length)];

window.$fxhashFeatures = {
	mode: mode,
	mode_name: mode[0],
	base_length: baselen,
	step: step,
	max_stroke_weight: maxsw,
	base_angle: baseAngle,
	angle_direction: angledir,
	hue: hue,
	hue_steps: hueSteps,
};
console.log($fxhashFeatures);
