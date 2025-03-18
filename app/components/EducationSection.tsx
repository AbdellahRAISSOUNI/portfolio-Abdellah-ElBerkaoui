'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedHeader from './AnimatedHeader';

interface EducationItemProps {
  year: string;
  degree: string;
  institution: string;
  description: string;
  delay?: number;
}

const EducationItem: React.FC<EducationItemProps> = ({ 
  year, 
  degree, 
  institution, 
  description, 
  delay = 0 
}) => {
  return (
    <motion.div
      className="relative pl-8 pb-12 last:pb-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 to-secondary-500 opacity-30"></div>
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 transform -translate-x-1/2"></div>
      
      {/* Year */}
      <span className="inline-block py-1 px-3 rounded-full bg-dark/50 text-primary-400 text-xs font-medium mb-3">
        {year}
      </span>
      
      {/* Degree */}
      <h3 className="text-xl font-bold mb-1 text-light">{degree}</h3>
      
      {/* Institution */}
      <h4 className="text-primary-400 font-medium mb-3">{institution}</h4>
      
      {/* Description */}
      <p className="text-light/70">{description}</p>
    </motion.div>
  );
};

const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const educationItems = [
    {
      year: "2020 - Present",
      degree: "Engineering Degree in Mechatronics",
      institution: "ENSA Tetouan, Morocco",
      description: "Specialized in mechatronics engineering with focus on robotics, control systems, and automation. Participated in several interdisciplinary projects and research initiatives.",
      delay: 0.1
    },
    {
      year: "2018 - 2020",
      degree: "Preparatory Classes for Engineering Schools",
      institution: "CPGE, Morocco",
      description: "Intensive two-year program in mathematics, physics, and engineering sciences. Developed strong problem-solving skills and analytical thinking.",
      delay: 0.3
    },
    {
      year: "2018",
      degree: "Baccalaureate in Physical Sciences",
      institution: "High School, Morocco",
      description: "Graduated with honors, specializing in mathematics and physical sciences. Developed foundation in scientific principles and mathematical modeling.",
      delay: 0.5
    }
  ];
  
  const certifications = [
    { 
      name: "Robotics Specialization", 
      issuer: "Coursera - University of Pennsylvania",
      year: "2023" 
    },
    { 
      name: "Control of Mobile Robots", 
      issuer: "Coursera - Georgia Institute of Technology",
      year: "2022" 
    },
    { 
      name: "Machine Learning for Engineering", 
      issuer: "edX - MIT",
      year: "2022" 
    },
    { 
      name: "IoT Fundamentals", 
      issuer: "Cisco Networking Academy",
      year: "2021" 
    },
  ];
  
  return (
    <section id="education" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block py-1 px-3 rounded-full bg-primary-900/30 text-primary-400 text-sm font-medium mb-4"
          >
            Education
          </motion.div>
          
          <AnimatedHeader 
            title="Academic Journey"
            subtitle="My educational background and professional certifications"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Education Timeline */}
          <div className="lg:col-span-2">
            <motion.h3
              className="text-2xl font-bold mb-8 text-primary-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Education History
            </motion.h3>
            
            <div className="relative">
              {educationItems.map((item) => (
                <EducationItem 
                  key={item.degree}
                  year={item.year}
                  degree={item.degree}
                  institution={item.institution}
                  description={item.description}
                  delay={item.delay}
                />
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div>
            <motion.h3
              className="text-2xl font-bold mb-8 text-secondary-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Certifications
            </motion.h3>
            
            <div className="glowing-border rounded-xl overflow-hidden h-full">
              <div className="bg-dark/80 backdrop-blur-sm p-6 rounded-xl h-full">
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.name}
                      className="p-4 rounded-lg bg-dark/50 hover:bg-dark/70 transition-colors border border-primary-900/30"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-light font-medium">{cert.name}</h4>
                        <span className="text-xs font-semibold bg-primary-900/30 text-primary-400 px-2 py-1 rounded-full">
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-light/60 text-sm mt-1">{cert.issuer}</p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <p className="text-sm text-light/50 italic">
                    Continuously expanding knowledge through professional certifications and courses
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection; 