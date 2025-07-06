"use client";

import React from 'react';
import { motion } from 'framer-motion';

const PageHeader: React.FC = () => {
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-black dark:text-white tracking-tight"
      >
        Sign to Text Translation
      </motion.h1>
    </header>
  );
};

export default PageHeader; 