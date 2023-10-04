import * as THREE from 'three';

export default function drawConstraints(jsonData, scene){
    jsonData.nodes.forEach(node => {
        if("constraint-id" in node ) {
            const constraintID = node['constraint-id'];
            const constraint = jsonData.constraints.find(constraint => constraint.id == constraintID);
            const hex = 0xADFF2F
            var material =  new THREE.MeshPhysicalMaterial({ color: new THREE.Color(hex) });
            const coneRadius = 0.5; // to be changed
            const coneHeight = 1; // to be changed
            
            //draw constraint in x direction
            if(!constraint.u1){
                var geometry = new THREE.ConeGeometry( coneRadius, coneHeight ); 
                material =  new THREE.MeshPhysicalMaterial({ color:0xff0000});
                const cone = new THREE.Mesh(geometry, material );
                cone.position.set(node.x1 - coneHeight/2,node.x2 ,node.x3)
                cone.rotation.set(0, 0, -Math.PI / 2);
                scene.add(cone);
            }
            
            //draw constraint in y direction
            if(!constraint.u2){
                var geometry = new THREE.ConeGeometry( coneRadius, coneHeight ); 
                material =  new THREE.MeshPhysicalMaterial({ color:0xADFF2F});
                const cone = new THREE.Mesh(geometry, material );
                cone.position.set(node.x1,node.x2-coneHeight/2,node.x3)
                cone.rotation.set(0,0,0)
                scene.add(cone);
            }
            //draw constraint in z direction
            if(!constraint.u3){
                var geometry = new THREE.ConeGeometry( coneRadius, coneHeight ); 
                material =  new THREE.MeshPhysicalMaterial({ color:0x0000FF});
                const cone = new THREE.Mesh(geometry, material );
                cone.position.set(node.x1,node.x2,node.x3 - coneHeight/2)
                cone.rotation.set(Math.PI / 2, 0, 0);
                scene.add(cone);

            }
        }
    })
}