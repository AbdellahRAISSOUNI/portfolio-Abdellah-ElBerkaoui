'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animateCircuit } from '@/utils/animations';

const MechatronicsBackground: React.FC = () => {
  const circuitRef = useRef<SVGSVGElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Only access window after confirming we're on the client side
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    if (circuitRef.current) {
      const paths = circuitRef.current.querySelectorAll('path');
      paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });
      
      // Animate circuit paths
      paths.forEach(path => {
        animateCircuit(`#${path.id}`);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-dark to-dark/90 animate-gradient-xy"></div>
      
      {/* Circuit board patterns */}
      <svg 
        ref={circuitRef}
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          id="circuit1"
          d="M100,100 L700,100 L700,500 L100,500 Z" 
          fill="none" 
          stroke="rgba(45, 212, 191, 0.6)" 
          strokeWidth="2"
        />
        <path 
          id="circuit2"
          d="M150,150 L650,150 L650,450 L150,450 Z" 
          fill="none" 
          stroke="rgba(79, 70, 229, 0.6)" 
          strokeWidth="2"
        />
        <path 
          id="circuit3"
          d="M200,200 L600,200 L600,400 L200,400 Z" 
          fill="none" 
          stroke="rgba(45, 212, 191, 0.6)" 
          strokeWidth="2"
        />
        
        {/* Circuit Lines */}
        <path 
          id="line1"
          d="M200,100 L200,500" 
          fill="none" 
          stroke="rgba(45, 212, 191, 0.4)" 
          strokeWidth="1"
        />
        <path 
          id="line2"
          d="M300,100 L300,500" 
          fill="none" 
          stroke="rgba(45, 212, 191, 0.4)" 
          strokeWidth="1"
        />
        <path 
          id="line3"
          d="M400,100 L400,500" 
          fill="none" 
          stroke="rgba(45, 212, 191, 0.4)" 
          strokeWidth="1"
        />
        <path 
          id="line4"
          d="M500,100 L500,500" 
          fill="none" 
          stroke="rgba(45, 212, 191, 0.4)" 
          strokeWidth="1"
        />
        <path 
          id="line5"
          d="M600,100 L600,500" 
          fill="none" 
          stroke="rgba(45, 212, 191, 0.4)" 
          strokeWidth="1"
        />
        
        {/* Horizontal Lines */}
        <path 
          id="hline1"
          d="M100,200 L700,200" 
          fill="none" 
          stroke="rgba(79, 70, 229, 0.4)" 
          strokeWidth="1"
        />
        <path 
          id="hline2"
          d="M100,300 L700,300" 
          fill="none" 
          stroke="rgba(79, 70, 229, 0.4)" 
          strokeWidth="1"
        />
        <path 
          id="hline3"
          d="M100,400 L700,400" 
          fill="none" 
          stroke="rgba(79, 70, 229, 0.4)" 
          strokeWidth="1"
        />
        
        {/* Nodes */}
        <circle cx="200" cy="200" r="5" fill="rgba(45, 212, 191, 0.6)" />
        <circle cx="300" cy="200" r="5" fill="rgba(45, 212, 191, 0.6)" />
        <circle cx="400" cy="200" r="5" fill="rgba(45, 212, 191, 0.6)" />
        <circle cx="500" cy="200" r="5" fill="rgba(45, 212, 191, 0.6)" />
        <circle cx="600" cy="200" r="5" fill="rgba(45, 212, 191, 0.6)" />
        
        <circle cx="200" cy="300" r="5" fill="rgba(79, 70, 229, 0.6)" />
        <circle cx="300" cy="300" r="5" fill="rgba(79, 70, 229, 0.6)" />
        <circle cx="400" cy="300" r="5" fill="rgba(79, 70, 229, 0.6)" />
        <circle cx="500" cy="300" r="5" fill="rgba(79, 70, 229, 0.6)" />
        <circle cx="600" cy="300" r="5" fill="rgba(79, 70, 229, 0.6)" />
        
        <circle cx="200" cy="400" r="5" fill="rgba(45, 212, 191, 0.6)" />
        <circle cx="300" cy="400" r="5" fill="rgba(45, 212, 191, 0.6)" />
        <circle cx="400" cy="400" r="5" fill="rgba(45, 212, 191, 0.6)" />
        <circle cx="500" cy="400" r="5" fill="rgba(45, 212, 191, 0.6)" />
        <circle cx="600" cy="400" r="5" fill="rgba(45, 212, 191, 0.6)" />
      </svg>

      {/* Animated particles */}
      {isClient && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary-400"
              initial={{ 
                x: Math.random() * windowSize.width, 
                y: Math.random() * windowSize.height,
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{ 
                x: Math.random() * windowSize.width, 
                y: Math.random() * windowSize.height,
                opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.3]
              }}
              transition={{ 
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glow effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary-500/10 to-transparent"></div>
    </div>
  );
};

export default MechatronicsBackground; 