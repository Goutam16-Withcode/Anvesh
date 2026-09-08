'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export interface LoadingState {
  text: string;
}

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={cn('w-5 h-5 text-emerald-500', className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('w-5 h-5 text-emerald-500', className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.74-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 800,
  loop = false,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1),
      );
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl"
        >
          <div className="h-96 relative flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping" />
              <span className="font-extrabold text-sm tracking-wider uppercase text-brand-400 font-mono">
                ANVESH Pipeline Initializing
              </span>
            </div>

            <div className="max-w-xl mx-auto flex flex-col justify-start space-y-4">
              {loadingStates.map((loadingState, index) => {
                const distance = Math.abs(index - currentState);
                const opacity = Math.max(1 - distance * 0.25, 0.15);

                return (
                  <motion.div
                    key={index}
                    className={cn('text-left flex items-center gap-3 py-1')}
                    initial={{ opacity: 0, y: -(index * 15) }}
                    animate={{ opacity: opacity, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div>
                      {index > currentState && (
                        <div className="w-5 h-5 rounded-full border border-slate-600 bg-slate-800" />
                      )}
                      {index <= currentState && (
                        <CheckFilled
                          className={cn(
                            'text-white',
                            currentState === index && 'text-brand-400 animate-pulse',
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-sm font-semibold tracking-tight transition-colors',
                        currentState === index
                          ? 'text-white font-bold text-base'
                          : index < currentState
                          ? 'text-emerald-400'
                          : 'text-slate-500',
                      )}
                    >
                      {loadingState.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
