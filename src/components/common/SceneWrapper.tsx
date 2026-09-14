import React from 'react';
import { motion } from 'framer-motion';

interface SceneWrapperProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}

export function SceneWrapper({ children, className = '', scrollable = false }: SceneWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className={`relative flex h-[100dvh] w-full flex-col items-center justify-center px-6 py-10 ${
        scrollable ? 'scene-scroll' : 'overflow-hidden'
      } ${className}`}
    >
      {children}
    </motion.section>
  );
}
