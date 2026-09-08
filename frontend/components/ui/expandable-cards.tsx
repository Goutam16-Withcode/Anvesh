'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';
import { X, Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import { useAuth } from '@/lib/auth-context';

export interface ExpandableCardItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  badgeVariant?: 'brand' | 'emerald' | 'cyan' | 'slate' | 'violet';
  icon?: React.ReactNode;
  shortDescription: string;
  ctaText?: string;
  ctaAction?: () => void;
  metrics?: Array<{ label: string; value: string }>;
  tags?: string[];
  content: React.ReactNode | (() => React.ReactNode);
}

export function ExpandableCards({
  items,
  className,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}: {
  items: ExpandableCardItem[];
  className?: string;
  gridCols?: string;
}) {
  const [active, setActive] = useState<ExpandableCardItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { openAuthModal } = useAuth();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Modal & Backdrop Overlay */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Card Container */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[88vh] bg-white dark:bg-[#0e121b] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden z-10 my-auto"
            >
              {/* Close Button Top Right */}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors z-20 border border-slate-200/80 dark:border-slate-700"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="p-6 sm:p-7 bg-gradient-to-b from-slate-50 to-white dark:from-[#131826] dark:to-[#0e121b] border-b border-slate-200/80 dark:border-slate-800/80 pr-14">
                <div className="flex items-center gap-2 mb-2">
                  {active.icon && (
                    <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center border border-brand-200/60 dark:border-brand-800/60 shrink-0">
                      {active.icon}
                    </div>
                  )}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {active.category}
                  </span>
                  {active.badge && (
                    <Badge variant={active.badgeVariant || 'brand'} className="text-[10px] font-bold ml-auto sm:ml-2">
                      {active.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-lg sm:text-2xl tracking-tight leading-tight">
                  {active.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
                  {active.shortDescription}
                </p>

                {/* Metric Summary Badges */}
                {active.metrics && active.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                    {active.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#161c2c] border border-slate-200/90 dark:border-slate-800 shadow-xs"
                      >
                        <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold text-brand-600 dark:text-brand-400 font-mono">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scrollable Modal Body */}
              <div className="p-6 sm:p-7 overflow-y-auto max-h-[48vh] text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
                {typeof active.content === 'function' ? active.content() : active.content}
              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 sm:p-5 bg-slate-50/90 dark:bg-[#111522] border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {active.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white dark:bg-[#1a2033] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none text-xs h-9 px-4"
                    onClick={() => setActive(null)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="noise"
                    className="flex-1 sm:flex-none text-xs font-bold gap-1.5 h-9 px-4 shadow-md shadow-brand-500/20"
                    onClick={() => {
                      if (active.ctaAction) {
                        active.ctaAction();
                      } else {
                        openAuthModal('signup');
                      }
                      setActive(null);
                    }}
                  >
                    <span>{active.ctaText || 'Experience Live'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid of Interactive Cards */}
      <div className={cn('grid gap-6', gridCols, className)}>
        {items.map((card) => (
          <div
            key={card.id}
            onClick={() => setActive(card)}
            className="group relative p-6 rounded-3xl bg-white dark:bg-[#0f1422] border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-400 dark:hover:border-brand-500 shadow-subtle hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer overflow-hidden"
          >
            {/* Top Hover Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {card.icon && (
                    <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-brand-50 group-hover:text-brand-600 dark:group-hover:bg-brand-950/60 dark:group-hover:text-brand-400 transition-colors">
                      {card.icon}
                    </div>
                  )}
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    {card.category}
                  </span>
                </div>

                {card.badge && (
                  <Badge variant={card.badgeVariant || 'brand'} className="text-[10px] font-bold">
                    {card.badge}
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {card.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3">
                  {card.shortDescription}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Click to know more</span>
                <ArrowRight className="w-3 h-3" />
              </span>

              {card.metrics && card.metrics[0] && (
                <span className="font-mono text-[10px] text-slate-400">
                  {card.metrics[0].label}: <strong className="text-slate-700 dark:text-slate-300">{card.metrics[0].value}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
