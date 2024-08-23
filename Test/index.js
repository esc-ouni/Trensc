// Scene Mesh(objects) Camera Renderer

// Mesh
// - geometry
// - material

import * as THREE from 'three';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as lil_gui from 'lil-gui';
import * as dat_gui from "dat.gui";

const ligui = new dat_gui.GUI()


const textureloader = new THREE.TextureLoader();
const texture = textureloader.load('./Abstract/ball2.jpeg');
// const texture1 = textureloader.load('./Abstract/Abstract_010_ambientOcclusion.jpg');
// const texture2 = textureloader.load('./Abstract/Abstract_010_basecolor.jpg');
// const texture3 = textureloader.load('./Abstract/Abstract_010_height.png');
// const texture4 = textureloader.load('./Abstract/Abstract_010_normal.jpg');
// const texture5 = textureloader.load('./Abstract/Abstract_010_roughness.jpg');
// const texture6 = textureloader.load('./Abstract/Material_1374.jpg');

//yellow
// const texture1 = textureloader.load('./Models/ping_pong_ball/textures/Material_40_baseColor.png');
// const texture2 = textureloader.load('./Models/ping_pong_ball/textures/Material_40_metallicRoughness.png');
// const texture3 = textureloader.load('./Models/ping_pong_ball/textures/Material_40_normal.png');



// Scene, Mesh (Geometry and Material), Camera, Renderer
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(2, 90, 90);

const material = new THREE.MeshStandardMaterial({ color: 'white', side: THREE.DoubleSide, map:texture});

// const material = new THREE.MeshPhongMaterial({
//     map: texture1, // Base color
//     normalMap: texture3, // Normal map
//     roughnessMap: texture2, // Roughness map
//     side: THREE.DoubleSide
// });

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

ligui.add(camera.position, 'x', 1, 100).name('Ease')
ligui.add(material, 'wireframe')

ligui.add(mesh, 'visible')

// ligui.addColor(material, 'color')

const axeshelper = new THREE.AxesHelper(25)
scene.add(axeshelper);

const canvas = document.getElementById('Renderer');

const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;

const clock = new THREE.Clock();

document.addEventListener('dblclick', () => 
{
    if(!document.fullscreenElement)
        canvas.requestFullscreen();
    else
        document.exitFullscreen();
});

const  positionarray = new Float32Array([
    0,0,0,
    0,5,0,
    5,0,0
])

const positionAttribute = new THREE.BufferAttribute(positionarray, 3)

const geometry2 = new THREE.BufferGeometry()

geometry2.setAttribute('position', positionAttribute)

const mesh2 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({wireframe: true, color: 0xff0000}))

scene.add(mesh2)

ligui.add(mesh.rotation, 'x', 0, 2 )
ligui.add(mesh.rotation, 'y', 0, 2 )
ligui.add(mesh.rotation, 'z', 0, 2 )

function animate(){
    
    const c = clock.getDelta() * 10
    
    mesh.position.x += (0.05  * c);
    mesh.position.y = Math.sin(clock.getElapsedTime() * 2) * 5;
    
    mesh.rotation.x += (0.04 * c);
    mesh.rotation.y += (0.04 * c);
    mesh.rotation.z += (0.04 * c);
    
    if (mesh.position.x > 10)
        mesh.position.x = -20
    
    controls.update();

    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate(camera)