'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface RotatingModelProps {
  className?: string;
}

const RotatingModel: React.FC<RotatingModelProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene
    const scene = new THREE.Scene();
    
    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.x = 2;
    
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Clean up any existing canvas
    if (containerRef.current.querySelector('canvas')) {
      containerRef.current.removeChild(containerRef.current.querySelector('canvas')!);
    }
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Create a mechatronics-themed object (a robotic arm-like structure)
    const armGroup = new THREE.Group();
    
    // Base
    const baseGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x14b8a6, 
      emissive: 0x042f2e,
      specular: 0x2dd4bf,
      shininess: 30
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -2;
    armGroup.add(base);
    
    // First joint
    const joint1Geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const joint1Material = new THREE.MeshPhongMaterial({ 
      color: 0x4f46e5,
      emissive: 0x1e1b4b,
      specular: 0x818cf8,
      shininess: 30
    });
    const joint1 = new THREE.Mesh(joint1Geometry, joint1Material);
    joint1.position.y = -1.7;
    armGroup.add(joint1);
    
    // First arm segment
    const arm1Geometry = new THREE.BoxGeometry(0.4, 1.5, 0.4);
    const arm1Material = new THREE.MeshPhongMaterial({ 
      color: 0x14b8a6,
      emissive: 0x042f2e,
      specular: 0x2dd4bf,
      shininess: 30
    });
    const arm1 = new THREE.Mesh(arm1Geometry, arm1Material);
    arm1.position.y = -0.9;
    armGroup.add(arm1);
    
    // Second joint
    const joint2Geometry = new THREE.SphereGeometry(0.4, 32, 32);
    const joint2Material = new THREE.MeshPhongMaterial({ 
      color: 0x4f46e5,
      emissive: 0x1e1b4b,
      specular: 0x818cf8,
      shininess: 30
    });
    const joint2 = new THREE.Mesh(joint2Geometry, joint2Material);
    joint2.position.y = -0.1;
    armGroup.add(joint2);
    
    // Second arm segment
    const arm2Geometry = new THREE.BoxGeometry(0.3, 1.2, 0.3);
    const arm2Material = new THREE.MeshPhongMaterial({ 
      color: 0x14b8a6,
      emissive: 0x042f2e,
      specular: 0x2dd4bf,
      shininess: 30
    });
    const arm2 = new THREE.Mesh(arm2Geometry, arm2Material);
    arm2.position.y = 0.5;
    arm2.rotation.z = Math.PI / 6;
    armGroup.add(arm2);
    
    // Gripper base
    const gripperBaseGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const gripperBaseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4f46e5,
      emissive: 0x1e1b4b,
      specular: 0x818cf8,
      shininess: 30
    });
    const gripperBase = new THREE.Mesh(gripperBaseGeometry, gripperBaseMaterial);
    gripperBase.position.y = 1.1;
    gripperBase.position.x = 0.3;
    armGroup.add(gripperBase);
    
    // Gripper fingers
    const finger1Geometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
    const finger1Material = new THREE.MeshPhongMaterial({ 
      color: 0x14b8a6,
      emissive: 0x042f2e,
      specular: 0x2dd4bf,
      shininess: 30
    });
    const finger1 = new THREE.Mesh(finger1Geometry, finger1Material);
    finger1.position.y = 1.3;
    finger1.position.x = 0.2;
    armGroup.add(finger1);
    
    const finger2Geometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
    const finger2Material = new THREE.MeshPhongMaterial({ 
      color: 0x14b8a6,
      emissive: 0x042f2e,
      specular: 0x2dd4bf,
      shininess: 30
    });
    const finger2 = new THREE.Mesh(finger2Geometry, finger2Material);
    finger2.position.y = 1.3;
    finger2.position.x = 0.4;
    armGroup.add(finger2);
    
    scene.add(armGroup);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x2dd4bf, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the arm
      armGroup.rotation.y += 0.01;
      
      // Offset the entire group to the right
      armGroup.position.x = 1.5;
      
      // Simulate arm movement
      const time = Date.now() * 0.001;
      arm2.rotation.z = Math.PI / 6 + Math.sin(time) * 0.2;
      
      // Gripper open/close animation
      finger1.position.x = 0.2 - Math.sin(time * 2) * 0.05;
      finger2.position.x = 0.4 + Math.sin(time * 2) * 0.05;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full min-h-[300px] ${className}`}
    />
  );
};

export default RotatingModel; 