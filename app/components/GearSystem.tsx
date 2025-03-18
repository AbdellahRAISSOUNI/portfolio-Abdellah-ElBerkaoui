'use client';

import React from 'react';
import Gear from './Gear';

interface GearSystemProps {
  className?: string;
}

const GearSystem: React.FC<GearSystemProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
      {/* Main gear */}
      <Gear 
        size={50} 
        position={{ x: 50, y: 50 }} 
        color="rgba(45, 212, 191, 0.8)"
        duration={20}
        clockwise={true}
      />
      
      {/* Connected gears */}
      <Gear 
        size={30} 
        position={{ x: 136, y: 50 }} 
        color="rgba(79, 70, 229, 0.8)"
        duration={12}
        clockwise={false}
      />
      
      <Gear 
        size={40} 
        position={{ x: 23, y: 136 }} 
        color="rgba(79, 70, 229, 0.8)"
        duration={16}
        clockwise={false}
      />
      
      <Gear 
        size={25} 
        position={{ x: 91, y: 140 }} 
        color="rgba(45, 212, 191, 0.8)"
        duration={10}
        clockwise={true}
      />
      
      {/* Small decorative gears */}
      <Gear 
        size={15} 
        position={{ x: 170, y: 108 }} 
        color="rgba(45, 212, 191, 0.7)"
        duration={6}
        clockwise={true}
      />
      
      <Gear 
        size={12} 
        position={{ x: 150, y: 152 }} 
        color="rgba(79, 70, 229, 0.7)"
        duration={5}
        clockwise={false}
      />

      {/* Add circuit-like connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        {/* Line connecting main gear to second gear */}
        <line 
          x1={100} 
          y1={50} 
          x2={136} 
          y2={50} 
          stroke="rgba(45, 212, 191, 0.5)" 
          strokeWidth={2} 
          strokeDasharray="5,5"
        />
        
        {/* Line connecting main gear to third gear */}
        <line 
          x1={50} 
          y1={100} 
          x2={50} 
          y2={136} 
          stroke="rgba(45, 212, 191, 0.5)" 
          strokeWidth={2} 
          strokeDasharray="5,5"
        />
        
        {/* Line connecting third gear to fourth gear */}
        <line 
          x1={63} 
          y1={140} 
          x2={91} 
          y2={140} 
          stroke="rgba(45, 212, 191, 0.5)" 
          strokeWidth={2} 
          strokeDasharray="5,5"
        />
        
        {/* Line connecting second gear to fifth gear */}
        <line 
          x1={152} 
          y1={80} 
          x2={170} 
          y2={108} 
          stroke="rgba(79, 70, 229, 0.5)" 
          strokeWidth={2} 
          strokeDasharray="5,5"
        />
        
        {/* Line connecting fifth gear to sixth gear */}
        <line 
          x1={170} 
          y1={123} 
          x2={150} 
          y2={152} 
          stroke="rgba(79, 70, 229, 0.5)" 
          strokeWidth={2} 
          strokeDasharray="5,5"
        />
      </svg>
    </div>
  );
};

export default GearSystem; 