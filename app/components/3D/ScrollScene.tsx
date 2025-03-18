'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Sparkles, 
  Stars,
  ContactShadows
} from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Gear3D from './Gear3D';
import Robot3D from './Robot3D';
import Circuit3D from './Circuit3D';
import Wave3D from './Wave3D';

interface ScrollSceneProps {
  type: 'gears' | 'robot' | 'circuit' | 'wave';
  id: string;
  height?: string;
}

// Simple fallback component to display when 3D components are loading
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center text-primary-400">
    <div className="animate-pulse text-lg">Loading 3D Scene...</div>
  </div>
);

// Enhanced scene wrapper with lighting and effects
const EnhancedScene = ({ children, type }: { children: React.ReactNode, type: string }) => {
  const { gl } = useThree();
  
  // Configure renderer for better quality
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl]);
  
  return (
    <>
      {/* Ambient background light */}
      <ambientLight intensity={0.4} />
      
      {/* Main key light */}
      <spotLight 
        position={[5, 10, 8]} 
        intensity={0.8} 
        angle={0.4}
        penumbra={0.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light */}
      <pointLight position={[-5, 5, 5]} intensity={0.3} />
      
      {/* Accent light with color matching theme */}
      <pointLight position={[0, -5, -5]} intensity={0.4} color="#4f46e5" />
      
      {/* Environment for reflections - different for each type */}
      {type === 'gears' && <Environment preset="warehouse" background={false} />}
      {type === 'robot' && <Environment preset="city" background={false} />}
      {type === 'circuit' && <Environment preset="night" background={false} />}
      {type === 'wave' && <Environment preset="sunset" background={false} />}
      
      {/* Background particles based on type */}
      {type === 'circuit' && (
        <Stars 
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0.5}
          fade
          speed={0.5}
        />
      )}
      
      {/* Add contact shadows for grounding */}
      {(type === 'gears' || type === 'robot') && (
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={2}
          color="#111111"
        />
      )}
      
      {/* Scene content */}
      {children}
    </>
  );
};

// Error boundary for Three.js errors
class ThreeJSErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center text-red-500">
          <div>Could not load 3D component. Please try refreshing.</div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Ambient particles that react to scroll
const AmbientParticles = ({ scrollProgress = 0, type }: { scrollProgress: number, type: string }) => {
  let count = 150;
  let scale = 8;
  let size = 1;
  let speed = 0.3;
  let baseColor = "#4f46e5";
  
  // Customize based on type
  if (type === 'robot') {
    count = 120;
    scale = 10;
    baseColor = "#2dd4bf";
  } else if (type === 'circuit') {
    count = 200;
    scale = 12;
    speed = 0.5;
  } else if (type === 'wave') {
    count = 100;
    scale = 6;
    size = 0.8;
  }
  
  // Adjust speed based on scroll
  const dynamicSpeed = speed + scrollProgress * 0.5;
  
  return (
    <Sparkles 
      count={count} 
      scale={scale} 
      size={size} 
      speed={dynamicSpeed} 
      opacity={0.2 + scrollProgress * 0.1} 
      color={baseColor} 
    />
  );
};

