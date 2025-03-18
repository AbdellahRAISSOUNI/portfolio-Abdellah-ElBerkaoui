'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedHeader from './AnimatedHeader';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
  link?: string;
  delay?: number;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  tags, 
  imageSrc, 
  link, 
  delay = 0,
  featured = false 
}) => {
  return (
    <motion.div
      className={`group overflow-hidden rounded-xl ${featured ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="glowing-border rounded-xl overflow-hidden h-full">
        <div className="bg-dark/80 backdrop-blur-sm p-0 rounded-xl h-full flex flex-col">
          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-dark/80 z-10"></div>
            <div className="relative w-full h-full">
              <Image 
                src={imageSrc} 
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          
          <div className="p-5 flex-grow flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-light group-hover:text-primary-400 transition-colors">
              {title}
            </h3>
            
            <p className="text-light/70 text-sm mb-4 flex-grow">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="text-xs font-medium px-2 py-1 rounded-full bg-primary-900/30 text-primary-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {link && (
              <Link 
                href={link}
                className="inline-flex items-center text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
              >
                View Project Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const projects = [
    {
      title: "Autonomous Mobile Robot",
      description: "Designed and built an autonomous mobile robot with obstacle detection, path planning, and dynamic navigation capabilities. Utilized ROS, Arduino, and various sensors.",
      tags: ["Robotics", "Arduino", "ROS", "Sensors"],
      imageSrc: "/images/project1.jpg",
      link: "#",
      featured: true
    },
    {
      title: "Smart Home Automation System",
      description: "Developed a comprehensive home automation system with IoT capabilities, integrating various sensors and actuators for efficient energy management.",
      tags: ["IoT", "Embedded Systems", "Control Theory"],
      imageSrc: "/images/project2.jpg",
      link: "#"
    },
    {
      title: "PLC-Based Industrial Control",
      description: "Implemented a PLC-based control system for an industrial manufacturing process, improving efficiency and reducing downtime.",
      tags: ["PLC", "SCADA", "Industrial Automation"],
      imageSrc: "/images/project3.jpg",
      link: "#"
    },
    {
      title: "Automated Hydroponics System",
      description: "Created an automated hydroponics system with precise nutrient delivery, environmental monitoring, and remote control capabilities.",
      tags: ["Control Systems", "IoT", "Sensors"],
      imageSrc: "/images/project4.jpg",
      link: "#"
    },
    {
      title: "Robotic Arm with Computer Vision",
      description: "Built a 5-DOF robotic arm with computer vision capabilities for object recognition, tracking, and pick-and-place operations.",
      tags: ["Robotics", "Computer Vision", "Kinematics"],
      imageSrc: "/images/project5.jpg",
      link: "#",
      featured: true
    }
  ];
  
  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Circuit patterns */}
      <svg className="absolute top-0 left-0 w-full h-20 opacity-5" viewBox="0 0 800 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,50 H800" stroke="rgba(45, 212, 191, 0.5)" strokeWidth="1" strokeDasharray="8,8" />
        <path d="M100,0 V100" stroke="rgba(79, 70, 229, 0.5)" strokeWidth="1" strokeDasharray="8,8" />
        <path d="M300,0 V100" stroke="rgba(79, 70, 229, 0.5)" strokeWidth="1" strokeDasharray="8,8" />
        <path d="M500,0 V100" stroke="rgba(79, 70, 229, 0.5)" strokeWidth="1" strokeDasharray="8,8" />
        <path d="M700,0 V100" stroke="rgba(79, 70, 229, 0.5)" strokeWidth="1" strokeDasharray="8,8" />
        
        <circle cx="100" cy="50" r="4" fill="rgba(45, 212, 191, 0.5)" />
        <circle cx="300" cy="50" r="4" fill="rgba(45, 212, 191, 0.5)" />
        <circle cx="500" cy="50" r="4" fill="rgba(45, 212, 191, 0.5)" />
        <circle cx="700" cy="50" r="4" fill="rgba(45, 212, 191, 0.5)" />
      </svg>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block py-1 px-3 rounded-full bg-primary-900/30 text-primary-400 text-sm font-medium mb-4"
          >
            My Projects
          </motion.div>
          
          <AnimatedHeader 
            title="Featured Work"
            subtitle="Innovative mechatronics projects that showcase my technical skills"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageSrc={project.imageSrc}
              link={project.link}
              delay={0.1 * index}
              featured={project.featured}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:from-primary-500 hover:to-secondary-500 transition-all shadow-lg shadow-primary-500/20"
          >
            Interested in Collaboration?
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection; 