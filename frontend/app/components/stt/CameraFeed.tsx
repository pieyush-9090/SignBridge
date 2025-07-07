"use client";

import React, { useRef, ForwardedRef } from 'react';
import { motion } from 'framer-motion';

interface CameraFeedProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  prediction?: { class: string; confidence: number; bbox?: number[] } | null;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ 
  isRecording, 
  onStartRecording, 
  onStopRecording, 
  videoRef,
  prediction
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
          Camera Feed
        </h2>
        <div className="relative rounded-lg overflow-hidden aspect-video border border-[#333]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {/* Dynamic scanning frame overlay */}
          {prediction && prediction.bbox && (
            (() => {
              const [x1, y1, x2, y2] = prediction.bbox;
              const left = `${(x1 / 640) * 100}%`;
              const top = `${(y1 / 480) * 100}%`;
              const width = `${((x2 - x1) / 640) * 100}%`;
              const height = `${((y2 - y1) / 480) * 100}%`;
              return (
                <div
                  className="absolute border-4 border-green-400 rounded-xl animate-pulse pointer-events-none"
                  style={{ left, top, width, height, boxShadow: '0 0 0 2px rgba(34,197,94,0.5)' }}
                />
              );
            })()
          )}
          {/* Prediction overlay */}
          {prediction && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg flex items-center space-x-2">
              <span>{prediction.class}</span>
              <span className="text-green-400">{(prediction.confidence * 100).toFixed(1)}%</span>
            </div>
          )}
          {!isRecording && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-xl font-medium">Camera Ready</p>
                <p className="text-base text-gray-300 mt-2">Click Start to begin recording</p>
              </div>
            </div>
          )}
          {isRecording && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-2 bg-black/80 text-white px-3 py-1 rounded-full text-sm border border-white/20">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="font-medium">Recording</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-6">
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartRecording}
          disabled={isRecording}
          className={`flex-1 py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
            isRecording
              ? 'border-2 border-gray-400 bg-[rgba(31,31,31,0.05)] text-gray-400 cursor-not-allowed'
              : 'border-2 border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-lg hover:shadow-xl'
          }`}
        >
          Start Recording
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStopRecording}
          disabled={!isRecording}
          className={`flex-1 py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
            !isRecording
              ? 'border-2 border-gray-400 bg-[rgba(31,31,31,0.05)] text-gray-400 cursor-not-allowed'
              : 'border-2 border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-lg hover:shadow-xl'
          }`}
        >
          Stop Recording
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CameraFeed; 