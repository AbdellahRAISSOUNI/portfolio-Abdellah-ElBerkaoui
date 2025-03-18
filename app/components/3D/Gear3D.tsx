'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';

interface Gear3DProps extends GroupProps {
  size?: number;
  color?: string;
  rotationSpeed?: number;
  clockwise?: boolean;
  position?: [number, number, number];
  scrollProgress?: number;
}

// Custom gear geometry generator
const createGearGeometry = (
  radius: number = 1,
  teeth: number = 16,
  toothSize: number = 0.2,
  toothDepth: number = 0.1,
  thickness: number = 0.2
) => {
  const gear = new THREE.Group();
  
  // Base cylinder
  const baseGeometry = new THREE.CylinderGeometry(
    radius, 
    radius, 
    thickness, 
    32
  );
  
  // Create enhanced material for metallic look
  const baseMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1.5, // Enhance environment map reflections
    clearcoat: 0.5, // Add clearcoat for shiny look
    clearcoatRoughness: 0.2,
  });
  
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  gear.add(base);
  
  // Add teeth with enhanced geometry for better detail
  const toothWidth = (2 * Math.PI * radius) / teeth / 2;
  
  // Use a more sophisticated geometry for teeth
  const teethGroup = new THREE.Group();
  
  for (let i = 0; i < teeth; i++) {
    // Create tooth
    const toothGeometry = new THREE.BoxGeometry(
      toothWidth,
      toothDepth * radius,
      thickness + 0.02 // Slightly thicker than the base
    );
    
    // Use the same enhanced material
    const tooth = new THREE.Mesh(toothGeometry, baseMaterial);
    
    // Position each tooth around the gear
    const angle = (i / teeth) * Math.PI * 2;
    const x = Math.cos(angle) * (radius + toothDepth * radius / 2);
    const y = Math.sin(angle) * (radius + toothDepth * radius / 2);
    tooth.position.set(x, y, 0);
    tooth.rotation.z = angle;
    
    // Add bevel to teeth for more realistic look
    tooth.userData.originalPosition = { x, y, z: 0 };
    tooth.userData.angle = angle;
    
    teethGroup.add(tooth);
  }
  
  gear.add(teethGroup);
  
  // Add center hole
  const holeGeometry = new THREE.CylinderGeometry(
    radius * 0.2,
    radius * 0.2,
    thickness + 0.04, // Slightly thicker to avoid z-fighting
    16
  );
  
  // Make hole darker but still reflective
  const holeMaterial = new THREE.MeshPhysicalMaterial({
    color: '#111827',
    metalness: 0.7,
    roughness: 0.3,
    envMapIntensity: 0.8,
  });
  
  const hole = new THREE.Mesh(holeGeometry, holeMaterial);
  gear.add(hole);
  
  // Add central detail ring for aesthetic 
  const ringGeometry = new THREE.TorusGeometry(
    radius * 0.4, // Radius
    thickness * 0.1, // Tube radius
    16, // Radial segments
    32 // Tubular segments
  );
  
  // Use the same material as the base
  const ring = new THREE.Mesh(ringGeometry, baseMaterial);
  ring.rotation.x = Math.PI / 2; // Rotate to align with gear
  gear.add(ring);
  
  // Add bolt details
  const boltCount = 6;
  const boltRadius = radius * 0.6;
  
  for (let i = 0; i < boltCount; i++) {
    const boltGeometry = new THREE.CylinderGeometry(
      radius * 0.05, // Top radius
      radius * 0.05, // Bottom radius
      thickness + 0.05, // Height - protrude slightly
      8 // Segments
    );
    
    const bolt = new THREE.Mesh(boltGeometry, holeMaterial);
    const angle = (i / boltCount) * Math.PI * 2;
    const x = Math.cos(angle) * boltRadius;
    const y = Math.sin(angle) * boltRadius;
    bolt.position.set(x, y, 0);
    
    gear.add(bolt);
  }
  
  // Store component parts for animation
  (gear as any).teethGroup = teethGroup;
  (gear as any).ring = ring;
  
  return gear;
};

const Gear3D: React.FC<Gear3DProps> = ({
  size = 1,
  color = '#4f46e5',
  rotationSpeed = 0.5,
  clockwise = true,
  position = [0, 0, 0],
  scrollProgress = 0,
  ...props
}) => {
  const gear = useRef<Group>(null);
  const [gearObject, setGearObject] = useState<THREE.Group | null>(null);
  const [time, setTime] = useState(0);
  
  // Create the gear on component mount
  useEffect(() => {
    const teeth = Math.ceil(size * 8); // Scale teeth with size
    const newGear = createGearGeometry(
      size,
      teeth,
      0.2,
      0.1,
      size * 0.1
    );
    
    // Apply color to all meshes
    newGear.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial) {
        // Create a new material instance to avoid shared materials
        const newMaterial = child.material.clone();
        newMaterial.color.set(color);
        
        // Add emissive glow for better visibility
        newMaterial.emissive.set(color);
        newMaterial.emissiveIntensity = 0.2;
        
        child.material = newMaterial;
        
        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    setGearObject(newGear);
  }, [size, color]);
  
  // Add the generated gear to the ref group
  useEffect(() => {
    if (gear.current && gearObject) {
      // Clear previous gear if any
      while (gear.current.children.length > 0) {
        gear.current.remove(gear.current.children[0]);
      }
      
      // Add the new gear
      gear.current.add(gearObject);
    }
  }, [gearObject]);
  
  // Rotate the gear on each frame
  useFrame((state) => {
    if (!gear.current) return;
    
    // Update time
    setTime((prev) => prev + 0.01);
    
    // Base rotation is continuous
    const direction = clockwise ? 1 : -1;
    gear.current.rotation.z += (direction * rotationSpeed) / 100;
    
    // Add scroll-based rotation and effects
    if (scrollProgress !== undefined) {
      // This will make the gear respond to scrolling
      const scrollEffect = scrollProgress * Math.PI * direction * 2;
      
      // Apply more complex rotation combining continuous and scroll-based
      gear.current.rotation.z = (time * rotationSpeed * direction / 10) + scrollEffect;
      
      // Add slight tilt for 3D effect based on scroll
      gear.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2;
      gear.current.rotation.y = Math.cos(scrollProgress * Math.PI) * 0.2;
      
      // Scale effect - pulse slightly with scroll
      const scaleEffect = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.05;
      gear.current.scale.set(scaleEffect, scaleEffect, scaleEffect);
      
      // Make teeth move slightly for mechanical effect
      if (gearObject && (gearObject as any).teethGroup) {
        const teethGroup = (gearObject as any).teethGroup;
        teethGroup.children.forEach((tooth: THREE.Mesh, index: number) => {
          const originalPos = tooth.userData.originalPosition;
          if (originalPos) {
            // Slight outward movement based on scroll
            const outwardEffect = 1 + Math.sin(scrollProgress * Math.PI * 4 + index * 0.2) * 0.05;
            tooth.position.x = originalPos.x * outwardEffect;
            tooth.position.y = originalPos.y * outwardEffect;
          }
        });
      }
      
      // Change emissive intensity based on scroll
      gearObject?.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial) {
          child.material.emissiveIntensity = 0.2 + Math.abs(Math.sin(scrollProgress * Math.PI * 2)) * 0.3;
        }
      });
    }
  });
  
  return (
    <group 
      ref={gear} 
      position={position} 
      {...props}
    />
  );
};

export default Gear3D; 