const ScrollScene: React.FC<ScrollSceneProps> = ({ 
  type, 
  id, 
  height = '50vh'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Safe scroll progress value that's guaranteed to be between 0-1
  const safeScrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const currentScrollValue = safeScrollProgress.get();
  
  // Make sure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Render the appropriate 3D component based on type
  const render3DContent = (progress: number) => {
    try {
      switch (type) {
        case 'gears':
          return (
            <>
              <AmbientParticles scrollProgress={progress} type={type} />
              <group rotation={[0, progress * Math.PI * 2, 0]}>
                <Gear3D 
                  size={1.2}
                  position={[-1.5, 0.5, 0]} 
                  color="#4f46e5" 
                  scrollProgress={progress}
                  clockwise={true}
                  rotationSpeed={0.6 + progress}
                />
                <Gear3D 
                  size={1}
                  position={[0, 0, 0.5]} 
                  color="#2dd4bf"
                  scrollProgress={progress} 
                  clockwise={false}
                  rotationSpeed={0.7 + progress}
                />
                <Gear3D 
                  size={0.7}
                  position={[1.2, -0.7, -0.3]} 
                  color="#4f46e5"
                  scrollProgress={progress}
                  clockwise={true}
                  rotationSpeed={0.9 + progress}
                />
                <Gear3D 
                  size={0.4}
                  position={[0.8, 0.8, -0.2]} 
                  color="#60a5fa"
                  scrollProgress={progress}
                  clockwise={false}
                  rotationSpeed={1.2 + progress}
                />
              </group>
            </>
          );
          
        case 'robot':
          return (
            <>
              <AmbientParticles scrollProgress={progress} type={type} />
              <group position={[0, -1.3, 0]} rotation={[0, progress * Math.PI * 2, 0]}>
                <Robot3D 
                  size={1.6} 
                  primaryColor="#4f46e5" 
                  secondaryColor="#2dd4bf"
                  scrollProgress={progress}
                  position={[0, 0, 0]}
                />
              </group>
            </>
          );
          
        case 'circuit':
          return (
            <>
              <AmbientParticles scrollProgress={progress} type={type} />
              <group rotation={[0, progress * Math.PI * 2, 0]}>
                <Circuit3D 
                  complexity={4}
                  primaryColor="#4f46e5" 
                  secondaryColor="#2dd4bf"
                  scrollProgress={progress}
                  position={[0, -0.2, 0]}
                />
              </group>
            </>
          );
          
        case 'wave':
          // Ensure progress is a valid number between 0-1
          const safeProgress = typeof progress === 'number' ? 
            Math.max(0, Math.min(1, progress)) : 0;
            
          return (
            <>
              <AmbientParticles scrollProgress={safeProgress} type={type} />
              <mesh position={[0, 0, -3]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial 
                  color="#060818" 
                  metalness={0.8}
                  roughness={0.5}
                />
              </mesh>
              <group rotation={[0, safeProgress * Math.PI * 2, 0]}>
                <Wave3D 
                  type="sine"
                  amplitude={0.7}
                  frequency={1 + safeProgress}
                  color="#2dd4bf"
                  position={[0, 0.8, 0]}
                  scrollProgress={safeProgress}
                />
              </group>
            </>
          );
          
        default:
          return null;
      }
    } catch (error) {
      console.error("Error rendering 3D content:", error);
      // Return a simple fallback mesh if rendering fails
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
      );
    }
  };
  
  // Only render on client-side
  if (!isClient) return null;
  
  // Camera settings based on type
  const cameraPosition: [number, number, number] = [0, 0, 5];
  let fov = 45;
  
  if (type === 'robot') {
    fov = 35; // Tighter view for robot with wider field of view
    cameraPosition[2] = 6; // Move camera further away to see the full robot
  } else if (type === 'circuit') {
    fov = 50; // Wider view for circuit
  } else if (type === 'gears') {
    fov = 40; // Better view for gears
  }
  
  return (
    <motion.div 
      id={id}
      ref={containerRef}
      className="w-full relative"
      style={{ height }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-16 z-10 bg-gradient-to-b from-dark to-transparent pointer-events-none"></div>
      
      {/* Canvas for 3D rendering */}
      <ThreeJSErrorBoundary>
        <Canvas 
          className="w-full h-full"
          shadows
          dpr={[1, 2]} // Responsive pixel ratio
          camera={{ position: cameraPosition, fov: fov }}
          gl={{ 
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true 
          }}
        >
          <Suspense fallback={null}>
            {/* Enhanced scene wrapper */}
            <EnhancedScene type={type}>
              {/* Render the appropriate 3D model */}
              {render3DContent(currentScrollValue)}
              
              {/* Controls with full rotation enabled */}
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate={type === 'circuit'}
                autoRotateSpeed={0.5}
                // Allow full rotation
                maxPolarAngle={Math.PI}
                minPolarAngle={0}
                rotateSpeed={0.8}
                dampingFactor={0.1}
              />
            </EnhancedScene>
          </Suspense>
        </Canvas>
      </ThreeJSErrorBoundary>
      
      {/* User instruction */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-white/80 bg-primary-800/40 backdrop-blur-sm px-4 py-1.5 rounded-full z-10 flex items-center gap-2 shadow-lg pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        Drag to rotate ・ Scroll to animate
      </div>
      
      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-10 bg-gradient-to-t from-dark to-transparent pointer-events-none"></div>
    </motion.div>
  );
};

export default ScrollScene; 