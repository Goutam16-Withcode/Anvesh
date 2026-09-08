'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ColourfulTextProps {
  text: string;
  className?: string;
  colors?: string[];
  intervalMs?: number;
}

export function ColourfulText({
  text,
  className = '',
  colors = [
    'rgb(99, 102, 241)',   // Indigo
    'rgb(168, 85, 247)',  // Purple / Amethyst
    'rgb(56, 189, 248)',  // Sky / Cyan
    'rgb(16, 185, 129)',  // Emerald
    'rgb(245, 158, 11)',  // Amber / Solar Gold
    'rgb(244, 63, 94)',   // Rose / Coral
    'rgb(14, 165, 233)',  // Electric Azure
    'rgb(20, 184, 166)',  // Teal Jade
  ],
  intervalMs = 3000,
}: ColourfulTextProps) {
  const [currentColors, setCurrentColors] = useState(colors);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [colors, intervalMs]);

  return (
    <span className={`inline-flex flex-nowrap font-extrabold ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{
            y: 0,
          }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -4, 0],
            scale: [1, 1.05, 1],
            filter: ['blur(0px)', 'blur(3px)', 'blur(0px)'],
            opacity: [1, 0.85, 1],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.04,
            ease: 'easeInOut',
          }}
          className="inline-block whitespace-pre tracking-tight select-none"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
