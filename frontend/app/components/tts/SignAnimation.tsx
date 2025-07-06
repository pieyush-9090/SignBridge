import React, { useRef } from 'react';
import { SignImage } from '../../utils/signUtils';
import InlineSVGImage from '../common/InlineSVGImage';
import { motion, AnimatePresence } from 'framer-motion';

interface SignAnimationProps {
  generatedSigns: SignImage[];
  isGenerating: boolean;
  onCopyAll?: () => void;
  onDownloadImage?: () => void;
}

const SignAnimation: React.FC<SignAnimationProps> = ({ generatedSigns, isGenerating }) => {
  const signString = generatedSigns.map(sign => sign.character).join('');
  const copyRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Copy and download handlers (optional, for future extensibility)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(signString);
      if (copyRef.current) {
        copyRef.current.innerText = 'Copied!';
        setTimeout(() => {
          if (copyRef.current) copyRef.current.innerText = 'Copy All';
        }, 1200);
      }
    } catch (e) {
      alert('Failed to copy');
    }
  };

  const handleDownload = async () => {
    if (!gridRef.current) return;
    // Use html2canvas if you want to implement download as image
    // (not included here for brevity, but can be added back if needed)
  };

  return (
    <>
      <div className="flex items-center justify-between w-full px-2 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white tracking-tight">Sign Animation</h2>
        <button
          ref={copyRef}
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-bold shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-sm"
          aria-label="Copy all generated signs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy All
        </button>
      </div>
      <section className="sign-language-output relative w-full" style={{marginTop: 30}}>
        {/* Sign output area: compact, wrapped tiles, no scroll */}
        <div
          ref={gridRef}
          className="flex flex-wrap items-end justify-center w-full gap-x-6 gap-y-6 px-1"
          style={{ minHeight: 110, marginTop: 8 }}
          tabIndex={0}
          aria-label="Sign animation output area"
        >
          <AnimatePresence>
            {isGenerating ? (
              <motion.div className="flex items-center justify-center w-full text-blue-600 dark:text-blue-400 animate-pulse text-base sm:text-lg">
                Generating signs...
              </motion.div>
            ) : generatedSigns.length === 0 ? (
              <motion.div className="flex items-center justify-center w-full text-gray-400 dark:text-gray-500 text-base sm:text-lg">
                Sign language images will appear here.
              </motion.div>
            ) : (
              generatedSigns.map((sign, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className="flex flex-col items-center rounded-lg shadow p-1 min-w-[48px] bg-transparent mx-4"
                  style={{ width: 48 }}
                >
                  {sign.imageUrl ? (
                    <InlineSVGImage
                      src={sign.imageUrl}
                      alt={`Sign for ${sign.character}`}
                      className="h-[44px] w-auto text-white"
                    />
                  ) : (
                    <span className="h-[44px] w-[28px] flex items-center justify-center text-base font-bold text-gray-400 bg-transparent rounded-lg border border-gray-200 dark:border-gray-700 mb-0.5">
                      {sign.character}
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-black dark:text-white tracking-wider mt-0.5" aria-label={sign.character}>
                    {sign.character}
                  </span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        <style jsx>{`
          .sign-language-output {
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
            min-height: 150px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
          }
          .sign-language-output img, .sign-language-output svg {
            height: 80px;
            margin: 5px;
          }
        `}</style>
      </section>
    </>
  );
};

export default SignAnimation;