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
	['hard dunes', 0.1, 0.05],
	['dunes', 0.05, 0.01],
	['soft dunes', 0.02, 0.002],
	['hard drapes', 0.01, 0.2],
	['drapes', 0.001, 0.02],
	['soft drapes', 0.001, 0.005],
	['hardcorn', 0.2, 0.18],
	['popcorn', 0.035, 0.025],
	['truecorn', 0.025, 0.025],
	['softcorn', 0.015, 0.01],
];
let modeIndex = Math.floor(fxrand() * modeArr.length);
let mode = modeArr[modeIndex];

let baselenArr = [5, 8, 10, 15, 25, 50, 75];
let maxswArr = [1, 2, 3, 4, 5, 8, 10, 15, 30];
let stepArr = [0.75, 1, 1.25, 1.5, 1.75, 2];
let angledirArr = [1, -1];
let hueStepsArr = [50, 80, 100, 120, 150, 200];

let baselen = baselenArr[Math.floor(fxrand() * baselenArr.length)];

let step = stepArr[Math.floor(fxrand() * stepArr.length)];

let maxsw = maxswArr[Math.floor(fxrand() * maxswArr.length)];

let angledir = angledirArr[Math.floor(fxrand() * angledirArr.length)];
let baseAngle = 360 * angledir;

let hue = Math.floor(fxrand() * 360);
let hueSteps = hueStepsArr[Math.floor(fxrand() * hueStepsArr.length)];

window.$fxhashFeatures = {
	mode: mode[0],
	ynoise: mode[1],
	xnoise: mode[2],
	base_length: baselen,
	step: step,
	max_stroke_weight: maxsw,
	base_angle: baseAngle,
	angle_direction: angledir,
	hue: hue,
	hue_steps: hueSteps,
};
console.log(window.$fxhashFeatures);
