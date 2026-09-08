'use client';

import { cn } from '@/lib/utils';
import React from 'react';

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
        'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-7xl mx-auto',
        className
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
        'row-span-1 rounded-3xl group/bento hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 bg-white dark:bg-[#0e121b] border border-slate-200/90 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-500/50 justify-between flex flex-col space-y-4 cursor-pointer relative overflow-hidden',
        className
      )}
    >
      {/* Top subtle hover highlight gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity" />

      {header}

      <div className="group-hover/bento:translate-x-1 transition duration-200 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <div className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
              {title}
            </div>
          </div>
          {badge}
        </div>
        <div className="font-normal text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
