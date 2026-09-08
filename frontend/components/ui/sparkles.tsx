'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

export const SparklesCore = ({
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  return (
    <div
      className={cn('w-full h-full relative overflow-hidden pointer-events-none', className)}
      style={{ background: background || 'transparent' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/10 to-transparent blur-3xl opacity-50" />
    </div>
  );
};
