import * as THREE from 'three';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import * as gui from 'lil-gui';

const ligui = new gui.GUI(); 

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth/ window.innerHeight, 1, 500);

const canvas = document.getElementById('Renderer');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

//load textures
const texture_loader         = new THREE.TextureLoader(); 
const first_meta_texture     = texture_loader.load('./Materials/static/textures/matcaps/3.png');
const first_gradient_texture = texture_loader.load('./Materials/static/textures/gradients/3.jpg');

const door_alpha            = texture_loader.load('./Materials/static/textures/door/alpha.jpg');
const door_ambientOcclusion = texture_loader.load('./Materials/static/textures/door/ambientOcclusion.jpg');
const door_color            = texture_loader.load('./Materials/static/textures/door/color.jpg');
const door_height           = texture_loader.load('./Materials/static/textures/door/height.jpg');
const door_roughness        = texture_loader.load('./Materials/static/textures/door/roughness.jpg');
const door_normal           = texture_loader.load('./Materials/static/textures/door/normal.jpg');
const door_metalness        = texture_loader.load('./Materials/static/textures/door/metalness.jpg');

const material = new THREE.MeshStandardMaterial(/*{matcap:first_meta_texture}*/)
material.side   = THREE.DoubleSide
material.matcap = first_meta_texture;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.5, 50, 50), material);
const donut  = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.5, 16, 100 ), material);
const plane  = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), material);

// enviroment MApping
const rgbeLoader = new RGBELoader();

rgbeLoader.load('./Abstract/neon_photostudio_8k.pic', (enviroment_map) => {
    
    enviroment_map.mapping = THREE.EquirectangularReflectionMapping

    scene.background  = enviroment_map;
    scene.environment = enviroment_map;
})

donut.position.x += 5;
plane.position.x -= 5;

scene.add(sphere, donut, plane);
 
camera.position.set(0, 0, 26);

const controls = new OrbitControls(camera, canvas);

controls.update()

renderer.render(scene, camera);

ligui.add(material, 'roughness', 0, 1)
ligui.add(material, 'metalness', 0, 1)

const clock = new THREE.Clock();
function Animate() {
    const c = clock.getDelta();
    sphere.rotation.x += 0.1 * c;
    plane.rotation.x  += 0.1 * c;
    donut.rotation.x  += 0.1 * c;

    sphere.rotation.y -= 0.15 * c;
    plane.rotation.y  -= 0.15 * c;
    donut.rotation.y  -= 0.15 * c;


    controls.update();

    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    requestAnimationFrame(Animate)
}

Animate();
