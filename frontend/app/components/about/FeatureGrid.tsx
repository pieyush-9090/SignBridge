import { motion } from "framer-motion";
import type { ReactElement } from "react";

export type Feature = {
  icon: ReactElement;
  title: string;
  desc: string;
};

export const features: Feature[] = [
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
    ),
    title: "Real-time gesture recognition",
    desc: "Instantly translates sign language gestures into readable text."
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
    ),
    title: "YOLOv8 & Flask backend",
    desc: "Built with state-of-the-art ML and scalable Python APIs."
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
    ),
    title: "99% accuracy",
    desc: "Achieves top-tier results on benchmark datasets."
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10l-4-4m4 4l4-4" /></svg>
    ),
    title: "Bridges communication",
    desc: "Connects hearing and non-hearing individuals seamlessly."
  }
];

interface FeatureGridProps {
  features: Feature[];
  visibleLogos: number;
}

const FeatureGrid = ({ features, visibleLogos }: FeatureGridProps) => (
  <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
    {features.map((f, i) => (
      <motion.div
        key={i}
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ 
          opacity: i < visibleLogos ? 1 : 0,
          y: i < visibleLogos ? 0 : 50,
          scale: i < visibleLogos ? 1 : 0.8
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: i < visibleLogos ? i * 0.2 : 0
        }}
      >
        <motion.div 
          className="mb-4 text-black dark:text-white"
          animate={{ 
            rotate: i < visibleLogos ? 360 : 0,
            scale: i < visibleLogos ? 1 : 0
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: i < visibleLogos ? i * 0.2 + 0.1 : 0
          }}
        >
          {f.icon}
        </motion.div>
        <motion.div 
          className="font-semibold mb-2 text-lg"
          animate={{ 
            opacity: i < visibleLogos ? 1 : 0,
            y: i < visibleLogos ? 0 : 20
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: i < visibleLogos ? i * 0.2 + 0.3 : 0
          }}
        >
          {f.title}
        </motion.div>
        <motion.div 
          className="text-base text-black/70 dark:text-white/70"
          animate={{ 
            opacity: i < visibleLogos ? 1 : 0,
            y: i < visibleLogos ? 0 : 20
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: i < visibleLogos ? i * 0.2 + 0.4 : 0
          }}
        >
          {f.desc}
        </motion.div>
      </motion.div>
    ))}
  </div>
);

export default FeatureGrid; 