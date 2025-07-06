"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TranslatedTextProps {
  translatedText: string;
  isProcessing: boolean;
  onClearText: () => void;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  translatedText, 
  isProcessing, 
  onClearText 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-8 text-black dark:text-white tracking-tight">
          Translated Text
        </h2>
        <div className="bg-white dark:bg-neutral-950 rounded-lg p-6 min-h-[200px] border border-[#333]">
          {isProcessing ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-3 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  Processing sign language...
                </p>
              </div>
            </div>
          ) : translatedText ? (
            <div className="space-y-4">
              <p className="text-xl leading-relaxed text-black dark:text-white font-medium">
                {translatedText}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium">Translation will appear here</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TranslatedText; 