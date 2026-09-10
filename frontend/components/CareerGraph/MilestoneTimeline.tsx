'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Clock,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Briefcase,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CareerNode, CareerMilestone } from '@/lib/api';
import { formatNumber, formatSalary } from '@/lib/utils';
import Link from 'next/link';

interface MilestoneTimelineProps {
  selectedNode: CareerNode;
  onToggleMilestone?: (milestoneId: string) => void;
}

export function MilestoneTimeline({ selectedNode, onToggleMilestone }: MilestoneTimelineProps) {
  const [milestones, setMilestones] = useState<CareerMilestone[]>(selectedNode.milestones);

  const handleToggle = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
    onToggleMilestone?.(id);
  };

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/60">
              Role Milestone Inspector
            </span>
            <span className="text-xs font-mono text-slate-400">ID: {selectedNode.id}</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">{selectedNode.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedNode.experienceYearsReq} Required Experience • Estimated Timeline: {selectedNode.timeEstimateMonths}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/jobs">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5 text-brand-600" />
              View {formatNumber(selectedNode.unlockedRoleCount)} Live Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Target Salary</span>
          <div className="text-sm font-bold font-mono text-slate-900 mt-0.5">{selectedNode.salaryBand}</div>
        </div>

        <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Role Readiness</span>
          <div className="text-sm font-bold font-mono text-brand-600 mt-0.5">{selectedNode.readinessScore}%</div>
        </div>

        <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Difficulty Tier</span>
          <div className="text-sm font-bold font-mono text-indigo-600 mt-0.5">{selectedNode.difficulty}</div>
        </div>

        <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Milestone Progress</span>
          <div className="text-sm font-bold font-mono text-emerald-600 mt-0.5">{completedCount} / {milestones.length} Done</div>
        </div>
      </div>

      {/* Core Competencies Checklist */}
      <div>
        <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-600 mb-2.5">
          Required Core Competencies
        </h4>
        <div className="flex flex-wrap gap-2">
          {selectedNode.coreCompetencies.map((comp) => (
            <div
              key={comp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50/60 border border-indigo-200/80 text-indigo-900 text-xs font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>{comp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Milestones List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Verification Milestones to Unlock Next Node
          </h4>
          <span className="text-xs font-mono font-semibold text-slate-400">{progressPercent}% Completed</span>
        </div>

        <div className="space-y-2.5">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.id}
              onClick={() => handleToggle(milestone.id)}
              whileHover={{ scale: 1.005 }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
                milestone.completed
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : 'bg-white border-slate-200/90 hover:border-brand-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {milestone.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-bold ${milestone.completed ? 'text-slate-800 line-through opacity-80' : 'text-slate-900'}`}>
                    {milestone.title}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {milestone.skillTag}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
