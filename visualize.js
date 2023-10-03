import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import drawFigure from "./draw-figure.js";
import drawConstraints from "./draw-constraints.js";
import drawForces from "./draw-forces.js";
import { ViewHelper } from "./ViewHelper.js";

let renderer, scene, camera, controls, helper;

export default function runVisualizer() {
  const uploadedFileJSON = sessionStorage.getItem("uploadedFile");
  const data = JSON.parse(uploadedFileJSON);
  init(data);
  animate();
}

function init(data) {
  // renderer
  const container = document.getElementById("visualizer");
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  container.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();
  // camera
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(20, 20, 20);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);

  // Background color
  scene.background = new THREE.Color(0xc8ccc9);

  //light settings
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.z = 2;
  scene.add(directionalLight);
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.z = -2;
  scene.add(directionalLight2);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  // axes
  // scene.add(new THREE.AxesHelper(20));

  drawFigure(data, scene);
  // draw constraints
  drawConstraints(data, scene);
  // draw forces
  drawForces(data, scene);

  // helper
  helper = new ViewHelper(camera, renderer, controls);
  helper.setControls(controls);
}

function animate() {
  requestAnimationFrame(animate);

  renderer.clear();

  renderer.render(scene, camera);

  helper.render(renderer);
}
