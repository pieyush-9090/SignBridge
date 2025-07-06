import { useEffect, useState } from "react";

const introText = `At SignBridge, we provide two seamless and accessible services designed to foster inclusive communication between the hearing and non-hearing communities: `;

const TypewriterIntro = () => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(introText.slice(0, i + 1));
      i++;
      if (i === introText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl text-center mx-auto mb-12 min-h-[4rem]">
      <p className="text-base md:text-lg lg:text-xl text-black/80 dark:text-white/80 leading-relaxed">
        {displayed}
        
      </p>
    </div>
  );
};

export default TypewriterIntro; 