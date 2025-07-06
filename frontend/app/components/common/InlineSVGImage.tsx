import React, { useEffect, useState } from 'react';

interface InlineSVGImageProps {
  src: string;
  alt: string;
  className?: string;
}

const InlineSVGImage: React.FC<InlineSVGImageProps> = ({ src, alt, className }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setSvgContent(null);
    setError(false);
    fetch(src)
      .then(res => {
        if (!res.ok) throw new Error('SVG not found');
        return res.text();
      })
      .then(data => {
        if (isMounted) setSvgContent(data);
      })
      .catch(() => {
        if (isMounted) setError(true);
      });
    return () => { isMounted = false; };
  }, [src]);

  if (error) {
    return <span className="w-24 h-32 flex items-center justify-center text-4xl font-bold text-gray-400 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-2">?</span>;
  }

  if (!svgContent) {
    return <span className="w-24 h-32 flex items-center justify-center text-lg text-gray-400 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-2 animate-pulse">Loading...</span>;
  }

  return (
    <div
      className={className}
      style={{ width: '6rem', height: '8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-label={alt}
    />
  );
};

export default InlineSVGImage; 