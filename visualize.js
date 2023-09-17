import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import drawFigure from './draw-figure.js';
import drawConstraints from './draw-constraints.js';
import drawForces from './draw-forces.js';
import addAxises from './add-axises.js';

// Parse uploaded file from local storage 
const uploadedFileJSON = sessionStorage.getItem('uploadedFile');
const jsonData = JSON.parse(uploadedFileJSON);

const container = document.getElementById('content');

const scene = new THREE.Scene();
const scene2 = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 70, container.clientWidth / container.clientHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
const renderer2 = new THREE.WebGLRenderer({
	alpha: true,
    antialias: true 
});


// Set the background color
renderer.setClearColor(0x000000); 
// draw figure
drawFigure(jsonData, scene); 
// draw constraints 
drawConstraints(jsonData, scene);
// draw forces 
drawForces(jsonData, scene);
// add axises 
const textGroup = addAxises(scene2);

//allow user to rotate the figure 
const controls = new OrbitControls(camera, renderer.domElement);
const controls2 = new OrbitControls(camera, renderer2.domElement);


renderer.setSize( container.clientWidth, container.clientHeight );

document.getElementById('results').appendChild( renderer.domElement);
document.getElementById('axises').appendChild( renderer2.domElement);


//light settings 
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.z = 2
scene.add(directionalLight)
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
directionalLight2.position.z = -2
scene.add(directionalLight2)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Set camera position and look at the center of the scene
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);

function animate() {
   // Iterate through all the children of the textGroup
   textGroup.children.forEach((textLabel) => {
    // Create a rotation matrix that aligns the text label with the camera direction
    const rotationMatrix = new THREE.Matrix4().lookAt(camera.position, textLabel.position, camera.up);
    // Apply the rotation to the text label
    textLabel.quaternion.setFromRotationMatrix(rotationMatrix);
});
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
    renderer2.render( scene2, camera );
}
animate();
