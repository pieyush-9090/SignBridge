import TypewriterIntro from './action/TypewriterIntro';
import AnimatedOnScroll from './action/AnimatedOnScroll';
import MinimalButton from './action/MinimalButton';
import { useRouter } from 'next/navigation';

const Action = () => {
  const router = useRouter();

  return (
  <section id="action" className="w-full min-h-[40vh] flex flex-col items-center justify-center bg-white dark:bg-neutral-950 text-black dark:text-white py-20">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">What we offer?</h2>
    
    <div className="max-w-2xl text-center mx-auto mb-12">
      <p>
      <TypewriterIntro />
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <AnimatedOnScroll direction="left" transition={{ delay: 0.3, duration: 1.2 }}>
        <div className="rounded-xl p-8 min-h-[200px] flex flex-col items-start justify-center">
          <h3 className="text-2xl font-semibold mb-2">Sign to Text Translation</h3>
          <p className="text-base text-black/80 dark:text-white/80">
            Using advanced machine learning and real-time gesture recognition powered by YOLOv8, our system accurately interprets sign language gestures and converts them into readable text. This allows hearing individuals to easily understand what a signer is communicating, making conversations smoother and more natural.
          </p>
          <div className="flex justify-center mt-6">
            <MinimalButton onClick={() => router.push('/pages/stt')}>
              Try Sign to Text
            </MinimalButton>
          </div>
        </div>
      </AnimatedOnScroll>
      <AnimatedOnScroll direction="right" transition={{ delay: 0.6, duration: 1.2 }}>
        <div className="rounded-xl p-8 min-h-[200px] flex flex-col items-start justify-center">
          <h3 className="text-2xl font-semibold mb-2">Text to Sign Translation</h3>
          <p className="text-base text-black/80 dark:text-white/80">
            Our application also enables the reverse — converting written text into corresponding sign language animations. This feature helps non-signers communicate effectively with the deaf and hard-of-hearing community, ensuring mutual understanding and reducing language barriers.
          </p>
          <div className="flex justify-center mt-6">
            <MinimalButton onClick={() => router.push('/pages/tts')}>
              Try Text to Sign
            </MinimalButton>
          </div>
        </div>
      </AnimatedOnScroll>
    </div>
  </section>
  );
};

export default Action; 