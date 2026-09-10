'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  TrendingUp,
  BookOpen,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Award,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MissingSkillItem, LearningResource } from '@/lib/api';
import { formatNumber, formatSalary } from '@/lib/utils';

interface SkillGapMatrixProps {
  missingSkills: MissingSkillItem[];
  onStartSkillRoadmap?: (skill: string) => void;
}

export function SkillGapMatrix({ missingSkills, onStartSkillRoadmap }: SkillGapMatrixProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(missingSkills[0]?.skill || null);

  const toggleExpand = (skill: string) => {
    setExpandedSkill((prev) => (prev === skill ? null : skill));
  };

  const getPriorityBadge = (priority: 'CRITICAL' | 'HIGH' | 'RECOMMENDED') => {
    switch (priority) {
      case 'CRITICAL':
        return <Badge variant="destructive" className="font-mono text-[10px] uppercase">Critical Blocker</Badge>;
      case 'HIGH':
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-mono text-[10px] uppercase">High Impact</Badge>;
      case 'RECOMMENDED':
        return <Badge variant="secondary" className="font-mono text-[10px] uppercase">Recommended</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Prioritized Missing Skills Matrix</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by mathematical impact on target role match score and market compensation uplift.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {missingSkills.map((item) => {
          const isExpanded = expandedSkill === item.skill;
          const gapDelta = item.requiredProficiency - item.candidateProficiency;

          return (
            <motion.div
              key={item.skill}
              layout
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'border-brand-300 bg-white shadow-md ring-1 ring-brand-500/10'
                  : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-2xs'
              }`}
            >
              {/* Header / Summary Row */}
              <div
                onClick={() => toggleExpand(item.skill)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                      item.priority === 'CRITICAL'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : item.priority === 'HIGH'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-50 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {item.skill.substring(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-sm">{item.skill}</h4>
                      {getPriorityBadge(item.priority)}
                      <span className="text-[11px] text-slate-400 font-mono">({item.category})</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">{item.targetOutcome}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-center shrink-0">
                  {/* Proficiency Gauge */}
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-slate-800">
                      {item.candidateProficiency}% <span className="text-slate-400 font-normal">→ {item.requiredProficiency}%</span>
                    </div>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1 relative">
                      <div
                        className="h-full bg-brand-600 rounded-full"
                        style={{ width: `${item.candidateProficiency}%` }}
                      />
                    </div>
                  </div>

                  {/* Salary Lift */}
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-mono font-bold text-emerald-600">
                      +{formatSalary(item.salaryLiftContributionUsd)}
                    </div>
                    <span className="text-[10px] text-slate-400">Market Lift</span>
                  </div>

                  {/* Est Time */}
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.estWeeksToAcquire}w</span>
                  </div>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expandable Curated Resources & Learning Roadmap */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Bridge Duration</div>
                        <div className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-brand-600" />
                          {item.estWeeksToAcquire} Weeks ({item.estWeeksToAcquire * 6} Hours)
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Compensation Uplift</div>
                        <div className="text-sm font-bold text-emerald-600 mt-0.5 flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          +{formatSalary(item.salaryLiftContributionUsd)} / yr
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Market Relevance</div>
                        <div className="text-sm font-bold text-indigo-600 mt-0.5 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-indigo-600" />
                          {item.marketRelevanceScore}/100 Top-Tier Index
                        </div>
                      </div>
                    </div>

                    {/* Curated Resources */}
                    <div>
                      <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                        Curated Learning & Benchmark Materials ({item.curatedResources?.length || 0})
                      </h5>

                      <div className="space-y-2">
                        {item.curatedResources?.map((res) => (
                          <div
                            key={res.id}
                            className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 hover:border-brand-300 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Badge variant="outline" className="font-mono text-[10px] uppercase">
                                {res.type}
                              </Badge>
                              <div>
                                <h6 className="text-xs font-bold text-slate-900 leading-tight">{res.title}</h6>
                                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                  <span>{res.provider}</span>
                                  <span>•</span>
                                  <span>{res.duration}</span>
                                  <span>•</span>
                                  <span className="text-amber-600 font-semibold">★ {res.rating}</span>
                                  {res.isFree && (
                                    <>
                                      <span>•</span>
                                      <span className="text-emerald-600 font-semibold">Free</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0 px-2.5 py-1 rounded-lg hover:bg-brand-50 transition-colors"
                            >
                              <span>Open</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-end pt-2">
                      <Button
                        size="sm"
                        onClick={() => onStartSkillRoadmap?.(item.skill)}
                        className="text-xs font-bold gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Add {item.skill} to Learning Roadmap
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
