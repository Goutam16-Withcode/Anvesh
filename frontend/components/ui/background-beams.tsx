'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]',
        className,
      )}
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
    </div>
  );
};
