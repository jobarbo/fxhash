console.log(fxhash);
console.log(fxrand());

const sp = new URLSearchParams(window.location.search);
console.log(sp);

let composition_params;

composition_params = generate_composition_params();
//console.log(composition_params);

var {shape_type, ellipse_num, line_num, rectangle_num, bg_mode, border_mode, format_mode, palette_mode, angle_mode} =
	composition_params; // unpacking parameters we need in main.js and turning them into globals

//console.log(shape_type, ellipse_num, line_num, rectangle_num, bg_mode, border_mode, format_mode, palette_mode, angle_mode);
// this is how to define parameters
$fx.params([
	{
		id: 'shape_type',
		name: 'Type of',
		type: 'select',
		//default: Math.PI,
		options: {
			options: [
				'ellipse',
				'rectangle',
				'ellipse & line',
				'ellipse & rectangle',
				'line & rectangle',
				'ellipse & line & rectangle',
			],
		},
	},
	{
		id: 'ellipse_num',
		name: 'Ellipse num',
		type: 'number',
		//default: Math.PI,
		options: {
			// make a shorthand if to check if the ellipse num is 0
			min: 1,
			max: 4,
			step: 1,
		},
	},
	{
		id: 'line_num',
		name: 'Lines num',
		type: 'number',
		//default: Math.PI,
		options: {
			min: 3,
			max: 8,
			step: 1,
		},
	},
	{
		id: 'rect_num',
		name: 'Rect num',
		type: 'number',
		//default: Math.PI,
		options: {
			min: 1,
			max: 4,
			step: 1,
		},
	},
	{
		id: 'bg_mode',
		name: 'Background mode',
		type: 'select',
		//default: Math.PI,
		options: {
			options: ['light', 'dark'],
		},
	},
	{
		id: 'border_mode',
		name: 'Border mode',
		type: 'select',
		//default: Math.PI,
		options: {
			options: ['none', 'border'],
		},
	},
	{
		id: 'format_mode',
		name: 'Format mode',
		type: 'select',
		//default: Math.PI,
		options: {
			options: ['portrait', 'landscape', 'square'],
		},
	},
	{
		id: 'palette_mode',
		name: 'Palette mode',
		type: 'select',
		//default: Math.PI,
		options: {
			options: ['80s', '90s', 'june', 'mango', 'traditional', 'mono'],
		},
	},
	{
		id: 'angle_mode',
		name: 'Angle mode',
		type: 'select',
		//default: Math.PI,
		options: {
			options: ['random', 'straight', 'diagonal', 'diagonal_45', 'diagonal_135'],
		},
	},
]);
console.log($fx.getParam('shape_type'));
// this is how features can be defined
$fx.features({
	shape_type: $fx.getParam('shape_type'),
	ellipse_num: $fx.getParam('ellipse_num'),
	line_num: $fx.getParam('line_num'),
	rectangle_num: $fx.getParam('rect_num'),
	bg_mode: $fx.getParam('bg_mode'),
	border_mode: $fx.getParam('border_mode'),
	format_mode: $fx.getParam('format_mode'),
	palette_mode: $fx.getParam('palette_mode'),
	angle_mode: $fx.getParam('angle_mode'),
});

// log the parameters, for debugging purposes, artists won't have to do that
console.log('Current param values:');

// Added addtional transformation to the parameter for easier usage
// e.g. color.hex.rgba, color.obj.rgba.r, color.arr.rgb[0]
console.log($fx.getParams());
