import * as THREE from 'three';
import {CustomArrowBufferGeometry} from './arrow-geometry.js';

export default function drawForces(jsonData, scene){
    jsonData.nodes.forEach(node => {
        if("force-id" in node ) {
            const forceID = node['force-id'];
            const force = jsonData.forces.find(force => force.id == forceID);
            const arrowOrigin = new THREE.Vector3(node.x1, node.x2, node.x3);
            const hex = 0xADFF2F
            const arrowLength = 3; // to change later
            const material =  new THREE.MeshPhysicalMaterial({ color: new THREE.Color(hex) });
    
            //draw arrow in x direction
            if(force.r1 != 0){
            var dir = new THREE.Vector3( 1, 0, 0 );
            var geometry = new CustomArrowBufferGeometry(dir, arrowOrigin, arrowLength)
            scene.add( arrow1 );
            }
    
            //draw arrow in y direction
            if(force.r2 !=0){
            dir = new THREE.Vector3( 0, 1, 0 );
            geometry = new CustomArrowBufferGeometry(dir, arrowOrigin, arrowLength)
            const arrow2 = new THREE.Mesh(geometry, material);
            scene.add( arrow2 );
            }
        
            //draw arrow in z direction
            if(force.r3 != 0){
            dir = new THREE.Vector3( 0, 0, 1);
            geometry = new CustomArrowBufferGeometry(dir, arrowOrigin, arrowLength)
            const arrow3 = new THREE.Mesh(geometry, material);
            scene.add( arrow3 );
            }
            
        }
    })
}