import { motion, useAnimation } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedOnScrollProps {
  direction: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  transition?: object;
  once?: boolean;
}

const AnimatedOnScroll: React.FC<AnimatedOnScrollProps> = ({ direction, children, className, transition, once = true }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once });
  const initialX = direction === 'left' ? -100 : 100;

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1, transition: transition || { duration: 0.7, ease: 'easeOut' } });
    } else if (!once) {
      controls.start({ x: initialX, opacity: 0 });
    }
  }, [inView, controls, initialX, transition, once]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: initialX, opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedOnScroll; 