'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Award, Sparkles } from 'lucide-react';
import { TrajectoryPoint } from '@/lib/api';
import { formatSalary, formatNumber } from '@/lib/utils';

interface TrajectoryChartProps {
  trajectory: TrajectoryPoint[];
}

export function TrajectoryChart({ trajectory }: TrajectoryChartProps) {
  if (!trajectory || trajectory.length === 0) return null;

  const maxSalary = Math.max(...trajectory.map((t) => t.simulated), 250000);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            6-Month Projected Salary & Opportunity Trajectory
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Mathematical projection based on empirical market compensation bands and verified role demand.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span>Baseline</span>
          </div>
          <div className="flex items-center gap-1.5 text-brand-600 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />
            <span>Simulated Growth</span>
          </div>
        </div>
      </div>

      {/* Trajectory Stepped Progress Bars */}
      <div className="space-y-4">
        {trajectory.map((point, idx) => {
          const simRatio = (point.simulated / maxSalary) * 100;
          const baseRatio = (point.baseline / maxSalary) * 100;

          return (
            <div key={point.period} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  {point.period}
                </span>

                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400 text-[11px]">
                    Base: {formatSalary(point.baseline)}
                  </span>
                  <span className="text-emerald-600 font-bold">
                    Simulated: {formatSalary(point.simulated)}
                  </span>
                  <span className="text-[11px] text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                    {formatNumber(point.unlockedOpportunities)} Jobs
                  </span>
                </div>
              </div>

              {/* Stacked Progress Bar */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
                {/* Baseline Bar */}
                <div
                  className="absolute top-0 left-0 h-full bg-slate-300 rounded-full"
                  style={{ width: `${baseRatio}%` }}
                />
                {/* Simulated Uplift Bar */}
                <motion.div
                  initial={{ width: `${baseRatio}%` }}
                  animate={{ width: `${simRatio}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
