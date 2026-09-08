'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Filter, CheckCircle2, ChevronRight, Activity, Plus, RefreshCw, Compass, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { api, Recommendation, WhatIfResult } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

export function ProductShowcase() {
  const { openAuthModal } = useAuth();
  const [workMode, setWorkMode] = useState<string>('ALL');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Kubernetes']);
  const [simulationResult, setSimulationResult] = useState<WhatIfResult | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const availableSkillsToTest = ['Kubernetes', 'Go', 'CUDA', 'MLflow', 'Rust', 'TensorRT', 'LangChain'];

  useEffect(() => {
    loadRecommendations();
    runSimulation(selectedSkills);
  }, []);

  const loadRecommendations = async (mode?: string) => {
    try {
      const data = await api.getRecommendations(mode === 'ALL' ? undefined : mode);
      setRecommendations(data.recommendations);
    } catch (e) {
      console.error(e);
    }
  };

  const handleModeChange = (mode: string) => {
    setWorkMode(mode);
    loadRecommendations(mode);
  };

  const toggleSkill = (skill: string) => {
    const next = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(next);
    runSimulation(next);
  };

  const runSimulation = async (skills: string[]) => {
    setIsSimulating(true);
    try {
      const result = await api.simulateWhatIf(skills);
      setSimulationResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <section id="showcase" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="emerald" className="font-bold">
            Interactive Product Sandbox
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Experience the ANVESH Engine Live
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Test real-time hybrid job recommendations and trigger counterfactual What-If simulations directly below.
          </p>
        </div>

        {/* Browser Showcase Wrapper */}
        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/50 p-3 sm:p-6 shadow-2xl space-y-6">
          
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Filter Work Mode:</span>
              {['ALL', 'REMOTE', 'HYBRID'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeChange(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    workMode === mode
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Qdrant HNSW Collection: 104,250 Vectors Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Real-Time Recommendations List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-brand-600" />
                  <span>Top Personalized Recommendations</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">Ranked via LightGBM LambdaMART</span>
              </div>

              {recommendations.length > 0 ? (
                recommendations.slice(0, 2).map((job) => (
                  <div
                    key={job.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 shadow-subtle hover:shadow-card transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                          {job.company.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                              {job.title}
                            </h4>
                            <Badge variant="emerald" className="font-bold text-[11px]">
                              {(job.match_score * 100).toFixed(1)}% Match
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500">
                            {job.company.name} &bull; {job.company.location} &bull; ${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()} {job.currency}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">#{job.rank}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] text-center">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Cosine Similarity</span>
                        <span className="font-bold text-slate-800 font-mono">
                          {job.breakdown.semantic_similarity}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Required Match</span>
                        <span className="font-bold text-emerald-600 font-mono">
                          {(job.breakdown.required_skill_match * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Freshness</span>
                        <span className="font-bold text-slate-800 font-mono">
                          {job.breakdown.freshness_days}d ago
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {job.matched_skills.slice(0, 3).map((s) => (
                          <Badge key={s} variant="brand" className="text-[10px]">
                            {s}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => openAuthModal('signup')}>
                        <span>Apply / Details</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm bg-white rounded-2xl border border-slate-200">
                  Loading recommendations...
                </div>
              )}
            </div>

            {/* Right Column: Interactive What-If Simulation Playground */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Live What-If Simulator</span>
                </h3>
                {isSimulating && (
                  <span className="text-xs text-brand-600 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Simulating...
                  </span>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Click hypothetical skills to simulate career impact:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableSkillsToTest.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-500/20'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {simulationResult && (
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                        <span className="text-[11px] text-emerald-800 block font-medium">Opportunity Gain</span>
                        <span className="text-xl font-bold text-emerald-700 font-mono">
                          +{simulationResult.simulation.percentage_increase}%
                        </span>
                        <span className="text-[10px] text-emerald-600 block mt-0.5">
                          +{simulationResult.simulation.delta_opportunities} new roles
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100">
                        <span className="text-[11px] text-indigo-800 block font-medium">Projected Salary Lift</span>
                        <span className="text-xl font-bold text-indigo-700 font-mono">
                          +${simulationResult.simulation.salary_delta.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-indigo-600 block mt-0.5">
                          New Median: ${simulationResult.simulation.simulated_median_salary.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        Newly Unlocked Category
                      </span>
                      {simulationResult.simulation.newly_unlocked_roles.map((r, i) => (
                        <div key={i} className="flex justify-between items-center text-xs text-slate-700">
                          <span className="font-medium">{r.title}</span>
                          <span className="font-mono font-bold text-emerald-600">
                            {(r.match_score * 100).toFixed(0)}% Match
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="noise"
                      className="w-full justify-center font-bold text-xs gap-2 shadow-md shadow-brand-500/20"
                      onClick={() => openAuthModal('signup')}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Unlock Personalized What-If Report</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
