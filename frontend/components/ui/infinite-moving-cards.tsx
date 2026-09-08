'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    match: string;
    salary: string;
    logo?: string;
  }[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards',
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse',
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '22s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '38s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '60s');
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-5 py-4 w-max flex-nowrap',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{
          animation: `scroll var(--animation-duration, 35s) var(--animation-direction, forwards) linear infinite`,
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[340px] max-w-full relative rounded-2xl border border-slate-200/90 bg-white/95 px-6 py-5 shadow-subtle hover:shadow-card hover:border-brand-300 transition-all shrink-0"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                  <p className="text-[10px] text-slate-500">{item.title}</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {item.match}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed italic mb-3">
              &ldquo;{item.quote}&rdquo;
            </p>

            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
              <span className="text-slate-400 font-medium">Trajectory Lift</span>
              <span className="font-bold text-brand-600 font-mono">{item.salary}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
