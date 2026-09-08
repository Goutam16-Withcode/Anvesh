'use client';

import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu as MenuIcon, X } from 'lucide-react';

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

export const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('relative block md:hidden', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2 items-center z-50"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.04,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.04 }}
              >
                {item.onClick ? (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setOpen(false);
                    }}
                    className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg text-slate-200 hover:text-brand-400"
                    title={item.title}
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg text-slate-200 hover:text-brand-400"
                    title={item.title}
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md text-slate-200 hover:text-white"
        aria-label="Toggle Social Links"
      >
        {open ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
      </button>
    </div>
  );
};

export const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto flex h-12 sm:h-14 gap-2.5 sm:gap-3 items-center rounded-2xl sm:rounded-full bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-800 px-3.5 shadow-xl',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-120, 0, 120], [34, 52, 34]);
  const heightTransform = useTransform(distance, [-120, 0, 120], [34, 52, 34]);

  const widthTransformIcon = useTransform(distance, [-120, 0, 120], [16, 24, 16]);
  const heightTransformIcon = useTransform(distance, [-120, 0, 120], [16, 24, 16]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });

  const [hovered, setHovered] = useState(false);

  const innerNode = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="aspect-square rounded-full bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/60 flex items-center justify-center relative transition-colors shadow-sm cursor-pointer group"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 4, x: '-50%' }}
            transition={{ duration: 0.15 }}
            className="px-2.5 py-1 whitespace-nowrap rounded-md bg-slate-950 text-white text-[11px] font-semibold border border-slate-800 shadow-2xl absolute left-1/2 -top-10 w-fit pointer-events-none z-50"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center text-slate-300 group-hover:text-white"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (onClick && (!href || href === '#')) {
    return (
      <button type="button" onClick={onClick} className="focus:outline-none shrink-0">
        {innerNode}
      </button>
    );
  }

  return (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="shrink-0"
    >
      {innerNode}
    </Link>
  );
}
