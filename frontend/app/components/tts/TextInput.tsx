"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TextInputProps {
  inputText: string;
  isGenerating: boolean;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClearAll: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ 
  inputText, 
  isGenerating, 
  onTextChange, 
  onClearAll 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-8 text-black dark:text-white tracking-tight">
          Enter Text
        </h2>
        <div className="space-y-4">
          <textarea
            value={inputText}
            onChange={onTextChange}
            placeholder="Type or paste the text you want to translate to sign language... (Letters A-Z will show ASL finger spelling)"
            className="w-full h-48 p-4 border border-[#333] rounded-lg bg-white dark:bg-neutral-950 text-black dark:text-white resize-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
            disabled={isGenerating}
          />
          <div className="flex items-center justify-between text-sm text-black/60 dark:text-white/60">
            <span>{inputText.length} characters</span>
            <span>{inputText.trim().split(/\s+/).filter(word => word.length > 0).length} words</span>
            {isGenerating && (
              <span className="flex items-center text-blue-600 dark:text-blue-400">
                <div className="w-3 h-3 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-6">
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClearAll}
          disabled={isGenerating}
          className={`flex-1 px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 ${
            isGenerating
              ? 'border-2 border-gray-400 bg-[rgba(31,31,31,0.05)] text-gray-400 cursor-not-allowed'
              : 'border-2 border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-lg hover:shadow-xl'
          }`}
        >
          Clear All
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TextInput; 