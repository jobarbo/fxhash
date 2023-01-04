// wait until the page is loaded
window.onload = function () {
	init();
};

function init() {
	// create a canvas element with the ID of "canvas" and append it to the body
	var threeCanvas = document.createElement('canvas');
	threeCanvas.id = 'threeCanvas';
	threeCanvas.classList.add('threeCanvas');

	// threejs add size to canvas
	threeCanvas.width = 1000;
	threeCanvas.height = 1000;

	console.log(threeCanvas);

	document.body.appendChild(threeCanvas);

	// create a new scene
	var scene = new THREE.Scene();

	// create a camera
	var camera = new THREE.PerspectiveCamera(75, threeCanvas.width / threeCanvas.height, 0.1, 1000);

	// create a renderer
	var renderer = new THREE.WebGLRenderer({canvas: threeCanvas});
	renderer.setSize(1000, 1000);

	// create a cube
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// set the camera position
	camera.position.z = 5;

	// render the scene
	renderer.render(scene, camera);

	// control the cube with device orientation
	window.addEventListener('deviceorientation', function (event) {
		console.log(event);
		cube.rotation.x = event.beta;
		cube.rotation.y = event.gamma;
		cube.rotation.z = event.alpha;
	});

	// control the cube with mousepress and mousemove
	var mouseDown = false;
	var lastX = 0;
	var lastY = 0;
	window.addEventListener('mousedown', function (event) {
		mouseDown = true;
		lastX = event.clientX;
		lastY = event.clientY;
	});
	window.addEventListener('mouseup', function (event) {
		mouseDown = false;
	});
	window.addEventListener('mousemove', function (event) {
		if (mouseDown) {
			var deltaX = event.clientX - lastX;
			var deltaY = event.clientY - lastY;
			cube.rotation.x += deltaY / 100;
			cube.rotation.y += deltaX / 100;
			lastX = event.clientX;
			lastY = event.clientY;
		}
	});

	//control the cube with touch
	var touchStart = false;
	var lastTouchX = 0;
	var lastTouchY = 0;
	window.addEventListener('touchstart', function (event) {
		touchStart = true;
		lastTouchX = event.touches[0].clientX;
		lastTouchY = event.touches[0].clientY;
	});
	window.addEventListener('touchend', function (event) {
		touchStart = false;
	});
	window.addEventListener('touchmove', function (event) {
		if (touchStart) {
			var deltaX = event.touches[0].clientX - lastTouchX;
			var deltaY = event.touches[0].clientY - lastTouchY;
			cube.rotation.x += deltaY / 100;
			cube.rotation.y += deltaX / 100;
			lastTouchX = event.touches[0].clientX;
			lastTouchY = event.touches[0].clientY;
		}
	});

	// create a render loop
	var animation = function () {
		requestAnimationFrame(animation);
		console.log('animation loop');
		// rotate the cube
		//cube.rotation.x += 0.01;
		//cube.rotation.y += 0.01;

		// render the scene
		renderer.render(scene, camera);
	};

	// start the animation loop
	animation();
}
