// wait until the page is loaded
window.onload = function () {
	init();
};

function init() {
	// create a canvas element with the ID of "canvas" and append it to the body
	var threeCanvas = document.createElement('canvas');
	threeCanvas.id = 'threeCanvas';
	threeCanvas.classList.add('threeCanvas');

	console.log(threeCanvas);

	document.body.appendChild(threeCanvas);

	// create a new scene
	var scene = new THREE.Scene();

	// create a camera that is the same size as the viewport
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	// create a renderer that is the same size as the viewport
	var renderer = new THREE.WebGLRenderer({canvas: threeCanvas});
	renderer.setSize(window.innerWidth, window.innerHeight);

	// create a cube
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// set the camera position
	camera.position.z = 5;

	// render the scene
	renderer.render(scene, camera);
	if (location.protocol != 'https:') {
		location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
	}
	function permission() {
		if (
			typeof DeviceMotionEvent !== 'undefined' &&
			typeof DeviceMotionEvent.requestPermission === 'function'
		) {
			// (optional) Do something before API request prompt.
			DeviceMotionEvent.requestPermission()
				.then((response) => {
					// (optional) Do something after API prompt dismissed.
					if (response == 'granted') {
						window.addEventListener('devicemotion', (e) => {
							console.log('motion');
							console.log(e);
							// do something for 'e' here.
						});
					}
				})
				.catch(console.error);
		} else {
			alert('DeviceMotionEvent is not defined');
		}
	}
	const btn = document.getElementById('request');
	btn.addEventListener('click', permission);
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
		console.log(`touchstart: ${event.touches[0].clientX}, ${event.touches[0].clientY}`);
		lastTouchX = event.touches[0].clientX;
		lastTouchY = event.touches[0].clientY;
	});
	window.addEventListener('touchend', function (event) {
		console.log('touchend');
		touchStart = false;
	});
	window.addEventListener('touchmove', function (event) {
		if (touchStart) {
			console.log('touchmove');
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
		// rotate the cube
		//cube.rotation.x += 0.01;
		//cube.rotation.y += 0.01;

		// render the scene
		renderer.render(scene, camera);
	};

	// start the animation loop
	animation();
}
