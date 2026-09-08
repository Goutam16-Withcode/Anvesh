'use client';

import React from 'react';

export interface AnveshLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  animate?: boolean;
  variant?: 'brand' | 'sunset' | 'cyan' | 'monochrome';
}

/**
 * Bespoke ANVESH Logo Mark
 * 
 * Concept:
 * - Crisp, geometric stylized 'A' letterform fused with a 3D orbital trajectory ring.
 * - Pure vector graphics on transparent background (zero blurry halos or backdrop artifacts).
 * - Represents the core mission of ANVESH (अन्वेषण - Systematic Inquiry, Discovery, Trajectory Navigation).
 */
export function AnveshLogo({
  size = 'md',
  className = '',
  animate = false,
  variant = 'brand',
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

  // Gradient configurations based on platform theme
  const getGradients = () => {
    switch (variant) {
      case 'sunset':
        // Cosmic Sunset: Vivid Fuchsia / Rose -> Radiant Coral -> Amber Gold
        return {
          leftLeg: { start: '#E11D48', mid: '#F43F5E', end: '#FB7185' },
          rightLeg: { start: '#F43F5E', mid: '#FB923C', end: '#FBBF24' },
          orbitFront: { start: '#EC4899', mid: '#F43F5E', end: '#FB923C' },
          orbitBack: { start: '#F43F5E', end: '#FB7185' },
        };
      case 'cyan':
        // Electric Cyan -> Deep Sky
        return {
          leftLeg: { start: '#0284C7', mid: '#06B6D4', end: '#38BDF8' },
          rightLeg: { start: '#06B6D4', mid: '#38BDF8', end: '#7DD3FC' },
          orbitFront: { start: '#0284C7', mid: '#38BDF8', end: '#BAE6FD' },
          orbitBack: { start: '#BAE6FD', end: '#38BDF8' },
        };
      case 'monochrome':
        // Minimalist clean white/silver
        return {
          leftLeg: { start: '#FFFFFF', mid: '#E2E8F0', end: '#94A3B8' },
          rightLeg: { start: '#FFFFFF', mid: '#E2E8F0', end: '#CBD5E1' },
          orbitFront: { start: '#FFFFFF', mid: '#E2E8F0', end: '#94A3B8' },
          orbitBack: { start: '#94A3B8', end: '#64748B' },
        };
      case 'brand':
      default:
        // ANVESH Signature Theme: Deep Royal Indigo -> Electric Violet -> Vibrant Cyan -> Mint
        return {
          leftLeg: { start: '#4338CA', mid: '#6366F1', end: '#818CF8' },
          rightLeg: { start: '#6366F1', mid: '#38BDF8', end: '#06B6D4' },
          orbitFront: { start: '#06B6D4', mid: '#6366F1', end: '#A5B4FC' },
          orbitBack: { start: '#818CF8', end: '#38BDF8' },
        };
    }
  };

  const g = getGradients();

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 bg-transparent ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      {/* Bespoke Geometric 3D 'A' + Trajectory Orbit Logo (Pure crisp vector, no background blur) */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none overflow-visible"
      >
        <defs>
          {/* Gradient: Left Leg of 'A' */}
          <linearGradient id={`aLeftGrad-${uniqueId}`} x1="30%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={g.leftLeg.start} />
            <stop offset="50%" stopColor={g.leftLeg.mid} />
            <stop offset="100%" stopColor={g.leftLeg.end} />
          </linearGradient>

          {/* Gradient: Right Leg of 'A' */}
          <linearGradient id={`aRightGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={g.rightLeg.start} />
            <stop offset="50%" stopColor={g.rightLeg.mid} />
            <stop offset="100%" stopColor={g.rightLeg.end} />
          </linearGradient>

          {/* Gradient: Front Orbit Ribbon */}
          <linearGradient id={`orbitFrontGrad-${uniqueId}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={g.orbitFront.start} />
            <stop offset="50%" stopColor={g.orbitFront.mid} />
            <stop offset="100%" stopColor={g.orbitFront.end} />
          </linearGradient>

          {/* Gradient: Back Orbit Loop (Behind Right Leg) */}
          <linearGradient id={`orbitBackGrad-${uniqueId}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={g.orbitBack.start} />
            <stop offset="100%" stopColor={g.orbitBack.end} />
          </linearGradient>

          {/* Inner Apex Shading */}
          <linearGradient id={`apexShadow-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* =========================================================================
            LAYER 1: BACK ORBIT ARC (Curves in 3D depth behind the right leg of 'A')
            ========================================================================= */}
        <path
          d="M 66 52 C 78 40, 92 32, 97 28 C 98.5 27, 98.8 28.5, 96.5 32 C 90 41, 78 54, 69 63"
          stroke={`url(#orbitBackGrad-${uniqueId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Back orbit thin accent glow ring */}
        <path
          d="M 68 50 C 80 39, 94 30, 98 27"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* =========================================================================
            LAYER 2: RIGHT LEG OF 'A' (Descending from Apex to Bottom-Right Baseline)
            ========================================================================= */}
        <path
          d="M 64.5 24 L 64.5 34 L 88.5 98 L 100 98 L 74 24 Z"
          fill={`url(#aRightGrad-${uniqueId})`}
        />

        {/* =========================================================================
            LAYER 3: LEFT LEG OF 'A' (With geometric slit for the 3D orbital loop)
            ========================================================================= */}
        {/* Upper Left Segment (Apex down to slit) */}
        <path
          d="M 64.5 24 L 74 24 L 54.5 72 L 44 68 Z"
          fill={`url(#aLeftGrad-${uniqueId})`}
        />

        {/* Lower Left Segment (Below the orbital loop down to Baseline) */}
        <path
          d="M 40 82 L 48 85 L 34 100 L 22 100 Z"
          fill={`url(#aLeftGrad-${uniqueId})`}
        />

        {/* Subtle Apex Specular Highlight */}
        <path
          d="M 64.5 24 L 74 24 L 70 34 L 62 34 Z"
          fill={`url(#apexShadow-${uniqueId})`}
        />

        {/* =========================================================================
            LAYER 4: FRONT ORBITAL TRAJECTORY RIBBON (Loops across front of 'A')
            ========================================================================= */}
        {/* Main Ribbon Body (Tapered 3D curvature) */}
        <path
          d="M 23 100 C 20 101, 21 97, 24 94 C 31 85, 43 73, 58 60 C 73 47, 86 37, 96 28 C 98 26, 97 28, 94 31 C 83 41, 68 54, 52 68 C 38 80, 27 92, 23 100 Z"
          fill={`url(#orbitFrontGrad-${uniqueId})`}
        />

        {/* Front Loop Dynamic Crest Stroke for crispness and luminance */}
        <path
          d="M 23 99 C 32 88, 48 72, 65 57 C 78 45, 89 36, 96 28"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Crisp beacon spark at the orbital leading edge */}
        <circle cx="96" cy="28" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/**
 * Complete Brand Lockup: Logo Mark + Typographic Wordmark ONLY
 * Pure vector + crisp typography without blurry halos or extra badges.
 */
export function AnveshBrandLockup({
  size = 'md',
  variant = 'brand',
  isDarkBackground = false,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'brand' | 'sunset' | 'cyan' | 'monochrome';
  isDarkBackground?: boolean;
  className?: string;
}) {
  const logoSize = size === 'sm' ? 34 : size === 'lg' ? 48 : 40;
  const textSize = size === 'sm' ? 'text-lg font-black' : size === 'lg' ? 'text-2xl font-black' : 'text-xl font-black';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none bg-transparent ${className}`}>
      <AnveshLogo size={logoSize} variant={variant} />
      <span 
        className={`font-black ${textSize} tracking-wider font-sans transition-colors ${
          isDarkBackground 
            ? 'text-white' 
            : 'text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400'
        }`}
      >
        ANVESH
      </span>
    </div>
  );
}
