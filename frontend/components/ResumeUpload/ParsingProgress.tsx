'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Sparkles, Terminal, Cpu, Database } from 'lucide-react';

interface ParsingProgressProps {
  currentStage: number; // 0, 1, 2, 3
}

export function ParsingProgress({ currentStage }: ParsingProgressProps) {
  const stages = [
    { title: 'AST Lexer Parsing', description: 'Deconstructing PDF raw tokens without hallucinations', icon: Terminal },
    { title: 'Canonical Skill Normalization', description: 'Mapping acronyms to canonical taxonomy graph', icon: Cpu },
    { title: 'Quantified Impact Extraction', description: 'Validating metrics, years, and senior role tiers', icon: Sparkles },
    { title: '384-d Vector Index Injection', description: 'Generating dense HNSW candidate vector profile', icon: Database },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-600" />
          Multi-Stage Resume Parsing Pipeline
        </span>
        <span className="text-xs font-mono font-bold text-brand-600">
          Stage {currentStage + 1} of 4 ({Math.min(100, Math.round(((currentStage + 1) / 4) * 100))}%)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {stages.map((stg, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const Icon = stg.icon;

          return (
            <motion.div
              key={stg.title}
              initial={{ opacity: 0.8 }}
              animate={{
                opacity: 1,
                borderColor: isCurrent ? '#6366f1' : isDone ? '#10b981' : '#e2e8f0',
              }}
              className={`p-3 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-brand-50/60 border-brand-500 shadow-sm ring-1 ring-brand-500/20'
                  : isDone
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : 'bg-slate-50/60 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-brand-600 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <Icon className={`w-3.5 h-3.5 ${isDone ? 'text-emerald-600' : isCurrent ? 'text-brand-600' : 'text-slate-400'}`} />
              </div>
              <h5 className="text-xs font-bold text-slate-900 leading-tight">{stg.title}</h5>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{stg.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
