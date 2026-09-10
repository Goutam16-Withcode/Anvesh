'use client';

import React from 'react';
import { CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SkillPillProps {
  name: string;
  proficiency?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  verified?: boolean;
  years?: number;
  category?: string;
  className?: string;
  onClick?: () => void;
}

export function SkillPill({
  name,
  proficiency,
  verified = true,
  years,
  category,
  className = '',
  onClick,
}: SkillPillProps) {
  const getProficiencyColor = () => {
    switch (proficiency) {
      case 'EXPERT':
        return 'border-brand-300 bg-brand-50/80 text-brand-800';
      case 'ADVANCED':
        return 'border-indigo-200 bg-indigo-50/70 text-indigo-800';
      case 'INTERMEDIATE':
        return 'border-slate-200 bg-slate-50 text-slate-800';
      case 'BEGINNER':
        return 'border-amber-200 bg-amber-50/60 text-amber-800';
      default:
        return 'border-slate-200 bg-white text-slate-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs ${getProficiencyColor()} ${
        onClick ? 'cursor-pointer hover:shadow-subtle hover:scale-[1.02]' : ''
      } ${className}`}
    >
      {verified ? (
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      ) : (
        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      )}

      <span>{name}</span>

      {proficiency && (
        <span className="text-[10px] font-mono uppercase opacity-75 font-normal ml-0.5">
          • {proficiency.substring(0, 3)}
        </span>
      )}

      {years && (
        <span className="text-[10px] font-mono text-slate-400 font-normal">
          ({years}y)
        </span>
      )}
    </div>
  );
}
