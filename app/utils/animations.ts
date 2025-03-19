'use client';

import { gsap } from 'gsap';
import { Variants } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP animations for mechatronics-themed elements
export const animateGears = (selector: string) => {
  gsap.to(selector, {
    rotation: 360,
    repeat: -1,
    duration: 10,
    ease: "linear",
  });
};

export const animatePiston = (selector: string) => {
  gsap.to(selector, {
    y: 20,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "power2.inOut",
  });
};

export const animateCircuit = (selector: string) => {
  if (typeof window === 'undefined') return;
  
  const path = document.querySelector(selector);
  if (!path) return;
  
  const pathLength = (path as SVGPathElement).getTotalLength();
  
  gsap.fromTo(
    selector,
    { strokeDashoffset: pathLength },
    {
      strokeDashoffset: 0,
      duration: 2 + Math.random() * 2,
      ease: 'power2.inOut',
      delay: Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
    }
  );
};

export const animateRobot = (selector: string) => {
  const tl = gsap.timeline({ repeat: -1 });
  tl.to(selector, { y: -15, duration: 1, ease: "power1.inOut" })
    .to(selector, { y: 0, duration: 1, ease: "power1.inOut" });
};

// Fade in up animation - used in AnimatedHeader
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Draw line animation - used in AnimatedHeader
export const drawLine: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

// Simple container animation with stagger effect
export const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Create scroll-based animation with GSAP ScrollTrigger
 */
export const createScrollAnimation = (options: {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  animation: gsap.core.Timeline | gsap.core.Tween;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}) => {
  if (typeof window === 'undefined') return;
  
  const {
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    animation,
    markers = false,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  } = options;
  
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub,
    markers,
    animation,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  });
};

/**
 * Create a staggered animation for multiple elements
 */
export const staggerElements = (
  elements: string | Element | Element[],
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  staggerAmount = 0.1,
  staggerFrom: number | "start" | "end" | "center" | "edges" | "random" | [number, number] = "start"
) => {
  if (typeof window === 'undefined') return;
  
  return gsap.fromTo(
    elements,
    fromVars,
    {
      ...toVars,
      stagger: {
        amount: staggerAmount,
        from: staggerFrom,
      },
    }
  );
};

/**
 * Create a scroll-triggered parallel animation
 */
export const parallelScrollAnimation = (
  triggerElement: string | Element,
  animations: Array<{
    element: string | Element;
    fromVars: gsap.TweenVars;
    toVars: gsap.TweenVars;
  }>,
  options?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
  }
) => {
  if (typeof window === 'undefined') return;
  
  const tl = gsap.timeline();
  
  animations.forEach(({ element, fromVars, toVars }) => {
    tl.fromTo(element, fromVars, toVars, 0);
  });
  
  return createScrollAnimation({
    trigger: triggerElement,
    animation: tl,
    start: options?.start,
    end: options?.end,
    scrub: options?.scrub,
    markers: options?.markers,
  });
}; 