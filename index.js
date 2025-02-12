import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

// Scene, Camera, and Renderer
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3c0097);

const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
camera.position.set(0, 1, 3.25);
// Make the Camera Look at Earth (Ensures Moon & Spaceship are visible)
camera.lookAt(new THREE.Vector3(0, 0, 0));  // Look at center of scene (Earth)

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// 🔊 Load Background Music
// 🔊 Load Background Music
const listener = new THREE.AudioListener();
camera.add(listener);

const backgroundMusic = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

audioLoader.load('./audio/ValentinesTrack.mp3', function (buffer) {
    backgroundMusic.setBuffer(buffer);
    backgroundMusic.setLoop(true);  // Loop music
    backgroundMusic.setVolume(0.5); // Adjust volume
});

// ✅ Automatically Play Music When the User Clicks Anywhere
document.body.addEventListener('click', () => {
    if (!backgroundMusic.isPlaying) {
        backgroundMusic.play(); // ▶️ Start music
    }
}, { once: true }); // Ensures it only runs once




// Earth Group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);
const detail = 12;
const loader = new THREE.TextureLoader();
loader.load("./textures/nebula.jpg", function (texture) {
  scene.background = texture;
});

const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/00_earthmap1k.jpg"),
  specularMap: loader.load("./textures/02_earthspec1k.jpg"),
  bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
  bumpScale: 0.04,
});
// material.map.colorSpace = THREE.SRGBColorSpace;
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// const lightsMat = new THREE.MeshBasicMaterial({
//   map: loader.load("./textures/03_earthlights1k.jpg"),
//   blending: THREE.AdditiveBlending,
// });
// const lightsMesh = new THREE.Mesh(geometry, lightsMat);
// earthGroup.add(lightsMesh);

// const cloudsMat = new THREE.MeshStandardMaterial({
//   map: loader.load("./textures/04_earthcloudmap.jpg"),
//   transparent: true,
//   opacity: 0.8,
//   blending: THREE.AdditiveBlending,
//   alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
//   // alphaTest: 0.3,
// });
// const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
// cloudsMesh.scale.setScalar(1.003);
// earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

const stars = getStarfield({numStars: 2000});
scene.add(stars);


// 🌞 Sunlight (Directional Light) - Stronger
const sunLight = new THREE.DirectionalLight(0xffffff, 3.5); // Increased intensity
sunLight.position.set(-2, 0.5, 1.5);
sunLight.castShadow = true;  // Enable shadows
scene.add(sunLight);

// 🌍 Ambient Light - Brightens the whole scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Increase brightness
scene.add(ambientLight);

// 💡 Point Light near the Astronaut - Simulates light reflecting off their suit
const astronautLight = new THREE.PointLight(0xffffff, 2, 5);
astronautLight.position.set(-1.5, 2.5, -3); // Same as astronaut position
scene.add(astronautLight);

// 🚀 Point Light for Spaceship Thrusters - Adds glow effect
const spaceshipLight = new THREE.PointLight(0xffaa00, 3, 4); // Orange-ish glow
spaceshipLight.position.set(2, -1, -4);
scene.add(spaceshipLight);

const gltfLoader = new GLTFLoader();
let astronaut1, astronaut2, moon, spaceship, dog, fox, rose, heart;

setTimeout(() => {
  showSubtitle("Click anywhere for music", 4);
}, 500);
setTimeout(() => {
  showSubtitle("Two astronauts float in space, moving towards the moon...", 4);
}, 6000);
setTimeout(() => {
  showSubtitle("They gaze at the endless universe, feeling its vastness...", 6);
}, 12000);  
setTimeout(() => {
  showSubtitle("Everything seemed so small, yet so infinitely huge...", 8);
}, 19000);  
setTimeout(() => {
  showSubtitle("They didn't make it back to Earth, but...", 10);
}, 26000);  
setTimeout(() => {
  showSubtitle("...their hearts found each other, in every universe possible (and impossible) <3", 12);
}, 31000);  
setTimeout(() => {
  showSubtitle("Hai Maya ? :3", 15);
}, 35000); 
setTimeout(() => {
  showSubtitle("Zoom in on the moon :P", 18);
}, 40000); 

