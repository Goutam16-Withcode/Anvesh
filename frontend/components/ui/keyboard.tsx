'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Command,
  Option,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Sun,
  Volume2,
  VolumeX,
  Play,
  SkipForward,
  SkipBack,
  Search,
  Mic,
  Moon,
  Volume1,
  Sparkles
} from 'lucide-react';

// Web Audio API mechanical key click synthesizer
function playKeyClickSound(frequency = 600) {
  try {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency + Math.random() * 80 - 40, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (_) {}
}

export interface KeyboardProps {
  className?: string;
  enableSound?: boolean;
  showPreview?: boolean;
  onKeyPress?: (key: string) => void;
}

export const Keyboard = ({
  className,
  enableSound = true,
  showPreview = true,
  onKeyPress,
}: KeyboardProps) => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [lastTyped, setLastTyped] = useState<string>('ANVESH AI Engine');
  const [capsLockActive, setCapsLockActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTriggerKey = useCallback(
    (keyName: string) => {
      if (enableSound) playKeyClickSound();
      
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.add(keyName.toLowerCase());
        return next;
      });

      if (keyName === 'Backspace' || keyName === 'delete') {
        setLastTyped((prev) => prev.slice(0, -1));
      } else if (keyName === 'Space' || keyName === ' ') {
        setLastTyped((prev) => (prev.length > 40 ? ' ' : prev + ' '));
      } else if (keyName.length === 1) {
        setLastTyped((prev) => (prev.length > 40 ? keyName : prev + keyName));
      } else if (keyName === 'CapsLock' || keyName === 'caps lock') {
        setCapsLockActive((prev) => !prev);
      }

      onKeyPress?.(keyName);

      setTimeout(() => {
        setActiveKeys((prev) => {
          const next = new Set(prev);
          next.delete(keyName.toLowerCase());
          return next;
        });
      }, 180);
    },
    [enableSound, onKeyPress]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (e.key === 'CapsLock') {
        setCapsLockActive((prev) => !prev);
      }
      if (enableSound) playKeyClickSound();
      
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.add(k);
        return next;
      });

      if (e.key === 'Backspace') {
        setLastTyped((prev) => prev.slice(0, -1));
      } else if (e.key === ' ') {
        setLastTyped((prev) => (prev.length > 40 ? ' ' : prev + ' '));
      } else if (e.key.length === 1) {
        setLastTyped((prev) => (prev.length > 40 ? e.key : prev + e.key));
      }
      onKeyPress?.(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(k);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enableSound, onKeyPress]);

  const isKeyActive = (keyId: string) => activeKeys.has(keyId.toLowerCase());

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative' }}
      className={cn(
        'relative w-full max-w-4xl mx-auto flex flex-col items-center select-none',
        className
      )}
    >
      {/* Keystroke Preview Screen */}
      {showPreview && (
        <div className="w-full max-w-[680px] mb-4 p-3.5 rounded-2xl bg-[#0e111a] border border-[#232a3d] shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-400">Live Terminal Input:</span>
            <span className="text-xs font-mono font-bold text-emerald-300">
              {lastTyped || <span className="text-slate-600">Type something on your keyboard...</span>}
            </span>
            <span className="w-1.5 h-4 bg-emerald-400/80 animate-pulse" />
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
            <Sparkles className="w-3 h-3 text-brand-400" />
            <span>Interactive Mechanical Audio Active</span>
          </div>
        </div>
      )}

      {/* Outer Aluminum Case Deck */}
      <div className="w-full max-w-[760px] bg-gradient-to-b from-[#222530] via-[#1a1c25] to-[#121319] p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-[#373d4d] shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col items-center">
        
        {/* Recessed Keyboard Matrix Well */}
        <div className="w-full bg-[#07080c] rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-[#1f2330] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] flex flex-col gap-1 sm:gap-1.5">
          
          {/* Row 1: Function Keys */}
          <div className="flex w-full gap-1 items-center">
            <KeyCap isActive={isKeyActive('escape')} onClick={() => handleTriggerKey('Escape')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><span className="text-[8px]">esc</span></KeyCap>
            <KeyCap isActive={isKeyActive('f1')} onClick={() => handleTriggerKey('F1')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><Sun className="w-2.5 h-2.5 opacity-60" /></KeyCap>
            <KeyCap isActive={isKeyActive('f2')} onClick={() => handleTriggerKey('F2')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><Sun className="w-2.5 h-2.5 opacity-90" /></KeyCap>
            <KeyCap isActive={isKeyActive('f3')} onClick={() => handleTriggerKey('F3')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><span className="text-[8px]">F3</span></KeyCap>
            <KeyCap isActive={isKeyActive('f4')} onClick={() => handleTriggerKey('F4')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><Search className="w-2.5 h-2.5 opacity-60" /></KeyCap>
            <KeyCap isActive={isKeyActive('f5')} onClick={() => handleTriggerKey('F5')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><Mic className="w-2.5 h-2.5 opacity-60" /></KeyCap>
            <KeyCap isActive={isKeyActive('f6')} onClick={() => handleTriggerKey('F6')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><Moon className="w-2.5 h-2.5 opacity-60" /></KeyCap>
            <KeyCap isActive={isKeyActive('f7')} onClick={() => handleTriggerKey('F7')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><SkipBack className="w-2.5 h-2.5 opacity-60" /></KeyCap>
            <KeyCap isActive={isKeyActive('f8')} onClick={() => handleTriggerKey('F8')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><Play className="w-2.5 h-2.5 opacity-60" /></KeyCap>
            <KeyCap isActive={isKeyActive('f9')} onClick={() => handleTriggerKey('F9')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><SkipForward className="w-2.5 h-2.5 opacity-60" /></KeyCap>
            <KeyCap isActive={isKeyActive('f10')} onClick={() => handleTriggerKey('F10')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><VolumeX className="w-2.5 h-2.5 opacity-60" /></KeyCap>
            <KeyCap isActive={isKeyActive('f11')} onClick={() => handleTriggerKey('F11')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><Volume1 className="w-2.5 h-2.5 opacity-60" /></KeyCap>
            <KeyCap isActive={isKeyActive('f12')} onClick={() => handleTriggerKey('F12')} className="flex-1 h-[1.1rem] sm:h-[1.4rem]"><Volume2 className="w-2.5 h-2.5 opacity-90" /></KeyCap>
            <KeyCap isActive={isKeyActive('power')} onClick={() => handleTriggerKey('Power')} className="flex-1 h-[1.1rem] sm:h-[1.4rem] bg-[#151824] border-brand-500/40">
              <span className="text-[9px] text-brand-400 font-bold">⌽</span>
            </KeyCap>
          </div>

          {/* Row 2: Numbers */}
          <div className="flex w-full gap-1 items-center">
            {['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map((k) => (
              <KeyCap key={k} isActive={isKeyActive(k)} onClick={() => handleTriggerKey(k)} className="flex-1">
                <span>{k}</span>
              </KeyCap>
            ))}
            <KeyCap isActive={isKeyActive('backspace') || isKeyActive('delete')} onClick={() => handleTriggerKey('Backspace')} className="flex-[1.6]">
              <span className="text-[8px] sm:text-[9.5px]">delete</span>
            </KeyCap>
          </div>

          {/* Row 3: QWERTY */}
          <div className="flex w-full gap-1 items-center">
            <KeyCap isActive={isKeyActive('tab')} onClick={() => handleTriggerKey('Tab')} className="flex-[1.5]">
              <span className="text-[8px] sm:text-[9.5px]">tab</span>
            </KeyCap>
            {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'].map((k) => (
              <KeyCap key={k} isActive={isKeyActive(k)} onClick={() => handleTriggerKey(k.toUpperCase())} className="flex-1">
                <span>{k.toUpperCase()}</span>
              </KeyCap>
            ))}
            <KeyCap isActive={isKeyActive('\\')} onClick={() => handleTriggerKey('\\')} className="flex-[1.1]">
              <span>\</span>
            </KeyCap>
          </div>

          {/* Row 4: ASDF */}
          <div className="flex w-full gap-1 items-center">
            <KeyCap isActive={isKeyActive('capslock') || capsLockActive} onClick={() => handleTriggerKey('CapsLock')} className="flex-[1.75] relative">
              <span className={cn('w-1 h-1 rounded-full absolute top-1.5 left-2 transition-opacity', capsLockActive ? 'bg-emerald-400 opacity-100 shadow-[0_0_6px_#10b981]' : 'bg-slate-700 opacity-40')} />
              <span className="text-[8px] sm:text-[9.5px]">caps lock</span>
            </KeyCap>
            {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"].map((k) => (
              <KeyCap key={k} isActive={isKeyActive(k)} onClick={() => handleTriggerKey(k.toUpperCase())} className="flex-1">
                <span>{k.toUpperCase()}</span>
              </KeyCap>
            ))}
            <KeyCap isActive={isKeyActive('enter')} onClick={() => handleTriggerKey('Enter')} className="flex-[1.85] bg-[#161a26] border-[#2d3448]">
              <span className="text-[8px] sm:text-[9.5px] mr-1 hidden sm:inline">return</span>
              <CornerDownLeft className="w-2.5 h-2.5 inline" />
            </KeyCap>
          </div>

          {/* Row 5: ZXCV */}
          <div className="flex w-full gap-1 items-center">
            <KeyCap isActive={isKeyActive('shift')} onClick={() => handleTriggerKey('Shift')} className="flex-[2.2]">
              <span className="text-[8px] sm:text-[9.5px]">shift</span>
            </KeyCap>
            {['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'].map((k) => (
              <KeyCap key={k} isActive={isKeyActive(k)} onClick={() => handleTriggerKey(k.toUpperCase())} className="flex-1">
                <span>{k.toUpperCase()}</span>
              </KeyCap>
            ))}
            <KeyCap isActive={isKeyActive('shift')} onClick={() => handleTriggerKey('Shift')} className="flex-[2.2]">
              <span className="text-[8px] sm:text-[9.5px]">shift</span>
            </KeyCap>
          </div>

          {/* Row 6: Modifiers & Spacebar */}
          <div className="flex w-full gap-1 items-center">
            <KeyCap isActive={isKeyActive('fn')} onClick={() => handleTriggerKey('fn')} className="flex-[0.9]"><span className="text-[8px]">fn</span></KeyCap>
            <KeyCap isActive={isKeyActive('control')} onClick={() => handleTriggerKey('control')} className="flex-[0.9]"><span className="text-[8px]">control</span></KeyCap>
            <KeyCap isActive={isKeyActive('alt') || isKeyActive('option')} onClick={() => handleTriggerKey('option')} className="flex-[0.9]"><Option className="w-3 h-3" /></KeyCap>
            <KeyCap isActive={isKeyActive('meta') || isKeyActive('command')} onClick={() => handleTriggerKey('command')} className="flex-[1.25]"><Command className="w-3 h-3" /></KeyCap>
            <KeyCap isActive={isKeyActive(' ')} onClick={() => handleTriggerKey(' ')} className="flex-[5.4] bg-[#141722] hover:bg-[#1c202e]" />
            <KeyCap isActive={isKeyActive('meta') || isKeyActive('command')} onClick={() => handleTriggerKey('command')} className="flex-[1.25]"><Command className="w-3 h-3" /></KeyCap>
            <KeyCap isActive={isKeyActive('alt') || isKeyActive('option')} onClick={() => handleTriggerKey('option')} className="flex-[0.9]"><Option className="w-3 h-3" /></KeyCap>

            {/* Inverted-T Arrows */}
            <div className="flex-[1.7] flex gap-0.5 items-end h-[1.6rem] sm:h-[2.1rem]">
              <KeyCap isActive={isKeyActive('arrowleft')} onClick={() => handleTriggerKey('ArrowLeft')} className="flex-1 h-full"><ArrowLeft className="w-2.5 h-2.5" /></KeyCap>
              <div className="flex-1 flex flex-col gap-0.5 h-full">
                <KeyCap isActive={isKeyActive('arrowup')} onClick={() => handleTriggerKey('ArrowUp')} className="w-full flex-1"><ArrowUp className="w-2 h-2" /></KeyCap>
                <KeyCap isActive={isKeyActive('arrowdown')} onClick={() => handleTriggerKey('ArrowDown')} className="w-full flex-1"><ArrowDown className="w-2 h-2" /></KeyCap>
              </div>
              <KeyCap isActive={isKeyActive('arrowright')} onClick={() => handleTriggerKey('ArrowRight')} className="flex-1 h-full"><ArrowRight className="w-2.5 h-2.5" /></KeyCap>
            </div>
          </div>

        </div>

        {/* Force Touch Trackpad */}
        <div className="w-48 sm:w-64 h-10 sm:h-14 mt-3 bg-gradient-to-b from-[#181a23] to-[#101219] rounded-xl border border-[#2b3142] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]" />
      </div>
    </div>
  );
};

export const KeyCap = ({
  children,
  className,
  isActive = false,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-[1.6rem] sm:h-[2.1rem] bg-[#12141c] hover:bg-[#1a1e2a] text-slate-300 font-mono text-[8px] sm:text-[10px] rounded-[4px] border border-[#232734] shadow-[0_1.5px_1px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col items-center justify-center transition-all select-none cursor-pointer active:scale-95 active:translate-y-[1px]',
        isActive && 'bg-[#2b334a] text-white border-brand-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_0_8px_rgba(99,102,241,0.4)] scale-95 translate-y-[1px]',
        className
      )}
    >
      {children}
    </button>
  );
};
