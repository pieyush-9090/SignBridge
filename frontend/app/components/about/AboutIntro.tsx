import { motion } from "framer-motion";
import Image from "next/image";

const AboutIntro = () => (
  <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-center justify-center px-6 pt-16 pb-8 gap-8 md:gap-16">
    <motion.div
      className="w-full md:w-1/2 flex justify-center md:justify-end"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      viewport={{ amount: 0.1 }}
    >
      <Image
        src="/About.png"
        alt="About SignBridge"
        width={380}
        height={380}
        className="rounded-xl shadow-2xl border border-white/10 object-contain w-full max-w-[380px]"
        priority
      />
    </motion.div>
    <motion.div
      className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      viewport={{ amount: 0.1 }}
    >
      <h2
        className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-black dark:text-white"
        style={{ fontFamily: "'Montserrat', Arial, Helvetica, sans-serif" }}
      >
        About SignBridge
      </h2>
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-700 dark:text-neutral-300">Real-time Sign Language Translation</h3>
      <p className="text-base md:text-lg lg:text-xl text-black/80 dark:text-white/80 leading-relaxed max-w-xl">
        SignBridge is an advanced ML-powered web application that utilizes YOLOv8 and Flask for real-time recognition of sign language gestures. With a remarkable 99% accuracy, it offers fast and precise predictions. SignBridge effectively bridges communication between hearing and non-hearing individuals, providing capabilities for both sign to text and text to sign translation.
      </p>
    </motion.div>
  </div>
);

export default AboutIntro; 