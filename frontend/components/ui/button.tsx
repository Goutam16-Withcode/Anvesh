'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow' | 'noise' | 'noise-dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'noise', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'group relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] overflow-hidden';

    const variants = {
      noise:
        'bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-700 text-white shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/35 border border-white/20 hover:border-white/30',
      'noise-dark':
        'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md shadow-slate-900/30 hover:shadow-lg hover:shadow-slate-900/40 border border-slate-700/60 hover:border-slate-600',
      primary:
        'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-sm shadow-brand-500/20 hover:shadow-md hover:shadow-brand-500/30 border border-brand-500/20',
      secondary:
        'bg-slate-100 text-slate-800 hover:bg-slate-200/80 border border-slate-200/60 shadow-subtle',
      outline:
        'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-subtle',
      ghost:
        'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60',
      glow:
        'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-brand-500/25 border border-slate-700/50',
    };

    const sizes = {
      sm: 'text-xs px-4 py-1.5 gap-1.5 min-h-[36px]',
      md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
      lg: 'text-base px-7 py-3.5 gap-2.5 min-h-[50px]',
    };

    const isNoiseVariant = variant === 'noise' || variant === 'noise-dark' || variant === 'primary';

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Aceternity Noise Layer Overlay */}
        {isNoiseVariant && (
          <>
            <div
              className="pointer-events-none absolute inset-0 h-full w-full opacity-30 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px',
              }}
            />
            {/* Top Sheen Highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            {/* Hover Glow Sweep */}
            <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[sweep_0.75s_ease-in-out]" />
          </>
        )}
        <span className="relative z-10 flex items-center justify-center gap-2 whitespace-normal leading-normal text-center">{children}</span>
      </button>
    );
  },
);
Button.displayName = 'Button';
