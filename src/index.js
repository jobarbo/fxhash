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
	['perspective far', 0.05, 0.005],
	['perspective normal', 0.03, 0.003],
	['perspective close', 0.01, 0.001],
	['topo far', 0.01, 0.01],
	['topo normal', 0.007, 0.007],
	['topo close', 0.005, 0.005],
];
let modeIndex = Math.floor(fxrand() * modeArr.length);
let mode = modeArr[modeIndex];

let baselenArr = [10, 15, 20, 25, 30, 35, 50, 65];
let maxswArr = [1, 2, 3, 4, 5, 8, 10, 12, 15, 23, 30];
let stepArr = [1, 1.25, 1.5];
let angledirArr = [1];
let hueStepsArr = [50, 80, 100, 120, 135];
let shadowModeArr = ['rocky', 'grass'];

let baselen = baselenArr[Math.floor(fxrand() * baselenArr.length)];

let step = stepArr[Math.floor(fxrand() * stepArr.length)];

let maxsw = maxswArr[Math.floor(fxrand() * maxswArr.length)];

let angledir = angledirArr[Math.floor(fxrand() * angledirArr.length)];
let baseAngle = 360 * angledir;

let hue = Math.floor(fxrand() * 360);
let hueSteps = hueStepsArr[Math.floor(fxrand() * hueStepsArr.length)];

let shadowMode = shadowModeArr[Math.floor(fxrand() * shadowModeArr.length)];

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
	shadow_mode: shadowMode,
};
