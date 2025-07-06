import React from 'react';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isGenerating: boolean;
}

const quickActions = [
  { text: 'HELLO', label: 'Hello' },
  { text: 'THANK YOU', label: 'Thank you' },
  { text: 'NICE TO MEET YOU', label: 'Nice to meet you' },
  { text: 'I LOVE YOU', label: 'I love you' }
];

const QuickActions: React.FC<QuickActionsProps> = ({ onTextChange, isGenerating }) => (
  <div>
    <h3 className="text-2xl font-bold mb-6 text-black dark:text-white tracking-tight">
      Quick Actions
    </h3>
    <div className="flex flex-wrap gap-3">
      {quickActions.map((action, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTextChange({ target: { value: action.text } } as React.ChangeEvent<HTMLTextAreaElement>)}
          disabled={isGenerating}
          className="px-6 py-3 text-base font-semibold border-2 border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {action.label}
        </motion.button>
      ))}
    </div>
  </div>
);

export default QuickActions; 