import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './App.css'



const ThreeDScene = () => {
  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();

    // const gridHelper = new THREE.GridHelper(100, 100, 'black', 'black');
    // scene.add(gridHelper);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha allows transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed'; // Use fixed positioning
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const container = document.getElementById('three-container');
    console.log(container);
    container.appendChild(renderer.domElement);

    // Variables for drag interaction
    let isDragging = false;
    let previousMouseX = 0;
    let model = null;

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load('/Lemaire.glb', (gltf) => {
      model = gltf.scene;

      const textureLoader = new THREE.TextureLoader();

      model.traverse((child) => {
        if (child.isMesh) {
          console.log('Material:', child.material);
          child.material.wireframe = false;
          child.material.roughness = 0.5;
        }
      });

      model.scale.set(2000, 2000, 2000); // Make the model larger
      model.position.set(0, -5000, 0); // Center the model
      model.rotation.set(0, -15.65, 0);
      scene.add(model);
    });


    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Soft white light
    scene.add(ambientLight);


    // Add a directional light to highlight the model
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Bright white light
    directionalLight.position.set(10, 10, 10); // Position the light above and to the side
    scene.add(directionalLight);

    // Add a point light for additional illumination
    const pointLight = new THREE.PointLight(0xffffff, 54351.413, 1000, 2); // Bright white light
    pointLight.position.set(0, 200, 200); // Position the light above and in front of the model
    scene.add(pointLight);

    // Add a spotlight for a focused beam
    const spotLight = new THREE.SpotLight(0xff00ff, 1.5); // Magenta light
    spotLight.position.set(-200, 200, 200);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    scene.add(spotLight);

    // Mouse event handlers for drag-to-rotate
    const onMouseDown = (event) => {
      isDragging = true;
      previousMouseX = event.clientX;
    };

    const onMouseMove = (event) => {
      if (isDragging && model) {
        const deltaX = event.clientX - previousMouseX;
        // Adjust rotation speed/sensitivity here
        model.rotation.y += deltaX * 0.005;
        previousMouseX = event.clientX;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Position the camera
    camera.position.set(0, 300, 500); // Start zoomed near the nose cone
    camera.lookAt(0, 0, 0);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);


      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // scroll to move camera down and reveal rocket
    const handleScroll = () => {
      const scrollY = window.scrollY;
            // Move camera Y from above rocket (400) to below rocket (-400) based on scroll
      const minY = -400;
      const maxY = 400;
      const scrollRange = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollY / scrollRange, 1);
      camera.position.y = maxY - (maxY - minY) * scrollPercent;
      camera.lookAt(0, 0, 0);
    };
    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return null; // No visible React elements; everything is rendered in the background
};

export default ThreeDScene;