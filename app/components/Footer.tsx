'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative py-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dark opacity-90"></div>
      
      {/* Circuit pattern decoration */}
      <svg className="absolute top-0 left-0 w-full h-8 opacity-10" viewBox="0 0 800 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,10 H800" stroke="rgba(45, 212, 191, 0.5)" strokeWidth="1" strokeDasharray="8,4" />
      </svg>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="#home" className="flex items-center">
              <div className="relative w-8 h-8 overflow-hidden mr-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary-400 to-secondary-500"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-light font-bold text-sm">A</span>
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-light">
                Abdellah<span className="text-primary-400">.dev</span>
              </span>
            </Link>
            
            <p className="text-sm text-light/60 mt-2">
              © {year} Abdellah Elberkaoui. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-light/70 hover:text-primary-400 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <p className="text-xs text-light/50">
              Designed & Developed with 
              <span className="text-primary-400 mx-1">♥</span> 
              and lots of 
              <span className="text-secondary-400 mx-1">{"<code/>"}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 