import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './App.css'



const ThreeDScene = () => {
  useEffect(() => {
    console.log('ThreeDScene useEffect is running');
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
    renderer.domElement.style.pointerEvents = 'auto'; // Ensure mouse dragging work, don't set to 'fixed'

    const container = document.getElementById('three-container');
    console.log('Container:', container);
    console.log('Renderer element:', renderer.domElement);
    container.appendChild(renderer.domElement);

    // Variables for drag interaction
    let isDragging = false;
    let previousMouseX = 0;
    let model = null;

    // Create a wrapper Object3D for the rocket model
    const rocketWrapper = new THREE.Object3D();
    rocketWrapper.position.set(0, -300, 0);

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

      // Adjust model position relative to wrapper so the pivot is at desired point (e.g., nose of rocket)
      model.position.set(0, -5000, 0); // Center the model relative to wrapper
      model.rotation.set(0, -15.65, 0);
      model.scale.set(2000, 2000, 2000); // Make the model larger

      // Add model to wrapper
      rocketWrapper.add(model);

      // Add wrapper to scene instead of model
      scene.add(rocketWrapper);
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
    pointLight.position.set(0, 5000, 0); // Position the light above and in front of the model
    scene.add(pointLight);

    // Add a spotlight for a focused beam
    const spotLight = new THREE.SpotLight(0xff00ff, 1.5); // Magenta light
    spotLight.position.set(0, -5000, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    scene.add(spotLight);

    // Drag-to-rotate implementation
    const onMouseDown = (event) => {
      console.log('Mouse down, model:', model);
      isDragging = true;
      previousMouseX = event.clientX;
    };

    const onMouseMove = (event) => {
      if (isDragging && model) {
        const deltaX = event.clientX - previousMouseX;
        const rotationSpeed = 0.005;
        rocketWrapper.rotation.y += deltaX * rotationSpeed;
        previousMouseX = event.clientX;
        console.log('Rotating model, new rotation:', rocketWrapper.rotation.y);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    console.log('Adding event listeners to renderer element');
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    console.log('Event listeners added');

    // Scroll-to-reveal implementation
    const minY = 300;
    const maxY = -6500;
    const Z = 500;
    
   

    /* CONCLUSION: wherever the camera it set, it should also look at that exact SAME spot (no tilting) 
                    so camera only TRANSLATE vertically from tip (minY) down bottom (maxY) */

    camera.position.set(0, minY, Z); // y= 400 above (just at nose cone tip)
    camera.lookAt(0, minY, Z);           // Keep lookAt fixed at the rocket's position => translate the camera down

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollRange = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollY / scrollRange, 1);
      
      // Add easing function for smoother movement
      const easedPercent = Math.pow(scrollPercent, 2); // ease out scrolling/ slower at the beginning
      
      camera.position.y = minY + (maxY - minY) * easedPercent;
      
      // Keep lookAt fixed at the rocket's position - don't move the target
    
      
      // Update progress bar
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.width = `${easedPercent * 100}%`;
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (model && !isDragging) {
        rocketWrapper.rotation.y += 0.002; // Automatic rotation around Y-axis
      }
      renderer.render(scene, camera);
    };

    // window.scrollTo({ top: 0, behavior: 'smooth' }); // Commented out to allow natural scrolling
    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return null; // No visible React elements; everything is rendered in the background
};

export default ThreeDScene;