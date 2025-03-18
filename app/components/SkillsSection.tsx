'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedHeader from './AnimatedHeader';
import Gear from './Gear';

interface SkillItemProps {
  name: string;
  level: number;
  color: string;
  icon?: React.ReactNode;
  delay?: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ name, level, color, icon, delay = 0 }) => {
  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <h3 className="text-sm font-medium text-light">{name}</h3>
        </div>
        <span className="text-xs font-semibold text-primary-400">{level}%</span>
      </div>
      <div className="h-2 w-full bg-dark/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const technicalSkills = [
    { name: "CAD/CAM Software", level: 90, color: "#2dd4bf", delay: 0.1 },
    { name: "PLC Programming", level: 85, color: "#4f46e5", delay: 0.2 },
    { name: "Microcontroller Programming", level: 92, color: "#2dd4bf", delay: 0.3 },
    { name: "Robotics", level: 88, color: "#4f46e5", delay: 0.4 },
    { name: "Control Systems", level: 86, color: "#2dd4bf", delay: 0.5 },
    { name: "Electronics Design", level: 82, color: "#4f46e5", delay: 0.6 },
  ];
  
  const softwareSkills = [
    { name: "MATLAB/Simulink", level: 90, color: "#2dd4bf", delay: 0.2 },
    { name: "Arduino", level: 95, color: "#4f46e5", delay: 0.3 },
    { name: "SolidWorks", level: 88, color: "#2dd4bf", delay: 0.4 },
    { name: "C/C++", level: 85, color: "#4f46e5", delay: 0.5 },
    { name: "Python", level: 82, color: "#2dd4bf", delay: 0.6 },
    { name: "LabVIEW", level: 78, color: "#4f46e5", delay: 0.7 },
  ];
  
  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated gear decorations */}
      <div className="absolute left-0 top-20 opacity-10 -z-10">
        <Gear 
          size={80} 
          position={{ x: -40, y: 0 }} 
          color="rgba(45, 212, 191, 0.8)"
          duration={40}
          clockwise={true}
        />
      </div>
      
      <div className="absolute right-0 bottom-20 opacity-10 -z-10">
        <Gear 
          size={100} 
          position={{ x: -20, y: 0 }} 
          color="rgba(79, 70, 229, 0.8)"
          duration={50}
          clockwise={false}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block py-1 px-3 rounded-full bg-primary-900/30 text-primary-400 text-sm font-medium mb-4"
          >
            My Skills
          </motion.div>
          
          <AnimatedHeader 
            title="Technical Proficiency"
            subtitle="Skills developed through academic training and practical projects"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="glowing-border rounded-xl overflow-hidden">
              <div className="bg-dark/80 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 text-primary-400 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Technical Skills
                </h3>
                
                <div className="space-y-4">
                  {technicalSkills.map((skill) => (
                    <SkillItem 
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={skill.color}
                      delay={skill.delay}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Software Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="glowing-border rounded-xl overflow-hidden">
              <div className="bg-dark/80 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 text-secondary-400 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Software Skills
                </h3>
                
                <div className="space-y-4">
                  {softwareSkills.map((skill) => (
                    <SkillItem 
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={skill.color}
                      delay={skill.delay}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-light mb-6 text-center">Other Skills</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "3D Printing", "IoT", "PCB Design", "SCADA", 
              "Hydraulics", "Pneumatics", "Machine Learning", "Embedded Systems"
            ].map((skill, index) => (
              <motion.div
                key={skill}
                className="bg-dark/30 backdrop-blur-sm p-3 rounded-lg border border-primary-900/50 hover:border-primary-500/30 transition-all text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <span className="text-sm font-medium text-light/80">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection; 