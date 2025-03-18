'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, drawLine } from '@/utils/animations';

interface AnimatedHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ 
  title, 
  subtitle, 
  className = '' 
}) => {
  const titleArray = title.split('');
  
  return (
    <div className={`relative ${className}`}>
      <div className="mb-2">
        <div className="flex items-center justify-center md:justify-start overflow-hidden">
          {titleArray.map((letter, index) => (
            <motion.span
              key={index}
              className="text-4xl md:text-6xl font-bold inline-block glow-text"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ 
                duration: 0.5,
                delay: 0.1 * index,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>
        
        {subtitle && (
          <motion.p
            className="text-xl md:text-2xl mt-2 text-secondary-400"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      
      {/* Decorative circuit line */}
      <svg
        className="absolute -bottom-6 left-0 w-full h-12 overflow-visible"
        viewBox="0 0 300 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,10 L50,10 L60,5 L70,15 L80,5 L90,15 L100,10 L300,10"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1.5"
          variants={drawLine}
          initial="hidden"
          animate="visible"
        />
        
        {/* Animated nodes */}
        <motion.circle 
          cx="60" 
          cy="5" 
          r="3" 
          fill="#2dd4bf"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        />
        
        <motion.circle 
          cx="80" 
          cy="5" 
          r="3" 
          fill="#2dd4bf"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.3 }}
        />
        
        <motion.circle 
          cx="70" 
          cy="15" 
          r="3" 
          fill="#4f46e5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.3 }}
        />
        
        <motion.circle 
          cx="90" 
          cy="15" 
          r="3" 
          fill="#4f46e5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
        />
        
        {/* Line gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedHeader; 