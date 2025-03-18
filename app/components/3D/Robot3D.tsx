'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshPhysicalMaterial, Group } from 'three';
import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';

interface Robot3DProps extends GroupProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  scrollProgress?: number;
}

// Custom robot model creator
const createRobotModel = (
  size: number = 1,
  primaryColor: string = '#4f46e5',
  secondaryColor: string = '#2dd4bf'
) => {
  const robot = new THREE.Group();
  
  // Enhanced Materials
  const primaryMaterial = new THREE.MeshPhysicalMaterial({
    color: primaryColor,
    metalness: 0.7,
    roughness: 0.3,
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
    envMapIntensity: 1.2,
  });
  
  const secondaryMaterial = new THREE.MeshPhysicalMaterial({
    color: secondaryColor,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5,
  });
  
  const darkMaterial = new THREE.MeshPhysicalMaterial({
    color: '#111827',
    metalness: 0.2,
    roughness: 0.8,
    clearcoat: 0.1,
  });
  
  const eyeMaterial = new THREE.MeshPhysicalMaterial({
    color: '#60a5fa',
    emissive: '#60a5fa',
    emissiveIntensity: 0.8,
    metalness: 1,
    roughness: 0.1,
    transmission: 0.6, // Glass-like effect for eyes
    ior: 1.5, // Refraction index
    thickness: 0.5,
  });
  
  const detailMaterial = new THREE.MeshPhysicalMaterial({
    color: '#94a3b8',
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 0.5,
  });
  
  // Head
  const head = new THREE.Group();
  
  // Main head with rounded edges
  const headGeometry = new THREE.BoxGeometry(size * 0.8, size * 0.6, size * 0.7, 8, 8, 8);
  const headMesh = new THREE.Mesh(headGeometry, primaryMaterial);
  head.add(headMesh);
  
  // Add head detail/panel
  const headPanelGeometry = new THREE.PlaneGeometry(size * 0.5, size * 0.3);
  const headPanel = new THREE.Mesh(headPanelGeometry, darkMaterial);
  headPanel.position.set(0, -size * 0.1, size * 0.36);
  head.add(headPanel);
  
  // Enhanced Eyes with depth
  const eyeOuterGeometry = new THREE.SphereGeometry(size * 0.1, 16, 16);
  const eyeInnerGeometry = new THREE.SphereGeometry(size * 0.07, 16, 16);
  
  // Left eye group
  const leftEyeGroup = new THREE.Group();
  const leftEyeOuter = new THREE.Mesh(eyeOuterGeometry, darkMaterial);
  const leftEye = new THREE.Mesh(eyeInnerGeometry, eyeMaterial);
  leftEye.position.z = size * 0.02;
  leftEyeGroup.add(leftEyeOuter);
  leftEyeGroup.add(leftEye);
  leftEyeGroup.position.set(-size * 0.2, size * 0.05, size * 0.36);
  head.add(leftEyeGroup);
  
  // Right eye group
  const rightEyeGroup = new THREE.Group();
  const rightEyeOuter = new THREE.Mesh(eyeOuterGeometry, darkMaterial);
  const rightEye = new THREE.Mesh(eyeInnerGeometry, eyeMaterial);
  rightEye.position.z = size * 0.02;
  rightEyeGroup.add(rightEyeOuter);
  rightEyeGroup.add(rightEye);
  rightEyeGroup.position.set(size * 0.2, size * 0.05, size * 0.36);
  head.add(rightEyeGroup);
  
  // Enhanced Antenna with more details
  const antennaBaseGeometry = new THREE.CylinderGeometry(size * 0.05, size * 0.05, size * 0.05, 16);
  const antennaBase = new THREE.Mesh(antennaBaseGeometry, detailMaterial);
  antennaBase.position.set(0, size * 0.3, 0);
  head.add(antennaBase);
  
  const antennaGeometry = new THREE.CylinderGeometry(size * 0.02, size * 0.02, size * 0.3, 16);
  const antenna = new THREE.Mesh(antennaGeometry, secondaryMaterial);
  antenna.position.set(0, size * 0.45, 0);
  head.add(antenna);
  
  const antennaTipGeometry = new THREE.SphereGeometry(size * 0.04, 16, 16);
  const antennaTip = new THREE.Mesh(antennaTipGeometry, eyeMaterial); // Use the glowing material
  antennaTip.position.set(0, size * 0.6, 0);
  head.add(antennaTip);
  
  // Add detailed ear/side components 
  const earGeometry = new THREE.BoxGeometry(size * 0.1, size * 0.2, size * 0.1);
  
  const leftEar = new THREE.Mesh(earGeometry, secondaryMaterial);
  leftEar.position.set(-size * 0.45, 0, 0);
  head.add(leftEar);
  
  const rightEar = new THREE.Mesh(earGeometry, secondaryMaterial);
  rightEar.position.set(size * 0.45, 0, 0);
  head.add(rightEar);
  
  head.position.set(0, size * 1.3, 0);
  robot.add(head);
  
  // Body
  const body = new THREE.Group();
  
  // Enhanced torso with more segments for better detail
  const torsoGeometry = new THREE.BoxGeometry(size * 0.9, size * 0.8, size * 0.5, 6, 6, 6);
  const torso = new THREE.Mesh(torsoGeometry, primaryMaterial);
  body.add(torso);
  
  // Add decorative strips to the torso
  const stripGeometry = new THREE.BoxGeometry(size * 0.92, size * 0.1, size * 0.52);
  const topStrip = new THREE.Mesh(stripGeometry, detailMaterial);
  topStrip.position.y = size * 0.35;
  body.add(topStrip);
  
  const bottomStrip = new THREE.Mesh(stripGeometry, detailMaterial);
  bottomStrip.position.y = -size * 0.35;
  body.add(bottomStrip);
  
  // Control panel with more depth
  const panelBorderGeometry = new THREE.BoxGeometry(size * 0.65, size * 0.45, size * 0.02);
  const panelBorder = new THREE.Mesh(panelBorderGeometry, detailMaterial);
  panelBorder.position.set(0, 0, size * 0.25);
  body.add(panelBorder);
  
  const panelGeometry = new THREE.PlaneGeometry(size * 0.6, size * 0.4);
  const panel = new THREE.Mesh(panelGeometry, darkMaterial);
  panel.position.set(0, 0, size * 0.26);
  body.add(panel);
  
  // Enhanced buttons with more detail
  const createButton = (
    color: string, 
    position: [number, number, number], 
    isGlowing: boolean = false
  ) => {
    const buttonGroup = new THREE.Group();
    
    // Button base
    const buttonBaseGeometry = new THREE.CylinderGeometry(size * 0.06, size * 0.06, size * 0.01, 32);
    const buttonBase = new THREE.Mesh(buttonBaseGeometry, detailMaterial);
    buttonGroup.add(buttonBase);
    
    // Button top
    const buttonGeometry = new THREE.CylinderGeometry(size * 0.05, size * 0.05, size * 0.02, 32);
    const buttonMaterial = isGlowing 
      ? eyeMaterial.clone() 
      : new THREE.MeshPhysicalMaterial({
          color: color,
          metalness: 0.2,
          roughness: 0.5,
          clearcoat: 0.8,
        });
    
    const buttonTop = new THREE.Mesh(buttonGeometry, buttonMaterial);
    buttonTop.position.y = size * 0.015;
    buttonGroup.add(buttonTop);
    
    // Position the whole button
    buttonGroup.position.set(position[0], position[1], position[2]);
    // Rotate to face forward
    buttonGroup.rotation.x = Math.PI / 2;
    
    return buttonGroup;
  };
  
  body.add(createButton(secondaryColor, [-size * 0.15, size * 0.1, size * 0.27]));
  body.add(createButton('#60a5fa', [size * 0.15, size * 0.1, size * 0.27], true));
  body.add(createButton(primaryColor, [-size * 0.15, -size * 0.1, size * 0.27]));
  body.add(createButton(secondaryColor, [size * 0.15, -size * 0.1, size * 0.27]));
  
  body.position.set(0, size * 0.4, 0);
  robot.add(body);
  
  // Enhanced Arms with joints
  const createArm = (isLeft: boolean) => {
    const arm = new THREE.Group();
    
    // Shoulder joint
    const shoulderGeometry = new THREE.SphereGeometry(size * 0.12, 16, 16);
    const shoulder = new THREE.Mesh(shoulderGeometry, detailMaterial);
    arm.add(shoulder);
    
    // Upper arm
    const upperArmGeometry = new THREE.BoxGeometry(size * 0.2, size * 0.3, size * 0.2, 4, 4, 4);
    const upperArm = new THREE.Mesh(upperArmGeometry, secondaryMaterial);
    upperArm.position.set(0, -size * 0.2, 0);
    arm.add(upperArm);
    
    // Elbow joint
    const elbowGeometry = new THREE.SphereGeometry(size * 0.1, 16, 16);
    const elbow = new THREE.Mesh(elbowGeometry, detailMaterial);
    elbow.position.set(0, -size * 0.4, 0);
    arm.add(elbow);
    
    // Lower arm
    const lowerArmGeometry = new THREE.BoxGeometry(size * 0.18, size * 0.3, size * 0.18, 4, 4, 4);
    const lowerArm = new THREE.Mesh(lowerArmGeometry, secondaryMaterial);
    lowerArm.position.set(0, -size * 0.6, 0);
    arm.add(lowerArm);
    
    // Hand with more detail
    const handBaseGeometry = new THREE.BoxGeometry(size * 0.25, size * 0.1, size * 0.25);
    const handBase = new THREE.Mesh(handBaseGeometry, primaryMaterial);
    handBase.position.set(0, -size * 0.8, 0);
    arm.add(handBase);
    
    // Fingers
    const fingerGeometry = new THREE.BoxGeometry(size * 0.05, size * 0.1, size * 0.05);
    const fingerPositions = [
      [-size * 0.08, -size * 0.85, size * 0.08],
      [0, -size * 0.85, size * 0.08],
      [size * 0.08, -size * 0.85, size * 0.08]
    ];
    
    fingerPositions.forEach(position => {
      const finger = new THREE.Mesh(fingerGeometry, detailMaterial);
      finger.position.set(position[0], position[1], position[2]);
      arm.add(finger);
    });
    
    // Position and rotation
    arm.position.set(isLeft ? -size * 0.55 : size * 0.55, size * 0.4, 0);
    arm.rotation.z = isLeft ? Math.PI / 24 : -Math.PI / 24; // Slight angle
    
    return arm;
  };
  
  const leftArm = createArm(true);
  robot.add(leftArm);
  
  const rightArm = createArm(false);
  robot.add(rightArm);
  
  // Enhanced Legs with joints
  const createLeg = (isLeft: boolean) => {
    const leg = new THREE.Group();
    
    // Hip joint
    const hipGeometry = new THREE.SphereGeometry(size * 0.12, 16, 16);
    const hip = new THREE.Mesh(hipGeometry, detailMaterial);
    leg.add(hip);
    
    // Upper leg
    const upperLegGeometry = new THREE.BoxGeometry(size * 0.25, size * 0.4, size * 0.25, 4, 4, 4);
    const upperLeg = new THREE.Mesh(upperLegGeometry, primaryMaterial);
    upperLeg.position.set(0, -size * 0.25, 0);
    leg.add(upperLeg);
    
    // Knee joint
    const kneeGeometry = new THREE.SphereGeometry(size * 0.1, 16, 16);
    const knee = new THREE.Mesh(kneeGeometry, detailMaterial);
    knee.position.set(0, -size * 0.5, 0);
    leg.add(knee);
    
    // Lower leg
    const lowerLegGeometry = new THREE.BoxGeometry(size * 0.22, size * 0.4, size * 0.22, 4, 4, 4);
    const lowerLeg = new THREE.Mesh(lowerLegGeometry, primaryMaterial);
    lowerLeg.position.set(0, -size * 0.75, 0);
    leg.add(lowerLeg);
    
    // Foot with more detail
    const footGeometry = new THREE.BoxGeometry(size * 0.3, size * 0.1, size * 0.4);
    const foot = new THREE.Mesh(footGeometry, secondaryMaterial);
    foot.position.set(0, -size * 0.95, size * 0.08);
    leg.add(foot);
    
    // Ankle detail
    const ankleGeometry = new THREE.BoxGeometry(size * 0.24, size * 0.05, size * 0.26);
    const ankle = new THREE.Mesh(ankleGeometry, detailMaterial);
    ankle.position.set(0, -size * 0.9, size * 0.02);
    leg.add(ankle);
    
    // Position
    leg.position.set(isLeft ? -size * 0.25 : size * 0.25, 0, 0);
    
    return leg;
  };
  
  const leftLeg = createLeg(true);
  robot.add(leftLeg);
  
  const rightLeg = createLeg(false);
  robot.add(rightLeg);
  
  // Store references to movable parts with more specific parts for improved animation
  (robot as any).head = head;
  (robot as any).leftArm = leftArm;
  (robot as any).rightArm = rightArm;
  (robot as any).leftLeg = leftLeg;
  (robot as any).rightLeg = rightLeg;
  (robot as any).leftEye = leftEyeGroup;
  (robot as any).rightEye = rightEyeGroup;
  (robot as any).antennaTip = antennaTip;
  
  return robot;
};

