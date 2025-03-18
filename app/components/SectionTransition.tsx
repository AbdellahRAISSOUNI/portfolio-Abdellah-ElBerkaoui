'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Gear from './Gear';

interface SectionTransitionProps {
  type: 'gears' | 'circuit' | 'robot' | 'wave';
  id: string;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({ type, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  // Circuit animation points
  const circuitPath = "M10,50 H90 L70,20 H150 L140,80 H220 L200,30 H290";
  
  const renderTransitionContent = () => {
    switch (type) {
      case 'gears':
        return (
          <div className="relative h-full w-full">
            <Gear 
              size={40} 
              position={{ x: 120, y: 50 }} 
              color="rgba(45, 212, 191, 0.6)"
              duration={15}
              clockwise={true}
            />
            <Gear 
              size={30} 
              position={{ x: 190, y: 50 }} 
              color="rgba(79, 70, 229, 0.6)"
              duration={10}
              clockwise={false}
            />
            <Gear 
              size={20} 
              position={{ x: 240, y: 50 }} 
              color="rgba(45, 212, 191, 0.6)"
              duration={7}
              clockwise={true}
            />
          </div>
        );

      case 'circuit':
        return (
          <div className="relative h-full w-full flex items-center justify-center">
            <svg width="300" height="100" viewBox="0 0 300 100" className="overflow-visible">
              <motion.path
                d={circuitPath}
                fill="none"
                stroke="rgba(45, 212, 191, 0.8)"
                strokeWidth="2"
                strokeDasharray="320"
                initial={{ strokeDashoffset: 320 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
              />
              
              {/* Circuit nodes */}
              <motion.circle cx="10" cy="50" r="4" fill="rgba(79, 70, 229, 0.8)" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle cx="90" cy="50" r="4" fill="rgba(79, 70, 229, 0.8)" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.circle cx="70" cy="20" r="4" fill="rgba(79, 70, 229, 0.8)" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.circle cx="150" cy="20" r="4" fill="rgba(79, 70, 229, 0.8)" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />
              <motion.circle cx="140" cy="80" r="4" fill="rgba(79, 70, 229, 0.8)" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
              />
              <motion.circle cx="220" cy="80" r="4" fill="rgba(79, 70, 229, 0.8)" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
              />
              <motion.circle cx="200" cy="30" r="4" fill="rgba(79, 70, 229, 0.8)" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3 }}
              />
              <motion.circle cx="290" cy="30" r="4" fill="rgba(79, 70, 229, 0.8)" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3.5 }}
              />
            </svg>
          </div>
        );

      case 'robot':
        return (
          <div className="relative h-full w-full flex items-center justify-center">
            <motion.div
              className="relative w-40 h-40"
              animate={{ 
                y: [0, -10, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              {/* Robot head */}
              <motion.div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-dark border-2 border-primary-500 rounded-t-lg overflow-hidden"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Eyes */}
                <div className="flex justify-center space-x-4 mt-4">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-primary-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-primary-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
                {/* Mouth */}
                <motion.div 
                  className="w-10 h-1 bg-primary-400 mx-auto mt-3"
                  animate={{ width: [10, 15, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Robot body */}
              <motion.div 
                className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-dark border-2 border-primary-500 rounded-md"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Control panel */}
                <div className="grid grid-cols-2 gap-2 p-2">
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-secondary-600"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-primary-600"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="w-8 h-2 bg-primary-400 col-span-2 mx-auto"
                    animate={{ width: [8, 12, 8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-8 h-2 bg-secondary-400 col-span-2 mx-auto"
                    animate={{ width: [8, 14, 8] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              {/* Arms */}
              <motion.div 
                className="absolute top-20 left-6 w-3 h-12 bg-dark border-2 border-secondary-500 rounded-full"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1, rotate: [0, 15, 0] }}
                transition={{ delay: 0.7, rotate: { duration: 3, repeat: Infinity } }}
              />
              <motion.div 
                className="absolute top-20 right-6 w-3 h-12 bg-dark border-2 border-secondary-500 rounded-full"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1, rotate: [0, -15, 0] }}
                transition={{ delay: 0.7, rotate: { duration: 3, repeat: Infinity, delay: 0.5 } }}
              />
              
              {/* Legs */}
              <motion.div 
                className="absolute top-36 left-1/2 transform -translate-x-1/2 flex space-x-2"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.div 
                  className="w-4 h-10 bg-dark border-2 border-primary-500 rounded-b-lg"
                  animate={{ height: [10, 12, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div 
                  className="w-4 h-10 bg-dark border-2 border-primary-500 rounded-b-lg"
                  animate={{ height: [10, 12, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>
        );

      case 'wave':
        return (
          <div className="relative h-full w-full flex items-center justify-center">
            <svg width="300" height="100" viewBox="0 0 300 100">
              {/* Sine Wave */}
              <motion.path
                d="M0,50 C25,20 50,80 75,50 C100,20 125,80 150,50 C175,20 200,80 225,50 C250,20 275,80 300,50"
                fill="none"
                stroke="rgba(45, 212, 191, 0.8)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
              />
              
              {/* Square Wave */}
              <motion.path
                d="M0,70 L25,70 L25,30 L75,30 L75,70 L125,70 L125,30 L175,30 L175,70 L225,70 L225,30 L275,30 L275,70 L300,70"
                fill="none"
                stroke="rgba(79, 70, 229, 0.5)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', delay: 0.5 }}
              />
              
              {/* Datapoints */}
              {[0, 75, 150, 225, 300].map((x, i) => (
                <motion.circle 
                  key={i} 
                  cx={x} 
                  cy={50} 
                  r={4} 
                  fill="rgba(45, 212, 191, 0.9)"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      id={id}
      ref={ref}
      className="h-32 w-full overflow-hidden my-8 relative flex items-center justify-center"
      style={{ 
        opacity: springOpacity,
        scale: springScale
      }}
    >
      {renderTransitionContent()}
    </motion.div>
  );
};

export default SectionTransition; 