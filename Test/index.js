// Scene Mesh(objects) Camera Renderer

// Mesh
// - geometry
// - material

import * as THREE from 'three';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// Scene, Mesh (Geometry and Material), Camera, Renderer
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(2, 90, 90);

const material = new THREE.MeshPhongMaterial({ color: 'white', flatShading : true, side: THREE.DoubleSide});

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
camera.position.x = 8;
camera.position.y = 8;
camera.position.z = 16;
scene.add(camera);


const axeshelper = new THREE.AxesHelper(25)
scene.add(axeshelper);


const canvas = document.getElementById('Renderer');

const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;


const clock = new THREE.Clock();

function animate(){
    
    const c = clock.getDelta() * 10
    
    mesh.position.x += (0.05  * c);
    mesh.position.y += ((Math.sin((clock.getElapsedTime() * 1.2 )% 180))  * c);
    
    mesh.rotation.x += (0.003 * c);
    mesh.rotation.y += (0.003 * c);
    mesh.rotation.z += (0.003 * c);
    
    if (mesh.position.x > 10)
        mesh.position.x = -20
    
    controls.update();
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate(camera)