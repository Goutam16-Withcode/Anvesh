'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CareerNode } from '@/lib/api';
import { formatSalary } from '@/lib/utils';

interface PathNodeProps {
  node: CareerNode;
  isSelected: boolean;
  onSelect: (node: CareerNode) => void;
  index: number;
}

export function PathNode({ node, isSelected, onSelect, index }: PathNodeProps) {
  const getTierBadge = () => {
    switch (node.roleTier) {
      case 'CURRENT':
        return <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px]">CURRENT ROLE</Badge>;
      case 'BRIDGE':
        return <Badge className="bg-brand-600 hover:bg-brand-700 text-white font-mono text-[10px]">BRIDGE STEP</Badge>;
      case 'TARGET':
        return <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[10px]">TARGET DESTINATION</Badge>;
      case 'ASPIRATIONAL':
        return <Badge variant="secondary" className="font-mono text-[10px]">ASPIRATIONAL TIER</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (node.status) {
      case 'COMPLETED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'IN_PROGRESS':
        return <Zap className="w-4 h-4 text-brand-600 animate-pulse" />;
      case 'UNLOCKED':
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
      case 'LOCKED':
        return <Lock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -3 }}
      onClick={() => onSelect(node)}
      className={`relative rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-white border-brand-500 shadow-xl shadow-brand-500/10 ring-2 ring-brand-500/20'
          : node.status === 'COMPLETED'
          ? 'bg-emerald-50/30 border-emerald-200/80 hover:border-emerald-300'
          : node.status === 'IN_PROGRESS'
          ? 'bg-white border-brand-200 hover:border-brand-400 hover:shadow-subtle'
          : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:shadow-subtle'
      }`}
    >
      {/* Node Index Pill */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${
              node.status === 'COMPLETED'
                ? 'bg-emerald-100 text-emerald-800'
                : node.status === 'IN_PROGRESS'
                ? 'bg-brand-100 text-brand-800'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            0{index + 1}
          </div>
          {getTierBadge()}
        </div>

        <div className="flex items-center gap-1.5">{getStatusIcon()}</div>
      </div>

      {/* Role Title & Experience */}
      <h4 className="font-bold text-slate-900 text-base leading-tight">{node.title}</h4>
      <p className="text-xs text-slate-500 mt-0.5">{node.experienceYearsReq} • {node.timeEstimateMonths}</p>

      {/* Compensation & Readiness Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100/90 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Salary Band</span>
          <div className="text-xs font-bold font-mono text-slate-900">{node.salaryBand}</div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Readiness</span>
          <div className="text-xs font-bold font-mono text-brand-600">{node.readinessScore}%</div>
        </div>
      </div>

      {/* Readiness Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            node.readinessScore >= 80
              ? 'bg-emerald-500'
              : node.readinessScore >= 50
              ? 'bg-brand-500'
              : 'bg-amber-400'
          }`}
          style={{ width: `${node.readinessScore}%` }}
        />
      </div>

      {/* Required Skills Badges */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {node.requiredSkills.slice(0, 3).map((sk) => (
          <span
            key={sk}
            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px]"
          >
            {sk}
          </span>
        ))}
        {node.requiredSkills.length > 3 && (
          <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
            +{node.requiredSkills.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
}
