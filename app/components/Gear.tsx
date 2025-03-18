'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GearProps {
  size: number;
  position: { x: number; y: number };
  color?: string;
  duration?: number;
  clockwise?: boolean;
  className?: string;
}

const Gear: React.FC<GearProps> = ({ 
  size, 
  position, 
  color = 'rgba(45, 212, 191, 0.8)', 
  duration = 20,
  clockwise = true,
  className = ''
}) => {
  const gearRef = useRef<HTMLDivElement>(null);
  
  const toothCount = Math.floor(size / 10);
  const innerRadius = size * 0.7;
  
  const createTeeth = () => {
    const teeth = [];
    const angleStep = (2 * Math.PI) / toothCount;
    
    for (let i = 0; i < toothCount; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      
      teeth.push(
        <rect 
          key={i}
          x={-5}
          y={-20}
          width={10}
          height={40}
          fill={color}
          transform={`rotate(${(angle * 180) / Math.PI}) translate(0, -${size})`}
          rx={2}
          opacity={0.9}
        />
      );
    }
    
    return teeth;
  };

  return (
    <motion.div
      ref={gearRef}
      className={`absolute transform ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: size * 2,
        height: size * 2,
        marginLeft: -size,
        marginTop: -size,
      }}
      animate={{
        rotate: clockwise ? 360 : -360,
      }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      <svg width="100%" height="100%" viewBox={`-${size + 20} -${size + 20} ${(size + 20) * 2} ${(size + 20) * 2}`}>
        {/* Main gear circle */}
        <circle 
          cx="0" 
          cy="0" 
          r={innerRadius} 
          fill={color} 
          opacity={0.7}
        />
        
        {/* Inner circle (hole) */}
        <circle 
          cx="0" 
          cy="0" 
          r={size * 0.2} 
          fill="currentColor" 
          opacity={0.3}
        />
        
        {/* Teeth */}
        {createTeeth()}
        
        {/* Center dot */}
        <circle 
          cx="0" 
          cy="0" 
          r={4} 
          fill={color} 
          opacity={1}
        />
      </svg>
    </motion.div>
  );
};

export default Gear; 