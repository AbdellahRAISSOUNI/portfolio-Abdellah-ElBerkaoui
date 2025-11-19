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
                target="_blank"
                rel="noopener noreferrer"
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
      title: "Automated Emergency Braking (AEB) by Intelligent Detection ",
      description: "Design and development of an intelligent emergency braking system integrating multiple sensors, cameras, and advanced image processing techniques. The system enables real-time obstacle detection and automatic braking activation to enhance vehicle safety. MATLAB/Simulink simulations were performed to optimize the system’s reactivity, reliability, and overall performance in autonomous driving scenarios.",
      tags: ["MATLAB/Simulink", "ultrasonic/infrared sensors", "real-time control systems"],
      imageSrc: "/images/project1.jpeg",
      link: "https://www.linkedin.com/posts/abdellah-elberkaoui-1a3493195_aeb-activity-7306434240315871233-RtBP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC3PrksBCkPrd9JsMGdDWh1DajEUF_w_Wkg",
      featured: true
    },
    {
      title: "Coordinateur des Clubs dans l'association des étudiants",
      description: "En tant que coordinateur des clubs au sein de l'association des étudiants, je supervise 16 clubs dans leurs projets et activités. Mon rôle consiste à harmoniser les initiatives, organiser des événements fédérateurs, et maintenir une communication fluide pour maximiser leur impact sur le campus. Grâce à un soutien personnalisé, nous renforçons l’engagement des membres et créons un environnement propice à l’épanouissement collectif.",
      tags: ["IoT", "Embedded Systems", "Control Theory"],
      imageSrc: "/images/project2.jpeg",
      link: "https://www.linkedin.com/posts/abdellah-elberkaoui-1a3493195_leadership-engagementaeztudiant-vieassociative-activity-7305163373904551937-nU2B?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC3PrksBCkPrd9JsMGdDWh1DajEUF_w_Wkg"
    },
    {
      title: "Régulateur de Vitesse pour Moteur à Courant Continu",
      description: "Ce projet explore la conception et la simulation d'un régulateur de vitesse pour moteur à courant continu, réalisé sur ISIS. Il met en avant les compétences techniques en conception et simulation électronique, avec des applications pratiques pour le contrôle des systèmes électromécaniques, adaptées tant aux usages industriels qu'éducatifs",
      tags: ["PLC", "SCADA", "Industrial Automation"],
      imageSrc: "/images/project3.jpeg",
      link: "https://www.linkedin.com/posts/abdellah-elberkaoui-1a3493195_aezlectronique-simulation-projetstechniques-activity-7275626587297878016--Isr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC3PrksBCkPrd9JsMGdDWh1DajEUF_w_Wkg"
    },
    {
      title: "President du Club CETEC",
      description: "En tant que président du Club CETEC, je pilote les initiatives pour promouvoir l'échange culturel et célébrer la diversité au sein de notre communauté étudiante. Mon rôle consiste à organiser des événements, ateliers et activités qui favorisent le partage des traditions, renforcent les liens entre étudiants de différents horizons, et créent un espace inclusif pour l’échange interculturel. Grâce à une coordination proactive et un engagement collectif, nous encourageons la compréhension mutuelle, l’ouverture d’esprit et l’épanouissement de chacun dans un environnement multiculturel.",
      tags: ["Control Systems", "IoT", "Sensors"],
      imageSrc: "/images/project4.jpeg",
      link: "#"
    },

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
            target="_blank"
            rel="noopener noreferrer"
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
