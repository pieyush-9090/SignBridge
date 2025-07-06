"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  CameraFeed, 
  TranslatedText, 
  Instructions, 
  PageHeader,
  HomeButton
} from '../../components/stt';

const SignToTextPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<{ class: string; confidence: number; bbox: number[] } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sendFrameToBackend = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append('image', blob, 'frame.jpg');
            try {
              const response = await fetch('https://signbridge-5ai3.onrender.com', {
                method: 'POST',
                body: formData,
              });
              const data = await response.json();
              if (data.predictions && data.predictions.length > 0) {
                setTranslatedText(data.predictions.map((p: any) => p.class).join(', '));
                setPrediction({
                  class: data.predictions[0].class,
                  confidence: data.predictions[0].confidence,
                  bbox: data.predictions[0].bbox
                });
              } else {
                setTranslatedText('No sign detected.');
                setPrediction(null);
              }
            } catch (err) {
              setTranslatedText('Error contacting backend.');
              setPrediction(null);
            }
          }
        }, 'image/jpeg');
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsRecording(true);
        setIsProcessing(false);
        setTranslatedText('');
        // Start interval for continuous prediction
        intervalRef.current = setInterval(sendFrameToBackend, 1000); // every 1 second
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopRecording = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsRecording(false);
      setIsProcessing(false);
      // Stop interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  useEffect(() => {
    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const clearText = () => {
    setTranslatedText('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white">
      <PageHeader />
      <HomeButton />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <CameraFeed 
            isRecording={isRecording}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            videoRef={videoRef}
            prediction={prediction}
          />

          <div className="space-y-8">
            <TranslatedText 
              translatedText={translatedText}
              isProcessing={isProcessing}
              onClearText={clearText}
            />
            <Instructions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignToTextPage; 
