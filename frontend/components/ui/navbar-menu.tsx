'use client';

import React, { createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MenuContextType {
  active: string | null;
  setActive: (item: string | null) => void;
}

const MenuContext = createContext<MenuContextType>({
  active: null,
  setActive: () => {},
});

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 14,
  stiffness: 120,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <MenuContext.Provider value={{ active: null, setActive }}>
      <nav
        onMouseLeave={() => setActive(null)}
        className="relative rounded-full border border-slate-200/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center space-x-1 px-3 py-1 shadow-sm"
      >
        {children}
      </nav>
    </MenuContext.Provider>
  );
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const isOpen = active === item;

  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setActive(isOpen ? null : item)}
        className={cn(
          "cursor-pointer font-semibold text-sm px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 focus:outline-none",
          isOpen
            ? "text-brand-600 bg-brand-50/80"
            : "text-slate-700 hover:text-brand-600 hover:bg-slate-100/70"
        )}
      >
        <span>{item}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 pointer-events-auto"
            onMouseEnter={() => setActive(item)}
          >
            {/* Invisible hover bridge to prevent cursor gap drop */}
            <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={transition}
              className="bg-white/98 backdrop-blur-2xl rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl p-4 min-w-[280px]"
            >
              <div className="w-max max-w-[90vw] h-full p-1">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
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
  const { setActive } = useContext(MenuContext);

  return (
    <Link
      href={href}
      onClick={() => setActive(null)}
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group/item block"
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
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              {badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 line-clamp-2 max-w-[200px] leading-relaxed mt-0.5">
          {description}
        </p>
      </div>
    </Link>
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
  const { setActive } = useContext(MenuContext);

  return (
    <Link
      href={href}
      onClick={() => setActive(null)}
      className={cn(
        'text-slate-600 hover:text-brand-600 text-xs font-medium py-1.5 px-2 rounded-lg hover:bg-slate-50 block transition-colors',
        className,
      )}
    >
      {children}
    </Link>
  );
};
