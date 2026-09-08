'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const NoiseBackground = ({
  className,
  children,
  containerClassName,
  gradientColor = 'from-brand-600 to-indigo-600',
}: {
  className?: string;
  children?: React.ReactNode;
  containerClassName?: string;
  gradientColor?: string;
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-tr shadow-md transition-all duration-300 hover:shadow-lg',
        gradientColor,
        containerClassName,
      )}
    >
      {/* Noise Texture Layer via SVG Data URI */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />
      {/* Subtle Top-Edge Highlight for Luxury Depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      <div className={cn('relative z-10', className)}>{children}</div>
    </div>
  );
};
