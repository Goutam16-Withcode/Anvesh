'use client';

import React from 'react';
import { Sparkles, Layers, Activity, Clock } from 'lucide-react';
import { Job } from '@/lib/api';

interface MatchBreakdownBadgeProps {
  breakdown: Job['breakdown'];
  matchScore: number;
}

export function MatchBreakdownBadge({ breakdown, matchScore }: MatchBreakdownBadgeProps) {
  const percent = Math.round(matchScore * 100);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
        <Sparkles className="w-3 h-3 text-brand-600 shrink-0" />
        <span>LTR: {(matchScore * 100).toFixed(1)}%</span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
        <Layers className="w-3 h-3 text-indigo-600 shrink-0" />
        <span>Cosine θ: {breakdown.semantic_similarity.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
        <Activity className="w-3 h-3 text-emerald-600 shrink-0" />
        <span>Req Match: {Math.round(breakdown.required_skill_match * 100)}%</span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
        <Clock className="w-3 h-3 text-amber-600 shrink-0" />
        <span>Freshness: {breakdown.freshness_days}d ago</span>
      </div>
    </div>
  );
}
