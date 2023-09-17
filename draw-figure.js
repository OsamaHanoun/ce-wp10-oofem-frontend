import * as THREE from 'three';

export default function drawFigure(jsonData, scene){
    // Create nodes (spheres)
    jsonData.nodes.forEach(nodeData => {
        const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xfff000 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(nodeData.x1, nodeData.x2, nodeData.x3);
        scene.add(sphere);
    });

    // Create elements (lines)
    jsonData.elements.forEach(elementData => {
        const node1 = jsonData.nodes.find(node => node.id == [elementData['node1-id']]);
        const node1Coordinates = new THREE.Vector3(node1.x1, node1.x2, node1.x3);

        const node2 = jsonData.nodes.find(node => node.id == [elementData['node2-id']]);
        const node2Coordinates = new THREE.Vector3(node2.x1, node2.x2, node2.x3);

        // Calculate the midpoint between two nodes
        const midpoint = new THREE.Vector3().addVectors(node1Coordinates, node2Coordinates).multiplyScalar(0.5);
        
        // Calculate the distance between two nodes
        const distance = node1Coordinates.distanceTo(node2Coordinates);

        // Create a cylinder geometry
        const radius = 0.2; // Adjust as needed
        const height = distance;
        const geometry = new THREE.CylinderGeometry(radius, radius, height);

        // Create a material
        const material = new THREE.MeshPhongMaterial({ color: 0xfff000 });

        // Create a cylinder mesh
        const cylinder = new THREE.Mesh(geometry, material);

        // Position the cylinder at the midpoint
        cylinder.position.copy(midpoint);

        // Calculating the direction vector between node1 and node2
        const direction = new THREE.Vector3().subVectors(node2Coordinates, node1Coordinates).normalize();
        // Rotating the cylinder so it connects the two nodes
        cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        scene.add(cylinder);
    });

}