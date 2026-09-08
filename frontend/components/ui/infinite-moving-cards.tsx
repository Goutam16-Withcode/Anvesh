'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, TrendingUp, Compass, Zap, CheckCircle2 } from 'lucide-react';

export interface StreamMatchItem {
  name: string;
  title: string;
  quote: string;
  match: string;
  salary: string;
  latency?: string;
  timeAgo?: string;
  skills?: string[];
  logoBg?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
}: {
  items: StreamMatchItem[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Speed duration mapping in seconds
  const durationMap = {
    fast: 22,
    normal: 35,
    slow: 55,
  };

  const duration = durationMap[speed] || 35;
  const isLeft = direction === 'left';

  // Duplicate items for continuous seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] select-none py-3',
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex w-max gap-4 sm:gap-5"
        animate={{
          x: isLeft ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: duration,
            ease: 'linear',
          },
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="w-[320px] sm:w-[360px] max-w-[85vw] p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0e121b] border border-slate-200/90 dark:border-slate-800 shadow-subtle hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between shrink-0 group relative overflow-hidden"
          >
            {/* Top Micro Glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-3">
              {/* Header: Company Avatar & Match Score */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs text-white',
                    item.logoBg || 'bg-slate-900 dark:bg-slate-800'
                  )}>
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {item.timeAgo || 'Verified match'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs">
                    {item.match}
                  </span>
                </div>
              </div>

              {/* Role Title */}
              <div>
                <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-[13px] leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {item.title}
                </h5>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1 line-clamp-2">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Skills Chips */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap pt-0.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-mono text-[9px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Telemetry & Compensation Delta */}
            <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px]">
              <div className="flex items-center gap-1 text-slate-400 font-mono text-[10px]">
                <Zap className="w-3 h-3 text-amber-500" />
                <span>{item.latency || '1.2ms'}</span>
              </div>

              <div className="flex items-center gap-1 font-mono font-bold text-brand-600 dark:text-brand-400">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span>{item.salary}</span>
              </div>
            </div>

          </div>
        ))}
      </motion.div>
    </div>
  );
};
