'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

export interface AccordionItemData {
  id?: string;
  title: string;
  content: React.ReactNode;
  category?: string;
  badge?: string;
  icon?: React.ReactNode;
  tags?: string[];
}

export function Accordion({
  items,
  className,
}: {
  items: AccordionItemData[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className={cn('space-y-3 sm:space-y-4', className)}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={cn(
              'rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden bg-white dark:bg-[#0e121b]',
              isOpen
                ? 'border-brand-400 dark:border-brand-500/60 shadow-lg shadow-brand-500/5 dark:shadow-brand-500/10'
                : 'border-slate-200/90 dark:border-slate-800 shadow-subtle hover:border-slate-300 dark:hover:border-slate-700'
            )}
          >
            {/* Accordion Question Trigger */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors focus:outline-none group"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 sm:gap-3.5 pr-3">
                {item.icon && (
                  <div
                    className={cn(
                      'w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border transition-colors',
                      isOpen
                        ? 'bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-800/60'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-700 group-hover:bg-brand-50 group-hover:text-brand-600'
                    )}
                  >
                    {item.icon}
                  </div>
                )}
                <div>
                  {(item.category || item.badge) && (
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {item.category && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                          {item.category}
                        </span>
                      )}
                      {item.badge && (
                        <Badge variant="brand" className="text-[9px] py-0 px-1.5 font-bold">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  )}
                  <h3
                    className={cn(
                      'font-extrabold text-sm sm:text-base md:text-lg transition-colors leading-snug',
                      isOpen
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-slate-900 dark:text-slate-100 group-hover:text-brand-600'
                    )}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Chevron Icon Container */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border',
                  isOpen
                    ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 border-brand-200 rotate-180'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Smooth Collapsible Answer Container */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                    {item.content}

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-2 flex-wrap">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
