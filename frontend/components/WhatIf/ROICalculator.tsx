'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Briefcase, DollarSign, Sparkles } from 'lucide-react';
import { WhatIfResult } from '@/lib/api';
import { formatNumber, formatSalary } from '@/lib/utils';

interface ROICalculatorProps {
  simulation: WhatIfResult['simulation'];
}

export function ROICalculator({ simulation }: ROICalculatorProps) {
  const cards = [
    {
      title: 'Opportunity Multiplier',
      value: `+${simulation.percentage_increase}%`,
      sub: `${formatNumber(simulation.current_opportunity_count)} → ${formatNumber(simulation.simulated_opportunity_count)} matched roles`,
      delta: `+${formatNumber(simulation.delta_opportunities)} New Roles`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200/80',
    },
    {
      title: 'Median Salary Projection',
      value: formatSalary(simulation.simulated_median_salary),
      sub: `Baseline: ${formatSalary(simulation.current_median_salary)}/yr`,
      delta: `+${formatSalary(simulation.salary_delta)}/yr Uplift`,
      icon: DollarSign,
      color: 'text-brand-600',
      bg: 'bg-brand-50/70',
      border: 'border-brand-200/80',
    },
    {
      title: 'Market Percentile',
      value: `Top ${(100 - simulation.market_percentile).toFixed(0)}%`,
      sub: `${simulation.market_percentile}th percentile of AI engineers`,
      delta: '+22 Percentile Rank',
      icon: Award,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50/70',
      border: 'border-indigo-200/80',
    },
    {
      title: 'Newly Unlocked Roles',
      value: `${simulation.newly_unlocked_roles.length} Tiers`,
      sub: 'Qualifies for Senior & Staff positions',
      delta: `${simulation.top_unlocked_jobs.length} Priority Matches`,
      icon: Briefcase,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50/70',
      border: 'border-cyan-200/80',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-5 rounded-3xl bg-white border ${card.border} shadow-subtle flex flex-col justify-between space-y-3 relative overflow-hidden`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-xl ${card.bg} ${card.color} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className={`text-2xl font-extrabold font-mono ${card.color} tracking-tight`}>
                {card.value}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{card.sub}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800">
              <Sparkles className={`w-3.5 h-3.5 ${card.color}`} />
              <span>{card.delta}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
