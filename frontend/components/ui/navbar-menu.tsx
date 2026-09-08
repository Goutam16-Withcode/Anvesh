'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-slate-700 hover:text-brand-600 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-slate-100/60 transition-colors"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl p-4 min-w-[280px]"
              >
                <motion.div layout className="w-max h-full p-2">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-subtle flex justify-center space-x-1 px-4 py-1.5"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  icon,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}) => {
  return (
    <a
      href={href}
      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
    >
      {icon && (
        <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-100/80 group-hover/item:scale-105 group-hover/item:bg-brand-600 group-hover/item:text-white transition-all">
          {icon}
        </div>
      )}
      <div className="text-left">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold text-slate-900 group-hover/item:text-brand-600 transition-colors">
            {title}
          </h4>
          {badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              {badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 line-clamp-2 max-w-[200px] leading-relaxed mt-0.5">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <a
      href={href}
      className={cn(
        'text-slate-600 hover:text-brand-600 text-xs font-medium py-1 block transition-colors',
        className,
      )}
    >
      {children}
    </a>
  );
};
