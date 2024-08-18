// Scene Mesh(objects) Camera Renderer

// Mesh
// - geometry
// - material

// THREE  = require("three")

console.log("THREE           :", THREE);
console.log("Three.js version:", THREE.REVISION);

// Scene, Mesh (Geometry and Material), Camera, Renderer
const scene = new THREE.Scene();
console.log("Scene created:", scene);

const geometry = new THREE.BoxGeometry(2, 2, 2);
console.log("Geometry created:", geometry);

const material = new THREE.MeshBasicMaterial({ color: "blue" });
console.log("Material created:", material);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
console.log("Mesh added to scene:", mesh);

const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
};
console.log("Aspect ratio:", aspect);

const camera = new THREE.PerspectiveCamera(90, aspect.width / aspect.height, 1, 2000);
camera.position.z = 5;
scene.add(camera);
console.log("Camera created and added to scene:", camera);

document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.querySelector('.Renderer');
    console.log('Canvass selected:', canvas);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(aspect.width, aspect.height);
    console.log("Renderer created and size set:", renderer);
    
    function animate(){
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.003
        mesh.rotation.y += 0.003
        mesh.rotation.z += 0.003
    
        renderer.render(scene, camera);
        console.log("Scene rendered");
    }

    animate(camera)

});

