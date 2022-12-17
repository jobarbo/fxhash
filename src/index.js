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

var {center_piece_type} = composition_params; // unpacking parameters we need in main.js and turning them into globals

//* FXHASH FEATURES DEFINITION *//
window.$fxhashFeatures = {
	'Center piece type': center_piece_type,
};

//* CONSOLE LOGGING *//

var jbarbeau_logo = '%c                                                                         \n' + '%c     Art by Jonathan Barbeau and Melivoros  |  { @jbarbeau.art }  |  2022              \n' + '%c                                                                         \n';

console.log(jbarbeau_logo, 'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;', 'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;', 'color: white; background: #000000; font-weight: bold; font-family: "Courier New", monospace;');
console.log('%cLa nuit porte... de garage\n', 'font-style: italic; font-family: "Courier New", monospace;');

console.log('%cTOKEN FEATURES', 'color: white; background: #000000;', '\n', 'Center piece type -> ' + center_piece_type, '\n');

console.log('%cCONTROLS', 'color: white; background: #000000;', '\n', 'cmd + s   : save artwork with date', '\n', '1-5 : image capture 1-5x resolution (not yet working', '\n');

//* END CONSOLE LOGGING *//

//* VIEWPORT SETUP *//

var viewport;
viewport = setTimeout(() => {
	return (viewport = document.getElementById('defaultCanvas0'));
}, 100);

var viewportHeight;
var viewportWidth;

var controller;

let quality = 0;

//* CAPTURE CANVAS *//
function check_drawing_buffer(q) {
	const max_side = 5500; // looks like the max buffer for Chrome on desktop is 5760, so we take a bit lower to be safe
	//console.log(window.devicePixelRatio)
	var taget_size = q * Math.max(viewportWidth, viewportHeight);
	if (taget_size > max_side) {
		var reduced_quality = (q * max_side) / taget_size;
		console.log('Browser drawing buffer exceed. Reverting to the following quality multiplier: ' + reduced_quality.toFixed(2).toString());
		return reduced_quality;
	} else {
		return q;
	}
}

function doc_keyUp(e) {
	snap = false;
	quality = 0;
	// Example double key use: e.ctrlKey && e.key === 'ArrowDown'
	// this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
	if (e.keyCode === 49 || e.keyCode === 97) {
		// 1 or NumPad 1
		snap = true;
		quality = 1;
	} else if (e.keyCode === 50 || e.keyCode === 98) {
		// 2 or NumPad 2
		snap = true;
		quality = check_drawing_buffer(2);
		// save the image with the date according to the quality
	} else if (e.keyCode === 51 || e.keyCode === 99) {
		// 3 or NumPad 3
		snap = true;
		quality = check_drawing_buffer(3);
	} else if (e.keyCode === 52 || e.keyCode === 100) {
		// 4 or NumPad 4
		snap = true;
		quality = check_drawing_buffer(4);
	} else if (e.keyCode === 53 || e.keyCode === 101) {
		// 5 or NumPad 5
		snap = true;
		quality = check_drawing_buffer(5);
	}
	console.log('quality: ' + quality);
	// save the image with the date according to the quality
	save_artwork(snap, quality);
}

function save_artwork(snap, quality) {
	// save the image with the date according to the quality
	if (snap) {
		var d = new Date();
		var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '_' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds();

		// Make a new hidden canvas with the size of the viewport * the quality factor
		var canvas = document.createElement('canvas');
		ß;
		canvas.width = viewportWidth * quality;
		canvas.height = viewportHeight * quality;

		//TODO: find a way to run the visible canvas in a higher resolution on a new hidden canvas and then save it as a png

		// save the canvas with the date and upscale the resolution by the quality factor in vanilla JS
		// log the date and quality
		console.log(`d = ${d}`);
		console.log(`date = ${date}`);
		console.log(`quality = ${quality}`);
	}

	// reset the snap variable
	snap = false;
}

// register the capture key handler
document.addEventListener('keyup', doc_keyUp, false);
