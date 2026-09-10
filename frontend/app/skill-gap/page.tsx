'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Target,
  Sparkles,
  TrendingUp,
  Clock,
  Briefcase,
  Layers,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Award,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkillRadarChart, SkillGapMatrix, SkillPill } from '@/components/SkillGraph';
import { api, SkillGapProfile, MOCK_SKILL_GAP_PROFILES } from '@/lib/api';
import { formatNumber, formatSalary } from '@/lib/utils';

export default function SkillGapPage() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('ai-platform-eng');
  const [gapProfile, setGapProfile] = useState<SkillGapProfile>(
    MOCK_SKILL_GAP_PROFILES['ai-platform-eng']
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadRoleGap(selectedRoleId);
  }, [selectedRoleId]);

  const loadRoleGap = async (roleId: string) => {
    setLoading(true);
    try {
      const data = await api.getSkillGap(roleId);
      setGapProfile(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const benchmarkRoles = gapProfile.benchmarkRoles || [
    { id: 'ai-platform-eng', title: 'Senior AI Platform Engineer', category: 'AI Infrastructure', matchScore: 0.74 },
    { id: 'staff-mlops-eng', title: 'Staff MLOps & Platform Engineer', category: 'MLOps', matchScore: 0.68 },
    { id: 'distributed-inference-eng', title: 'Distributed Systems & Inference Engineer', category: 'Systems', matchScore: 0.71 },
  ];

  const totalMissingWeeks = gapProfile.missingSkills.reduce((acc, s) => acc + s.estWeeksToAcquire, 0);
  const totalSalaryBoost = gapProfile.missingSkills.reduce((acc, s) => acc + s.salaryLiftContributionUsd, 0);
  const matchPercent = Math.round(gapProfile.matchScore * 100);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10">
        {/* Header Hero Banner */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white via-brand-50/30 to-indigo-50/40 border border-slate-200/80 shadow-subtle overflow-hidden">
          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-mono font-semibold">
                <Target className="w-3.5 h-3.5" />
                Deterministic Skill Vector Distance Analyzer
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Skill Gap & Technical Readiness Analyzer
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Compare your verified resume skills against market requirements for frontier AI and engineering positions.
                Identify critical missing competencies, learning timelines, and projected salary lift.
              </p>
            </div>

            {/* Quick KPI Stat Widget */}
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-subtle shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Readiness Score</span>
                <div className="text-2xl font-mono font-extrabold text-brand-600">
                  {matchPercent}%
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold font-mono">
                  +{formatSalary(totalSalaryBoost)} / yr Gap Potential
                </span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200 font-bold text-sm">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Target Role Selector Ribbon */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-600" />
              Select Benchmark Target Role
            </label>
            <span className="text-xs font-mono text-slate-400">
              5 Enterprise Roles Calibrated
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {benchmarkRoles.map((role) => {
              const isSelected = selectedRoleId === role.id;
              const percent = Math.round((role.matchScore || 0.7) * 100);

              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-white border-brand-500 shadow-md ring-2 ring-brand-500/20'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {role.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5 leading-snug">
                      {role.title}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <Badge
                      variant={isSelected ? 'default' : 'outline'}
                      className="font-mono text-xs"
                    >
                      {percent}% Fit
                    </Badge>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Visual Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Radar Chart & Competencies (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/60">
                    Vector Dimension Alignment
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">Multi-Vector Skill Radar</h3>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  6 Dimensions
                </Badge>
              </div>

              {/* Dynamic Radar Chart */}
              <SkillRadarChart data={gapProfile.radarCompetencies} size={340} />

              {/* Verified Candidate Skills */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-slate-400 block mb-2">
                  Candidate Verified Strengths ({gapProfile.verifiedCandidateSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {gapProfile.verifiedCandidateSkills.map((sk) => (
                    <SkillPill key={sk} name={sk} verified={true} proficiency="ADVANCED" />
                  ))}
                </div>
              </div>
            </div>

            {/* Target Role Metadata Card */}
            <div className="p-6 bg-gradient-to-br from-brand-900 to-slate-900 text-white rounded-3xl shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand-300 uppercase tracking-wider">
                  Target Role Specification
                </span>
                <Badge className="bg-brand-500/30 text-brand-200 border-brand-400/40 text-[10px] font-mono">
                  {gapProfile.marketDemand} DEMAND
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">{gapProfile.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{gapProfile.companyTier} • {gapProfile.level}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Market Band</span>
                  <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{gapProfile.salaryRange}</div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Estimated Gap Time</span>
                  <div className="text-sm font-bold font-mono text-amber-300 mt-0.5">{totalMissingWeeks} Weeks to Bridge</div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/jobs">
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs gap-2">
                    <Briefcase className="w-4 h-4 text-brand-600" />
                    Browse Matching {gapProfile.title} Roles
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Missing Skills Prioritization Matrix & Action Plan (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <SkillGapMatrix
              missingSkills={gapProfile.missingSkills}
              onStartSkillRoadmap={(skill) => {
                window.location.href = `/what-if?add=${encodeURIComponent(skill)}`;
              }}
            />

            {/* Gap Closing Action Plan Timeline */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    Accelerated Skill Bridge Timeline
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Structured 4-step sequence to achieve 90%+ qualification for {gapProfile.title}.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200/60">
                  {totalMissingWeeks} Weeks Total
                </span>
              </div>

              <div className="space-y-3">
                {gapProfile.missingSkills.map((item, idx) => (
                  <div
                    key={item.skill}
                    className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3.5 hover:border-brand-300 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-xl bg-brand-600 text-white text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-900 text-sm">
                          Phase {idx + 1}: Master {item.skill} ({item.category})
                        </h4>
                        <span className="text-xs font-mono font-semibold text-emerald-600">
                          +{formatSalary(item.salaryLiftContributionUsd)} / yr Lift
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{item.targetOutcome}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-2">
                        <span>Duration: {item.estWeeksToAcquire} Weeks</span>
                        <span>•</span>
                        <span>Priority: {item.priority}</span>
                        <span>•</span>
                        <span>Relevance: {item.marketRelevanceScore}/100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulation Bridge Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Ready to test how these skills impact your salary trajectory and unlocked roles?
                </p>
                <Link href="/what-if">
                  <Button variant="noise" className="gap-2 text-xs font-bold shrink-0">
                    <TrendingUp className="w-4 h-4" />
                    Launch What-If Sandbox
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
