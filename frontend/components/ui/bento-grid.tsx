import * as React from 'react';
import { cn } from '@/lib/utils';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  badge,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'row-span-1 rounded-3xl group/bento hover:shadow-premium transition-all duration-300 p-6 bg-white border border-slate-200/90 justify-between flex flex-col space-y-4 hover:border-brand-300 relative overflow-hidden',
        className,
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-100/40 to-transparent rounded-full blur-2xl pointer-events-none opacity-0 group-hover/bento:opacity-100 transition-opacity" />
      
      {header}
      
      <div className="transition duration-200 relative z-10">
        <div className="flex items-center justify-between mb-3">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100/80 group-hover/bento:scale-110 group-hover/bento:bg-brand-600 group-hover/bento:text-white transition-all duration-300">
              {icon}
            </div>
          )}
          {badge}
        </div>

        <div className="font-bold text-slate-900 text-lg mb-1.5 tracking-tight group-hover/bento:text-brand-600 transition-colors">
          {title}
        </div>
        <div className="font-normal text-slate-600 text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
