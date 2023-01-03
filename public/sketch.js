var container;
var camera, scene, renderer;
var uniforms;
var clock = new THREE.Clock();

init();
animate();

function init() {
	//create a canvas element with id="myCanvas"
	var canvas = document.createElement('canvas');
	canvas.id = 'myCanvas';
	canvas.width = 512;
	canvas.height = 512;

	// append canvas to body element
	document.body.appendChild(canvas);

	console.log(canvas);

	container = document.getElementById('myCanvas');
	console.log(container);
	camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		3000
	);
	camera.position.z = 10;

	scene = new THREE.Scene();

	var geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);

	var anArray = new Array(4096);
	//var anArray = new Array(64);
	anArray[0] = 0;
	anArray[1] = 255;
	anArray[2] = 255;

	anArray[4093] = 128;
	anArray[4094] = 0;
	anArray[4095] = 128;

	uniforms = {
		//time:       { value: 1.0 },
		//resolution: { value: new THREE.Vector2() },
		//myArray: { type: "iv1", value: anArray },
		imageIndex: {value: 0},
	};

	var material = new THREE.MeshLambertMaterial({
		color: 0xffffff,
		//wireframe: true,
	});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	console.log(controls);
	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);
}
