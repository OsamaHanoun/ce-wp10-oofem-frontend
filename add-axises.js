import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default function addAxises(scene){
    const textGroup = new THREE.Group();
    scene.add(textGroup);
    // Create labels for the axes
    const fontLoader = new FontLoader();
    fontLoader.load('fonts/font.json', (font) => {
      const labelX = createLabel('X', font);
      const labelY = createLabel('Y', font);
      const labelZ = createLabel('Z', font);
    
      // Position and add labels to the scene
      labelX.position.set(10, 0, 0); // Adjust the position as needed
      labelY.position.set(0, 10, 0); // Adjust the position as needed
      labelZ.position.set(0, 0, 10); // Adjust the position as needed
      textGroup.add(labelX);
      textGroup.add(labelY);
      textGroup.add(labelZ);
    });
    // Function to create text labels
    function createLabel(text, font) {
      const geometry = new TextGeometry(text, {
        font: font,
        size: 3, // Adjust the size as needed
        height: 1, // Adjust the height as needed
      });
      const material = new THREE.MeshBasicMaterial({ color: 0xfff000});
      const label = new THREE.Mesh(geometry, material);
      return label;
    }
    //scene.add( axesHelper );
    const axesHelper = new THREE.AxesHelper(15); // 5 units in length (adjust as needed)
    scene.add(axesHelper)
    return textGroup;
}