import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'emerald' | 'slate' | 'amber' | 'cyan' | 'violet' | 'indigo' | 'outline';
}

export function Badge({ className, variant = 'brand', children, ...props }: BadgeProps) {
  const variants = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200/60',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/60',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200/60',
    violet: 'bg-purple-50 text-purple-700 border-purple-200/60',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    outline: 'bg-white text-slate-600 border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
