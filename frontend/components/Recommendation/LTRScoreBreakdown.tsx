'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Activity, Clock, ShieldCheck, Cpu } from 'lucide-react';
import { Job } from '@/lib/api';

interface LTRScoreBreakdownProps {
  job: Job;
  className?: string;
}

export function LTRScoreBreakdown({ job, className = '' }: LTRScoreBreakdownProps) {
  const { breakdown, match_score } = job;

  const factors = [
    {
      name: 'Dense Vector Cosine Similarity (θ)',
      weight: '40% weight',
      value: breakdown.semantic_similarity.toFixed(3),
      percent: Math.round(breakdown.semantic_similarity * 100),
      desc: '384-dimensional HNSW embedding match between resume AST and job requirements.',
      color: 'bg-brand-500',
    },
    {
      name: 'Required Skill Graph Match Ratio',
      weight: '30% weight',
      value: breakdown.required_skill_match.toFixed(3),
      percent: Math.round(breakdown.required_skill_match * 100),
      desc: 'Deterministic canonical ontology overlap of verified hard technical skills.',
      color: 'bg-emerald-500',
    },
    {
      name: 'Preferred Skill & Depth Factor',
      weight: '15% weight',
      value: breakdown.preferred_skill_match.toFixed(3),
      percent: Math.round(breakdown.preferred_skill_match * 100),
      desc: 'Bonus alignment for secondary domain tooling and frameworks.',
      color: 'bg-indigo-500',
    },
    {
      name: 'Posting Freshness Time-Decay Score (γ)',
      weight: '15% weight',
      value: (breakdown.decay_score || 0.9).toFixed(3),
      percent: Math.round((breakdown.decay_score || 0.9) * 100),
      desc: `Posted ${breakdown.freshness_days} days ago. Decay penalty keeps recent opportunities on top.`,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className={`p-5 rounded-3xl bg-slate-900 text-white space-y-5 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-400">
            Multi-Stage Ranking Engine
          </span>
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
            <Cpu className="w-4 h-4 text-brand-400" />
            LambdaMART Ranker Mathematical Breakdown
          </h4>
        </div>

        <div className="text-right">
          <div className="text-lg font-mono font-extrabold text-emerald-400">
            {(match_score * 100).toFixed(1)}%
          </div>
          <span className="text-[10px] font-mono text-slate-400">Composite Score</span>
        </div>
      </div>

      <div className="space-y-3.5">
        {factors.map((f) => (
          <div key={f.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-200 font-semibold">{f.name}</span>
              <span className="text-slate-400">{f.weight} • <strong className="text-slate-200">{f.value}</strong></span>
            </div>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${f.color} rounded-full`} style={{ width: `${f.percent}%` }} />
            </div>

            <p className="text-[10px] text-slate-400 leading-snug">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
