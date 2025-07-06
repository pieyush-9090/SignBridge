"use client";

import React from 'react';

const Instructions: React.FC = () => {
  const instructions = [
    "Position yourself in front of the camera",
    "Ensure good lighting for better recognition",
    "Start recording and begin signing",
    "Stop recording when finished"
   
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-black dark:text-white tracking-tight">
        How to use:
      </h3>
      <ul className="space-y-3 text-base text-black/80 dark:text-white/80">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex items-start">
            <span className="text-black dark:text-white font-semibold mr-2">•</span>
            {instruction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Instructions; 