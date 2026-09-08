'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnveshLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  withGlow?: boolean;
  animate?: boolean;
}

export function AnveshLogo({
  size = 'md',
  className = '',
  withGlow = true,
  animate = true,
}: AnveshLogoProps) {
  // Dimension mapping
  const sizePx = typeof size === 'number' 
    ? size 
    : size === 'xs' ? 24 
    : size === 'sm' ? 32 
    : size === 'md' ? 40 
    : size === 'lg' ? 48 
    : 64;

  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      {/* Ambient Gradient Halo Glow */}
      {withGlow && (
        <div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-600/40 via-indigo-500/30 to-teal-400/30 blur-md pointer-events-none -z-10"
          style={{ transform: 'scale(1.2)' }}
        />
      )}

      {/* Main Vector Astrolabe & Quantum Exploration Prism */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        <defs>
          {/* Primary Gradient: Deep Royal Indigo to Electric Cyan */}
          <linearGradient id={`brandGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Accent Prism Gradient: Amber / Emerald */}
          <linearGradient id={`accentGrad-${uniqueId}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>

          {/* Inner Core Glow Gradient */}
          <radialGradient id={`coreGlow-${uniqueId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#67E8F9" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#4F46E5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Facet Shading */}
          <linearGradient id={`facetDark-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312E81" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* 1. Outer Rounded Hexagonal Container / Shield */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="24"
          fill={`url(#facetDark-${uniqueId})`}
          stroke={`url(#brandGrad-${uniqueId})`}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 2. Precision Orbital Geometry (Vector Coordinate Rings) */}
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke={`url(#brandGrad-${uniqueId})`}
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.4"
        />

        <circle
          cx="50"
          cy="50"
          r="22"
          stroke={`url(#accentGrad-${uniqueId})`}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.5"
        />

        {/* 3. The ANVESH Exploration Diamond / Multi-Dimensional Vector Star */}
        {/* Top-Right Facet (Electric Cyan) */}
        <path
          d="M50 16 L76 50 L50 50 Z"
          fill={`url(#accentGrad-${uniqueId})`}
          opacity="0.9"
        />

        {/* Bottom-Left Facet (Royal Indigo) */}
        <path
          d="M50 84 L24 50 L50 50 Z"
          fill={`url(#brandGrad-${uniqueId})`}
          opacity="0.95"
        />

        {/* Top-Left Facet (Deep Violet) */}
        <path
          d="M50 16 L24 50 L50 50 Z"
          fill="#4338CA"
          opacity="0.75"
        />

        {/* Bottom-Right Facet (Teal Aqua) */}
        <path
          d="M50 84 L76 50 L50 50 Z"
          fill="#0EA5E9"
          opacity="0.8"
        />

        {/* 4. Cardinal Direction Beacons (Astrolabe Coordinates) */}
        <circle cx="50" cy="16" r="3" fill="#38BDF8" />
        <circle cx="50" cy="84" r="3" fill="#6366F1" />
        <circle cx="16" cy="50" r="3" fill="#818CF8" />
        <circle cx="84" cy="50" r="3" fill="#34D399" />

        {/* Dynamic Micro-Crosshairs */}
        <line x1="16" y1="50" x2="84" y2="50" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.3" />
        <line x1="50" y1="16" x2="50" y2="84" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.3" />

        {/* 5. Convergent Neural Core / Quantum Vector Origin (Luminous Center) */}
        <circle
          cx="50"
          cy="50"
          r="10"
          fill={`url(#coreGlow-${uniqueId})`}
        />

        <circle
          cx="50"
          cy="50"
          r="4.5"
          fill="#FFFFFF"
          className={animate ? 'animate-ping opacity-75' : ''}
          style={{ transformOrigin: '50px 50px', animationDuration: '3s' }}
        />

        <circle
          cx="50"
          cy="50"
          r="3"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}

/**
 * Complete Brand Lockup: Logo Mark + Typographic Wordmark + Sanskrit Heritage Badge
 */
export function AnveshBrandLockup({
  size = 'md',
  showBadge = true,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  className?: string;
}) {
  const logoSize = size === 'sm' ? 32 : size === 'lg' ? 44 : 38;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subTextSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      <AnveshLogo size={logoSize} />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black ${textSize} tracking-tight text-slate-900 dark:text-white font-sans group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors`}>
            ANVESH
          </span>
          {showBadge && (
            <span className={`${subTextSize} uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 shadow-xs font-mono`}>
              अन्वेष
            </span>
          )}
        </div>
        <span className={`${subTextSize} text-slate-400 dark:text-slate-400 font-medium tracking-wide -mt-0.5 hidden sm:inline`}>
          Career Intelligence Engine
        </span>
      </div>
    </div>
  );
}
