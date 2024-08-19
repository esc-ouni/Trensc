// Scene Mesh(objects) Camera Renderer

// Mesh
// - geometry
// - material

import * as THREE from 'three';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// Scene, Mesh (Geometry and Material), Camera, Renderer
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(2, 90, 90);

const material = new THREE.MeshPhongMaterial({ wireframe : true, color: 'white', flatShading : true, side: THREE.DoubleSide});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.DirectionalLight( 0xFFFFFF );
scene.add( light );
const helper = new THREE.DirectionalLightHelper( light, 5 );
scene.add( helper );

const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(90, aspect.width / aspect.height, 1, 2000);
camera.lookAt(mesh.position)
camera.position.z = 5;
scene.add(camera);


const axeshelper = new THREE.AxesHelper(25)
scene.add(axeshelper);


document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('Renderer');
    camera.aspect = window.innerWidth / window.innerHeight;
    
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(aspect.width, aspect.height);
    
    console.log(mesh.quaternion);

    function animate(){
        requestAnimationFrame(animate);
        mesh.position.x += 0.05
        
        mesh.rotation.x += 0.003
        mesh.rotation.y += 0.003
        mesh.rotation.z += 0.003
    
        if (mesh.position.x > 5)
            mesh.position.x = -7

        renderer.render(scene, camera);
        console.log("Scene rendered");
    }

    animate(camera)

});