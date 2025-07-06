"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HomeButton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-6 right-6 z-30"
    >
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1, y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 flex items-center justify-center"
          aria-label="Go to home page"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            />
          </svg>
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default HomeButton; 