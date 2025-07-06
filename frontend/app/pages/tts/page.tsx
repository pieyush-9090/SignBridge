"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  TextInput, 
  SignAnimation, 
  Instructions, 
  PageHeader,
  HomeButton
} from '../../components/tts';
import QuickActions from '../../components/tts/QuickActions';
import { SignImage, processTextToSigns, filterTextForSigns } from '../../utils/signUtils';

const TextToSignPage = () => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSigns, setGeneratedSigns] = useState<SignImage[]>([]);
  const [debouncedText, setDebouncedText] = useState('');

  // Debounce the text input to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(inputText);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [inputText]);

  // Move processText definition above useEffect
  const processText = useCallback(async () => {
    if (!debouncedText.trim()) {
      setGeneratedSigns([]);
      return;
    }

    setIsGenerating(true);
    
    try {
      const filteredText = filterTextForSigns(debouncedText);
      const signs = await processTextToSigns(filteredText);
      setGeneratedSigns(signs);
    } catch (error) {
      console.error('Error processing text to signs:', error);
      // Fallback to simple character display
      const fallbackSigns: SignImage[] = debouncedText.split('').map(char => ({
        character: char.toUpperCase(),
        imageUrl: '',
        isLetter: /^[A-Z]$/.test(char.toUpperCase())
      }));
      setGeneratedSigns(fallbackSigns);
    } finally {
      setIsGenerating(false);
    }
  }, [debouncedText]);

  useEffect(() => {
    if (debouncedText) {
      processText();
      setGeneratedSigns([]);
    }
  }, [debouncedText, processText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const generateSigns = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to translate');
      return;
    }

    // The processing is now automatic, but we can trigger it manually if needed
    await processText();
  };

  const clearAll = () => {
    setInputText('');
    setGeneratedSigns([]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans">
      <PageHeader />
      <HomeButton />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white mb-12 text-left leading-tight">
          Text to Sign Language Translator
        </h1>
        <div className="mb-12">
          <SignAnimation 
            generatedSigns={generatedSigns}
            isGenerating={isGenerating}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col h-full justify-start">
            <TextInput 
              inputText={inputText}
              isGenerating={isGenerating}
              onTextChange={handleTextChange}
              onGenerateSigns={generateSigns}
              onClearAll={clearAll}
            />
          </div>
          <div className="flex flex-col h-full justify-start space-y-12">
            <Instructions />
            <QuickActions onTextChange={handleTextChange} isGenerating={isGenerating} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextToSignPage; 