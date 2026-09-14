import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base =
    'ripple relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-body text-base font-medium tracking-wide transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300';

  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-glow hover:shadow-[0_0_35px_rgba(255,95,162,0.5)]',
    ghost: 'glass text-blush hover:bg-white/10',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
