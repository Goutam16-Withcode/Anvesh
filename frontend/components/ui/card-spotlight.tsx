'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function CardSpotlight({
  children,
  radius = 350,
  color = 'rgba(79, 70, 229, 0.08)',
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.current = clientX - left;
    mouseY.current = clientY - top;
  }

  return (
    <div
      className={cn(
        'group/spotlight p-8 rounded-3xl relative border border-slate-200/90 bg-white hover:border-brand-300 transition-all duration-300 shadow-subtle hover:shadow-premium',
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(${radius}px circle at ${mouseX.current}px ${mouseY.current}px, ${color}, transparent 80%)`
            : undefined,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
