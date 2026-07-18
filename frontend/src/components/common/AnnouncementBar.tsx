import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const AnnouncementBar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-cyber-yellow text-dark-text py-2.5 px-4 text-center text-xs font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer group hover:bg-opacity-95 transition-all duration-300 relative z-50 animate-on-scroll"
    >
      <span className="inline-flex items-center gap-1">
        <span className="animate-pulse">✨</span> New AI Invoice Scanner is now live
      </span>
      <span className="font-bold inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform duration-300">
        Try it now <ArrowRight className="w-3 h-3" />
      </span>
    </motion.div>
  );
};
