'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

export const ResizableFloatingNavbar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    if (typeof current === 'number') {
      if (current > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  });

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none px-3 sm:px-6 pt-2 sm:pt-3"
    >
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 26,
        }}
        className={cn(
          'pointer-events-auto w-full transition-all duration-300 flex items-center justify-between',
          isScrolled
            ? 'max-w-5xl py-2 px-4 sm:px-6 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl backdrop-saturate-150 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.03]'
            : 'max-w-7xl py-3 px-4 sm:px-8 rounded-2xl bg-white/50 backdrop-blur-md border border-slate-200/50 shadow-sm',
          className,
        )}
      >
        {children}
      </motion.div>
    </motion.header>
  );
};