const Robot3D: React.FC<Robot3DProps> = ({
  size = 1,
  primaryColor = '#4f46e5',
  secondaryColor = '#2dd4bf',
  scrollProgress = 0,
  ...props
}) => {
  const robotRef = useRef<Group>(null);
  const [robotModel, setRobotModel] = useState<THREE.Group | null>(null);
  const [time, setTime] = useState(0);
  
  // Create the robot on component mount
  useEffect(() => {
    const newRobot = createRobotModel(size, primaryColor, secondaryColor);
    setRobotModel(newRobot);
  }, [size, primaryColor, secondaryColor]);
  
  // Add the generated robot to the ref group
  useEffect(() => {
    if (robotRef.current && robotModel) {
      // Clear previous robot if any
      while (robotRef.current.children.length > 0) {
        robotRef.current.remove(robotRef.current.children[0]);
      }
      
      // Add the new robot
      robotRef.current.add(robotModel);
    }
  }, [robotModel]);
  
  // Animate the robot with enhanced animations
  useFrame((state) => {
    if (!robotRef.current || !robotModel) return;
    
    // Increment time for continuous animation
    setTime((prev) => prev + 0.01);
    
    // Get robot parts
    const head = (robotModel as any).head;
    const leftArm = (robotModel as any).leftArm;
    const rightArm = (robotModel as any).rightArm;
    const leftLeg = (robotModel as any).leftLeg;
    const rightLeg = (robotModel as any).rightLeg;
    const leftEye = (robotModel as any).leftEye;
    const rightEye = (robotModel as any).rightEye;
    const antennaTip = (robotModel as any).antennaTip;
    
    // Base animations that happen continuously with more complexity
    if (head) {
      // More natural head movement
      head.rotation.y = Math.sin(time * 0.5) * 0.2; // Looking around
      head.rotation.x = Math.sin(time * 0.3) * 0.05; // Slight up/down motion
      head.position.y = size * 1.3 + Math.sin(time * 0.8) * 0.01; // Subtle bobbing
    }
    
    if (leftArm && rightArm) {
      // More dynamic arm swing
      const leftArmSwing = Math.sin(time * 0.7) * 0.15;
      const rightArmSwing = Math.sin(time * 0.7 + 0.5) * 0.15; // Offset for more natural motion
      
      leftArm.rotation.z = Math.PI / 24 + leftArmSwing;
      rightArm.rotation.z = -Math.PI / 24 - rightArmSwing;
      
      // Add some forward/backward motion
      leftArm.rotation.x = Math.sin(time * 0.5) * 0.05;
      rightArm.rotation.x = Math.sin(time * 0.5 + 0.8) * 0.05;
    }
    
    // Subtle leg movement
    if (leftLeg && rightLeg) {
      leftLeg.rotation.x = Math.sin(time * 0.6) * 0.03;
      rightLeg.rotation.x = Math.sin(time * 0.6 + Math.PI) * 0.03; // Out of phase with left leg
    }
    
    // Eye glow pulsing
    if (leftEye && rightEye) {
      // Find the eyes within the groups and update their materials
      leftEye.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial) {
          if (child.material.emissive) {
            // Breathing eye glow
            child.material.emissiveIntensity = 0.6 + Math.sin(time * 2) * 0.2;
          }
        }
      });
      
      rightEye.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial) {
          if (child.material.emissive) {
            // Slightly offset from left eye for visual interest
            child.material.emissiveIntensity = 0.6 + Math.sin(time * 2 + 0.2) * 0.2;
          }
        }
      });
    }
    
    // Antenna tip glow
    if (antennaTip && antennaTip.material instanceof THREE.MeshPhysicalMaterial) {
      antennaTip.material.emissiveIntensity = 0.8 + Math.sin(time * 3) * 0.4;
    }
    
    // Scroll-based animations with more complexity
    if (scrollProgress !== undefined) {
      // Enhanced rotation with slight tilt
      robotRef.current.rotation.y = scrollProgress * Math.PI * 2;
      robotRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.1;
      
      // Enhanced waving animation
      if (rightArm) {
        // More natural waving motion
        const wavePhase = Math.max(0, Math.sin(scrollProgress * Math.PI * 4 - Math.PI/2));
        rightArm.rotation.z = -Math.PI / 24 - wavePhase * 0.7;
        rightArm.rotation.y = wavePhase * 0.3; // Add twist to the wave
      }
      
      // Enhanced jump with preparation and landing phases
      const jumpHeight = Math.sin(scrollProgress * Math.PI * 2) * 0.3;
      robotRef.current.position.y = Math.max(0, jumpHeight); // Only jump up, not down
      
      // Enhanced leg movement during jump
      if (leftLeg && rightLeg) {
        // Prepare for jump, bend knees
        const jumpPrep = Math.cos(scrollProgress * Math.PI * 2) * 0.2;
        leftLeg.rotation.x = jumpHeight > 0.05 ? jumpHeight * 3 : jumpPrep;
        rightLeg.rotation.x = jumpHeight > 0.05 ? jumpHeight * 3 : jumpPrep;
      }
      
      // Enhanced eye glow intensity changes with scroll
      if (leftEye && rightEye) {
        const emissiveIntensity = 0.5 + Math.abs(Math.sin(scrollProgress * Math.PI * 4)) * 2;
        
        // Apply to both eye groups
        leftEye.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial) {
            if (child.material.emissive) {
              child.material.emissiveIntensity = emissiveIntensity;
            }
          }
        });
        
        rightEye.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial) {
            if (child.material.emissive) {
              child.material.emissiveIntensity = emissiveIntensity;
            }
          }
        });
      }
      
      // Antenna tip glows brighter with scroll
      if (antennaTip && antennaTip.material instanceof THREE.MeshPhysicalMaterial) {
        antennaTip.material.emissiveIntensity = 0.8 + Math.abs(Math.sin(scrollProgress * Math.PI * 3)) * 1.5;
      }
      
      // Scale robot slightly based on scroll for "breathing" effect
      const scaleEffect = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.03;
      robotRef.current.scale.set(scaleEffect, scaleEffect, scaleEffect);
    }
  });
  
  return (
    <group 
      ref={robotRef} 
      {...props}
    />
  );
};

export default Robot3D; 