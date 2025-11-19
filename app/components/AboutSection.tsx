'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedHeader from './AnimatedHeader';
import GearSystem from './GearSystem';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const mechatronicsComponents = [
    {
      title: "Mechanical Engineering",
      description: "Design and analysis of mechanical systems, CAD modeling, and structural mechanics.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Electronic Engineering",
      description: "PCB design, sensor integration, and communication protocol implementation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Embedded systems Engineering",
      description: "FPGA design, HDL implementation, and digital architecture optimization, microcontroller programming, and real-time control.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2" />
          <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" />
          <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "Automation Engineering",
      description: "PLC programming, ladder logic design, and industrial control systems, real-time automation solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    }
  ];
  
  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="inline-block py-1 px-3 rounded-full bg-primary-900/30 text-primary-400 text-sm font-medium mb-4"
          >
            About Me
          </motion.div>
          
          <AnimatedHeader 
            title="Mechatronics Engineer"
            subtitle="Where mechanics, electronics, and software converge"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="glowing-border rounded-xl overflow-hidden">
                <div className="bg-dark/80 backdrop-blur-sm p-6 rounded-xl">
                  <p className="text-lg mb-6 text-light/90">
                    As a 4th year Mechatronics Engineering student at <span className="text-primary-400 font-medium">ENSA Tetouan</span>, 
                    I am passionate about developing innovative systems that seamlessly integrate mechanical, 
                    electrical, and computational components.
                  </p>
                  
                  <p className="text-lg mb-6 text-light/90">
                    My academic journey has equipped me with a diverse skill set spanning CAD design, 
                    embedded systems programming, control theory, and automation. I thrive in the 
                    multidisciplinary nature of mechatronics, where I can combine precision engineering 
                    with cutting-edge technology.
                  </p>
                  
                  <p className="text-lg text-light/90">
                    I'm particularly interested in <span className="text-primary-400 font-medium">automotive industry</span>, 
                    <span className="text-primary-400 font-medium"> IoT applications</span>, and 
                    <span className="text-primary-400 font-medium"> smart manufacturing systems</span> - 
                    fields where mechatronics drives innovation and solves complex challenges.
                  </p>
                </div>
              </div>
              
              {/* Decorative gear positioned on the bottom-right corner */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 opacity-30">
                <GearSystem />
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-primary-400">Mechatronics Components</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mechatronicsComponents.map((component, index) => (
                  <motion.div
                    key={component.title}
                    className="bg-dark/30 backdrop-blur-sm p-5 rounded-lg border border-primary-900/50 hover:border-primary-500/30 transition-all group"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="bg-gradient-to-br from-primary-500/20 to-secondary-600/20 p-3 rounded-full inline-block mb-4 text-primary-400 group-hover:text-primary-300 transition-colors">
                      {component.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-light group-hover:text-primary-300 transition-colors">{component.title}</h4>
                    <p className="text-light/70">{component.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 