gltfLoader.load('./models/astronaut.glb', (gltf) => {
  astronaut1 = gltf.scene;
  
  // 🧑‍🚀 Scale Down for Proper Proportions
  astronaut1.scale.set(0.05, 0.05, 0.05);

  // 🧑‍🚀 Position the Astronaut Closer to the Camera
  astronaut1.position.set(0, 0.5, 2.5);  // (X = 0, Y = -0.5, Z = 4) → Closer to the camera
  astronaut1.rotation.y = Math.PI;
  scene.add(astronaut1);
});

gltfLoader.load('./models/astronaut.glb', (gltf) => {
  astronaut2 = gltf.scene;
  
  // 🧑‍🚀 Scale Down for Proper Proportions
  astronaut2.scale.set(0.05, 0.05, 0.05);

  // 🧑‍🚀 Position the Astronaut Closer to the Camera
  astronaut2.position.set(0.1, 0.5, 2.5);  // (X = 0, Y = -0.5, Z = 4) → Closer to the camera
  astronaut2.rotation.y = Math.PI;
  scene.add(astronaut2);
});

gltfLoader.load('./models/moon.glb', (gltf) => {
  moon = gltf.scene;
  moon.scale.set(0.004, 0.004, 0.004);
  moon.position.set(0, 0.4, 1.5);  // 🔄 Adjusted to match perspective
  scene.add(moon);
});

gltfLoader.load('./models/fox.glb', (gltf) => {
  fox = gltf.scene;
  fox.scale.set(0.03, 0.03, 0.03);
  fox.position.set(0.03, 0.71, 1.5);  
  scene.add(fox);
});

gltfLoader.load('./models/dog.glb', (gltf) => {
  dog = gltf.scene;
  dog.scale.set(0.005, 0.005, 0.005);
  dog.position.set(-0.03, 0.695, 1.5);  // 🔄 Adjusted to match perspective
  scene.add(dog);
});

gltfLoader.load('./models/rose.glb', (gltf) => {
  rose = gltf.scene;
  rose.scale.set(0.05, 0.05, 0.05);
  rose.position.set(0, 0.71, 1.5);  // 🔄 Adjusted to match perspective
  scene.add(rose);
});

gltfLoader.load('./models/heart.glb', (gltf) => {
  heart = gltf.scene;
  heart.scale.set(0.0008, 0.0008, 0.0008);
  heart.position.set(-0.5, 0.75,2);  // 🔄 Adjusted to match perspective
  scene.add(heart);
});

gltfLoader.load('./models/spaceship.glb', (gltf) => {
  spaceship = gltf.scene;
  spaceship.scale.set(0.2, 0.2, 0.2);
  spaceship.position.set(1, 0.6, 1);  
  spaceship.rotation.y = Math.PI;
  scene.add(spaceship);
});


function createSubtitleElement() {
  let subtitle = document.createElement("div");
  subtitle.id = "subtitle";
  subtitle.style.position = "absolute";
  subtitle.style.bottom = "20px";
  subtitle.style.width = "100%";
  subtitle.style.textAlign = "center";
  subtitle.style.fontSize = "24px";
  subtitle.style.fontFamily = "Arial, sans-serif";
  subtitle.style.color = "white";
  subtitle.style.background = "rgba(174, 174, 174, 0)";
  subtitle.style.padding = "10px";
  subtitle.style.opacity = "0";
  subtitle.style.transition = "opacity 0.5s ease-in-out";
  document.body.appendChild(subtitle);
}

// ✅ Call this function at the start of your script:
createSubtitleElement();

function showSubtitle(text, duration = 3) {
  let subtitle = document.getElementById("subtitle");

  subtitle.innerText = text;
  subtitle.style.opacity = "1";  // Show subtitle

  setTimeout(() => {
      subtitle.style.opacity = "0";  // Hide subtitle after duration
  }, duration * 1000);
}

function animate() {
    requestAnimationFrame(animate);

    // Earth Rotation
    earthMesh.rotation.y += 0.002;

    // Stars Rotation
    stars.rotation.y -= 0.0002;

    if (astronaut1) {
      const time = Date.now() * 0.0005;  // Creates slow, smooth motion
      astronaut1.position.y += Math.sin(time) * 0.0002;  // Very small vertical movement
    }

    if (astronaut2) {
      const time = Date.now() * 0.0005;  // Creates slow, smooth motion
      astronaut2.position.y += Math.sin(time) * 0.0002;  // Very small vertical movement
    }
    // Rotate Moon Slightly
    if (moon) {
        moon.rotation.y += 0.001;
    }

    // Rotate Spaceship for Effect
    if (spaceship) {
        spaceship.rotation.y += 0;
    }

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
function handleWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
