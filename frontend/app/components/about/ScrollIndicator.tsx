import { motion } from "framer-motion";

const ScrollIndicator = ({ visibleLogos, totalLogos }: { visibleLogos: number; totalLogos: number }) => (
  <motion.div 
    className="mt-12 text-center"
    animate={{ 
      opacity: visibleLogos < totalLogos ? 1 : 0,
      y: visibleLogos < totalLogos ? 0 : 20
    }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-32 h-1 bg-black/20 dark:bg-white/20 rounded-full mx-auto overflow-hidden">
      <motion.div 
        className="h-full bg-black dark:bg-white rounded-full"
        style={{ width: `${(visibleLogos / totalLogos) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </motion.div>
);

export default ScrollIndicator; 