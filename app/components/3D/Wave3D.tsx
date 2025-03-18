'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group, Vector3, BufferGeometry, LineBasicMaterial, Line as ThreeLine } from 'three';
import * as THREE from 'three';

interface Wave3DProps extends GroupProps {
  type?: 'sine' | 'square' | 'triangle' | 'sawtooth';
  amplitude?: number;
  frequency?: number;
  color?: string;
  thickness?: number;
  scrollProgress?: number;
  showLabels?: boolean;
}

const Wave3D: React.FC<Wave3DProps> = ({
  type = 'sine',
  amplitude = 1,
  frequency = 1,
  color = '#2dd4bf',
  thickness = 0.02,
  scrollProgress = 0,
  showLabels = true,
  ...props
}) => {
  const wave = useRef<Group>(null);
  const line = useRef<ThreeLine | null>(null);
  
  // Generate wave points using useMemo to avoid unnecessary recalculations
  const points = useMemo(() => {
    const segments = 50; // Reduced segment count for better performance
    const arr = [];
    
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 4 - 2; // Map to [-2, 2]
      let y = 0;
      
      try {
        switch (type) {
          case 'sine':
            y = Math.sin(x * Math.PI * frequency) * amplitude;
            break;
          case 'square':
            y = Math.sin(x * Math.PI * frequency) >= 0 
              ? amplitude 
              : -amplitude;
            break;
          case 'triangle':
            y = Math.asin(Math.sin(x * Math.PI * frequency)) * (2 * amplitude / Math.PI);
            break;
          case 'sawtooth':
            {
              const t = x * frequency;
              y = amplitude * ((t % 1) * 2 - 1);
            }
            break;
        }
      } catch (e) {
        console.error("Error calculating wave point:", e);
        y = 0;
      }
      
      // Ensure y is not NaN (can happen with some math operations)
      if (isNaN(y)) y = 0;
      
      arr.push(new Vector3(x, y, 0));
    }
    
    return arr;
  }, [type, amplitude, frequency]);
  
  // Create and update line
  useEffect(() => {
    if (wave.current) {
      // Remove old line if it exists
      if (line.current) {
        wave.current.remove(line.current);
      }
      
      // Create new line
      const geometry = new BufferGeometry().setFromPoints(points);
      const material = new LineBasicMaterial({
        color: color,
        linewidth: thickness * 10,
      });
      
      line.current = new ThreeLine(geometry, material);
      wave.current.add(line.current);
      
      // Create grid lines
      const gridMaterial = new LineBasicMaterial({ color: '#333333' });
      
      // X-axis
      const xAxisGeometry = new BufferGeometry().setFromPoints([
        new Vector3(-2, 0, 0),
        new Vector3(2, 0, 0)
      ]);
      const xAxis = new ThreeLine(xAxisGeometry, gridMaterial);
      wave.current.add(xAxis);
      
      // Y-axis
      const yAxisGeometry = new BufferGeometry().setFromPoints([
        new Vector3(0, -amplitude - 0.5, 0),
        new Vector3(0, amplitude + 0.5, 0)
      ]);
      const yAxis = new ThreeLine(yAxisGeometry, gridMaterial);
      wave.current.add(yAxis);
      
      // Create indicator point
      const sphereGeometry = new THREE.SphereGeometry(0.06, 16, 16);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1,
      });
      
      const indicator = new THREE.Mesh(sphereGeometry, sphereMaterial);
      wave.current.add(indicator);
      
      // Store indicator for animation
      (wave.current as any).indicator = indicator;
    }
    
    return () => {
      // Cleanup
      if (wave.current && line.current) {
        wave.current.remove(line.current);
        line.current = null;
      }
    };
  }, [points, color, thickness, amplitude]);
  
  // Update animations
  useFrame((state, delta) => {
    if (!wave.current) return;
    
    // Base rotation
    wave.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    
    // Update indicator position based on scroll
    const indicator = (wave.current as any).indicator;
    if (indicator && points.length > 0) {
      const positionIndex = Math.floor(Math.abs(scrollProgress || 0) * points.length);
      const safeIndex = Math.min(Math.max(0, positionIndex), points.length - 1);
      const position = points[safeIndex];
      
      if (position) {
        indicator.position.copy(position);
        
        // Pulse effect
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 1;
        indicator.scale.set(pulse, pulse, pulse);
      }
    }
    
    // Make the wave respond to scrolling
    if (scrollProgress !== undefined) {
      // Offset the wave based on scroll
      wave.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 0.2;
      
      // Scale effect
      const scaleEffect = 0.8 + Math.abs(Math.sin(scrollProgress * Math.PI)) * 0.4;
      wave.current.scale.set(scaleEffect, scaleEffect, scaleEffect);
      
      // Rotate based on scroll
      wave.current.rotation.y = scrollProgress * Math.PI * 2;
    }
  });
  
  return (
    <group ref={wave} {...props}>
      {/* Labels */}
      {showLabels && (
        <>
          <Text
            position={[2.2, 0, 0]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="left"
          >
            t
          </Text>
          <Text
            position={[0, amplitude + 0.7, 0]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
          >
            A
          </Text>
          <Text
            position={[-2.2, -amplitude - 0.3, 0]}
            fontSize={0.1}
            color="#999999"
            anchorX="right"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Wave
          </Text>
        </>
      )}
    </group>
  );
};

export default Wave3D; 