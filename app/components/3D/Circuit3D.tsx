'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';

interface Circuit3DProps extends GroupProps {
  complexity?: number;
  primaryColor?: string;
  secondaryColor?: string;
  scrollProgress?: number;
}

// Custom circuit model creator
const createCircuitModel = (
  complexity: number = 3,
  primaryColor: string = '#4f46e5',
  secondaryColor: string = '#2dd4bf'
) => {
  const circuit = new THREE.Group();
  
  // Enhanced Materials with modern look
  const primaryMaterial = new THREE.MeshPhysicalMaterial({
    color: primaryColor,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.95,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    reflectivity: 0.8,
    transmission: 0.2,
  });
  
  const secondaryMaterial = new THREE.MeshPhysicalMaterial({
    color: secondaryColor,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.95,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    reflectivity: 0.8,
    transmission: 0.2,
  });
  
  const baseMaterial = new THREE.MeshPhysicalMaterial({
    color: '#111827',
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
  });
  
  // Create a sleek base plate with beveled edges
  const baseGeometry = new THREE.BoxGeometry(4, 0.1, 4);
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  circuit.add(base);
  
  // Add a grid pattern of lines
  const gridSize = complexity * 2;
  const cellSize = 3.6 / gridSize;
  
  // Create horizontal and vertical lines
  for (let i = 0; i <= gridSize; i++) {
    const lineGeometry = new THREE.BoxGeometry(3.6, 0.02, 0.02);
    const line = new THREE.Mesh(lineGeometry, i % 2 === 0 ? primaryMaterial : secondaryMaterial);
    line.position.set(0, 0.06, -1.8 + (i * cellSize));
    circuit.add(line);
    
    const vertLineGeometry = new THREE.BoxGeometry(0.02, 0.02, 3.6);
    const vertLine = new THREE.Mesh(vertLineGeometry, i % 2 === 0 ? secondaryMaterial : primaryMaterial);
    vertLine.position.set(-1.8 + (i * cellSize), 0.06, 0);
    circuit.add(vertLine);
  }
  
  // Add glowing nodes at intersections
  const nodes: THREE.Mesh[] = [];
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      if (Math.random() > 0.7) { // Only add nodes at some intersections
        const nodeGeometry = new THREE.SphereGeometry(0.04, 16, 16);
        const nodeMaterial = new THREE.MeshPhysicalMaterial({
          color: Math.random() > 0.5 ? primaryColor : secondaryColor,
          emissive: Math.random() > 0.5 ? primaryColor : secondaryColor,
          emissiveIntensity: 1,
          metalness: 1,
          roughness: 0,
          transparent: true,
          opacity: 0.9,
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(
          -1.8 + (i * cellSize),
          0.08,
          -1.8 + (j * cellSize)
        );
        nodes.push(node);
        circuit.add(node);
      }
    }
  }
  
  // Add floating data particles
  const particles: THREE.Mesh[] = [];
  for (let i = 0; i < complexity * 5; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMaterial = new THREE.MeshPhysicalMaterial({
      color: Math.random() > 0.5 ? primaryColor : secondaryColor,
      emissive: Math.random() > 0.5 ? primaryColor : secondaryColor,
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.8,
    });
    
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(
      (Math.random() - 0.5) * 3.6,
      0.1 + Math.random() * 0.3,
      (Math.random() - 0.5) * 3.6
    );
    particle.userData.speed = 0.01 + Math.random() * 0.02;
    particle.userData.offset = Math.random() * Math.PI * 2;
    particles.push(particle);
    circuit.add(particle);
  }
  
  // Store animation elements
  (circuit as any).nodes = nodes;
  (circuit as any).particles = particles;
  
  return circuit;
};

const Circuit3D: React.FC<Circuit3DProps> = ({
  complexity = 3,
  primaryColor = '#4f46e5',
  secondaryColor = '#2dd4bf',
  scrollProgress = 0,
  ...props
}) => {
  const circuit = useRef<Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [time, setTime] = useState(0);
  
  // Create the circuit model on mount
  useEffect(() => {
    const newCircuit = createCircuitModel(complexity, primaryColor, secondaryColor);
    setModel(newCircuit);
  }, [complexity, primaryColor, secondaryColor]);
  
  // Add the generated circuit to the ref group
  useEffect(() => {
    if (circuit.current && model) {
      // Clear previous circuit if any
      while (circuit.current.children.length > 0) {
        circuit.current.remove(circuit.current.children[0]);
      }
      
      // Add the new circuit
      circuit.current.add(model);
    }
  }, [model]);
  
  // Animate the circuit
  useFrame((state) => {
    if (!circuit.current || !model) return;
    
    // Update time
    setTime((prev) => prev + 0.01);
    
    // Get scroll factor
    const scrollFactor = Math.max(0, Math.min(1, scrollProgress || 0));
    
    // Smooth rotation
    circuit.current.rotation.y = time * 0.2 + scrollFactor * Math.PI * 2;
    circuit.current.rotation.x = Math.sin(scrollFactor * Math.PI) * 0.3;
    
    // Animate nodes
    const nodes = (model as any).nodes;
    if (nodes) {
      nodes.forEach((node: THREE.Mesh, index: number) => {
        if (node.material) {
          const pulseFreq = 1 + scrollFactor * 2;
          const pulseFactor = (Math.sin(time * pulseFreq + index * 0.5) + 1) / 2;
          
          if ('emissiveIntensity' in node.material) {
            node.material.emissiveIntensity = 0.5 + pulseFactor * 1.5;
          }
          
          // Subtle floating effect
          node.position.y = 0.08 + Math.sin(time * 2 + index) * 0.02;
        }
      });
    }
    
    // Animate particles
    const particles = (model as any).particles;
    if (particles) {
      particles.forEach((particle: THREE.Mesh) => {
        // Floating motion
        particle.position.y = 0.1 + 
          Math.sin(time * particle.userData.speed * 5 + particle.userData.offset) * 0.3;
        
        // Circular motion
        const radius = 0.2 + Math.sin(time + particle.userData.offset) * 0.1;
        particle.position.x += Math.sin(time * particle.userData.speed) * 0.01;
        particle.position.z += Math.cos(time * particle.userData.speed) * 0.01;
        
        // Keep particles within bounds
        if (Math.abs(particle.position.x) > 1.8) {
          particle.position.x *= -0.9;
        }
        if (Math.abs(particle.position.z) > 1.8) {
          particle.position.z *= -0.9;
        }
        
        // Scale with scroll
        const scale = 1 + scrollFactor * 0.5;
        particle.scale.set(scale, scale, scale);
      });
    }
    
    // Scale effect based on scroll
    const scale = 1 + scrollFactor * 0.2;
    circuit.current.scale.set(scale, scale, scale);
  });
  
  return <group ref={circuit} {...props} />;
};

export default Circuit3D; 