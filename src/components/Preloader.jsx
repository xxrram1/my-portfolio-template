import React from 'react';
import { motion } from 'framer-motion';

/**
 * Preloader Component
 * A full-screen loading animation that displays initials and a progress bar.
 * It uses Framer Motion for smooth entrance and exit animations.
 */
const Preloader = () => {
  return (
    <motion.div
      // Container for the preloader, covering the entire screen
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
      // Animation for fading out
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <div className="w-64 text-center">
        {/* Animated Initials (KP) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 0.2 } }}
          className="text-5xl font-bold tracking-[0.3em] text-white/80 mb-4 ml-3" // ml-3 for optical alignment
        >
          KP
        </motion.div>
        
        {/* Progress bar container */}
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          {/* Animated progress bar */}
          <motion.div
            className="h-1 bg-white/80"
            initial={{ width: '0%' }}
            animate={{ width: '100%', transition: { duration: 1.5, ease: 'easeInOut', delay: 0.5 } }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
