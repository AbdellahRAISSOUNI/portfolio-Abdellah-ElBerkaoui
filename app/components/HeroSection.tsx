'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedHeader from './AnimatedHeader';
import GearSystem from './GearSystem';
import RotatingModel from './RotatingModel';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);



  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-grid-pattern opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark/50 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary-900/30 text-primary-400 text-sm font-medium mb-4">
                Mechatronics Engineering Student
              </span>
              
              <AnimatedHeader
                title="Abdellah Elberkaoui"
                subtitle="Creating innovations at the intersection of mechanics, electronics and software"
                className="mb-6"
              />
              
              <motion.p
                className="text-lg mb-8 text-light/90 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
As a 5th year Mechatronics Engineering student at ENSA Tetouan, I am passionate about designing intelligent systems that merge automation, embedded electronics, and digital technologies.
My academic and project experience has equipped me with strong skills in PLC programming, embedded systems development, digital logic design, and FPGA-based architectures. I enjoy working in multidisciplinary environments where hardware, software, and control systems come together.
I'm particularly interested in industrial automation, embedded systems engineering, and automotive electronics—fields where reliable control, smart sensing, and efficient digital processing drive real innovation.        
              </motion.p>
              
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#projects"
                  className="btn bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-medium py-3 px-8 rounded-lg shadow-lg shadow-primary-500/20 glowing-border transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View My Projects
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className="btn bg-transparent border-2 border-secondary-500/50 hover:border-secondary-500 text-light font-medium py-3 px-8 rounded-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get In Touch
                </motion.a>
              </div>
              
              {/* Tech Stack Indicators */}
              <motion.div 
                className="mt-12 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <p className="text-sm text-light/60 mb-3">Skilled with:</p>
                <div className="flex flex-wrap gap-3">
                  {['Arduino', 'CAD/CAM', 'PLC', 'Robotics', 'IoT', 'MATLAB', 'EMBEDDED SYSTEMS'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="inline-block py-1 px-3 bg-dark/50 rounded-full text-xs text-light/80 border border-primary-800/50"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right column - Profile picture and 3D model */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Profile picture container */}
            <motion.div
              className="absolute top-0 right-0 w-72 h-72 overflow-hidden z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative w-full h-full group">
                {/* Animated glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/30 to-secondary-500/30 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {!imageError ? (
                  <Image
                    src="/images/admin.png"
                    alt="Profile Picture"
                    width={400}
                    height={400}
                    priority
                    className="rounded-full shadow-xl border-4 border-primary-500/30 relative z-10 group-hover:border-primary-500/50 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://via.placeholder.com/400x400.png?text=AE';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-900/30 rounded-full relative z-10">
                    <span className="text-6xl font-bold text-primary-400">AE</span>
                  </div>
                )}
                {/* Additional decorative glow rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary-400/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-secondary-400/20"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.1, 0.2]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>
            
            {/* 3D model showcase - moved to the right */}
            <motion.div
              className="absolute inset-0 translate-x-24 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <RotatingModel />
            </motion.div>
            
            {/* Decorative gear system - adjusted position */}
            <motion.div
              className="absolute top-10 right-[-2rem] w-32 h-32 z-30"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <GearSystem />
            </motion.div>
            
            {/* Animated circuit lines - moved right */}
            <svg className="absolute inset-0 w-full h-full z-0 translate-x-24" viewBox="0 0 500 500">
              <motion.path
                d="M100,250 L400,250"
                stroke="rgba(45, 212, 191, 0.3)"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              <motion.path
                d="M250,100 L250,400"
                stroke="rgba(79, 70, 229, 0.3)"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1.2 }}
              />
            </svg>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="w-8 h-12 border-2 border-light/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          >
            <motion.div className="w-1 h-2 bg-primary-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 
