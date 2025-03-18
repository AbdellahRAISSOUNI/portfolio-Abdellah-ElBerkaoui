'use client';

import React, { useState, useEffect } from 'react';
import MechatronicsBackground from '@/components/MechatronicsBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SectionTransition from '@/components/SectionTransition';
import dynamic from 'next/dynamic';

// Fallback component for when 3D scenes fail to load
const SectionTransitionFallback = ({ id, type }: { id: string; type: string }) => (
  <SectionTransition 
    type={type as 'gears' | 'circuit' | 'robot' | 'wave'} 
    id={`fallback-${id}`} 
  />
);

// Dynamically import the 3D components with no SSR and error handling
const ScrollScene = dynamic(
  () => import('@/components/3D/ScrollScene'),
  { 
    ssr: false,
    loading: ({ error, isLoading, pastDelay, retry }) => {
      if (error) {
        console.error('Error loading 3D components:', error);
        // Return simple loading UI if there's an error
        return <div className="h-32 w-full flex items-center justify-center">Loading...</div>;
      }
      
      if (isLoading && pastDelay) {
        return <div className="h-32 w-full flex items-center justify-center">Loading 3D components...</div>;
      }
      
      return null;
    },
  }
);

export default function Home() {
  // Track if 3D is supported in this browser
  const [supports3D, setSupports3D] = useState(true);
  
  // Check WebGL support on client side
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupports3D(!!gl);
    } catch (e) {
      console.error('WebGL not supported', e);
      setSupports3D(false);
    }
  }, []);

  // Render either 3D ScrollScene or fallback SectionTransition
  const renderTransition = (type: 'gears' | 'circuit' | 'robot' | 'wave', id: string) => {
    if (typeof window === 'undefined') {
      // On server, use fallback
      return <SectionTransitionFallback id={id} type={type} />;
    }
    
    return supports3D ? (
      <ScrollScene type={type} id={`3d-${id}`} height="60vh" />
    ) : (
      <SectionTransitionFallback id={id} type={type} />
    );
  };
  
  return (
    <main className="relative">
      {/* Background component with animation */}
      <MechatronicsBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content sections */}
      <HeroSection />
      
      {/* 3D Gear animation between sections */}
      {renderTransition('gears', 'gears-1')}
      
      <AboutSection />
      
      {/* 3D Circuit animation between sections */}
      {renderTransition('circuit', 'circuit-1')}
      
      <SkillsSection />
      
      {/* 3D Robot animation between sections */}
      {renderTransition('robot', 'robot-1')}
      
      <ProjectsSection />
      
      {/* 3D Wave animation between sections */}
      {renderTransition('wave', 'wave-1')}
      
      <EducationSection />
      
      {/* 3D Gear animation between sections */}
      {renderTransition('gears', 'gears-2')}
      
      <ContactSection />
      <Footer />
    </main>
  );
} 