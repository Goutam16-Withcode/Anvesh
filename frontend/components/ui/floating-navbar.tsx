'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
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
      if (current > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  });

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6"
    >
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 24,
        }}
        className={cn(
          'pointer-events-auto w-full transition-all duration-300 flex items-center justify-between',
          isScrolled
            ? 'max-w-5xl top-3.5 mt-3 py-2.5 px-6 rounded-full bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/5'
            : 'max-w-7xl top-0 mt-0 py-4 px-6 sm:px-8 rounded-2xl bg-white/60 backdrop-blur-md border-b border-slate-200/60 shadow-none',
          className,
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
