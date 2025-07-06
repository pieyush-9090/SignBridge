"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AboutIntro from "./about/AboutIntro";
import FeatureGrid, { features } from "./about/FeatureGrid";
import ScrollIndicator from "./about/ScrollIndicator";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [visibleLogos, setVisibleLogos] = useState(0);
  const revealCooldown = useRef(false);

  // Scroll-jack logic with cooldown
  useEffect(() => {
    let locked = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Start scroll-jack when About section hits top
      if (rect.top <= 50 && !locked && visibleLogos < features.length) {
        setIsScrollLocked(true);
        locked = true;
      }
      // Reset if scrolled back up
      if (rect.top > 100 && locked) {
        setVisibleLogos(0);
        setIsScrollLocked(false);
        locked = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrollLocked && visibleLogos < features.length) {
        e.preventDefault();
        if (!revealCooldown.current) {
          revealCooldown.current = true;
          setVisibleLogos((prev) => {
            const next = Math.min(prev + 1, features.length);
            if (next === features.length) {
              setIsScrollLocked(false);
            }
            return next;
          });
          setTimeout(() => {
            revealCooldown.current = false;
          }, 350); // 350ms cooldown between reveals
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isScrollLocked, visibleLogos]);

  // Prevent scrolling when locked
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isScrollLocked]);

  return (
    <section ref={containerRef} id="about" className="w-full min-h-[100vh] bg-white dark:bg-neutral-950 text-black dark:text-white flex flex-col items-center justify-center px-0">
      <AboutIntro />
      <div className="w-full bg-white dark:bg-neutral-950 text-black dark:text-white flex flex-col items-center pb-20 pt-8 min-h-[60vh]">
        <FeatureGrid features={features} visibleLogos={visibleLogos} />
        <ScrollIndicator visibleLogos={visibleLogos} totalLogos={features.length} />
      </div>
    </section>
  );
};

export default About; 