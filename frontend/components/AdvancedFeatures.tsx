'use client';

import React, { useState } from 'react';
import { Sparkles, TrendingUp, Bot, Compass, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FollowerPointerCard } from './ui/following-pointer';
import { useAuth } from '@/lib/auth-context';

export function AdvancedFeatures() {
  const { openAuthModal } = useAuth();
  const [selectedFeature, setSelectedFeature] = useState<'what-if' | 'agent' | 'pathway'>('what-if');

  return (
    <section id="advanced" className="py-20 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="emerald" className="font-bold">
            Advanced Intelligence
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Counterfactual Simulation & Autonomous Agents
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Move beyond static matching. Model your future career moves with mathematical confidence.
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 gap-2">
            <button
              onClick={() => setSelectedFeature('what-if')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                selectedFeature === 'what-if'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>What-If Simulation Engine</span>
            </button>
            <button
              onClick={() => setSelectedFeature('agent')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                selectedFeature === 'agent'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-4 h-4 text-brand-600" />
              <span>AI Career Agent (Tool-Calling)</span>
            </button>
            <button
              onClick={() => setSelectedFeature('pathway')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                selectedFeature === 'pathway'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Graph Role Pathways</span>
            </button>
          </div>
        </div>

        {/* Split View Content with Following Pointer */}
        {selectedFeature === 'what-if' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero-Hallucination Re-Indexing</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Simulate Your Next Skill Acquisition Before Spending Months Learning
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Ever wondered if learning <em>Kubernetes</em>, <em>CUDA kernels</em>, or <em>Go</em> will genuinely unlock higher-paying roles? The What-If Engine simulates adding prospective skills to your vector embedding and re-evaluates the live catalog in real time.
              </p>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>&Delta; Opportunities:</strong> Computes the exact net increase in matching openings (&Delta;N).</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>&Delta; Salary Lift:</strong> Projects median compensation growth across matching positions.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>Role Unlocks:</strong> Identifies emerging roles where match affinity leaps past 85%.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <FollowerPointerCard title="What-If Impact Simulator">
                <div
                  onClick={() => openAuthModal('signup')}
                  className="p-6 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 space-y-5 cursor-pointer hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">SIMULATION TARGET</span>
                      <h4 className="text-base font-bold text-white">+ Kubernetes & Go</h4>
                    </div>
                    <Badge variant="emerald" className="font-bold bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      Live Calculation
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-xs text-slate-400 block">Opportunity Increase</span>
                      <span className="text-2xl font-bold text-emerald-400 font-mono">+52.8%</span>
                      <span className="text-[11px] text-slate-400 block mt-1">+96 new qualified roles</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-xs text-slate-400 block">Median Salary Lift</span>
                      <span className="text-2xl font-bold text-indigo-400 font-mono">+$28,000</span>
                      <span className="text-[11px] text-slate-400 block mt-1">New median: $168,000/yr</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Unlocked High-Affinity Roles
                    </span>
                    <div className="flex justify-between items-center text-xs text-slate-300">
                      <span>MLOps Infrastructure Architect</span>
                      <span className="font-mono text-emerald-400 font-bold">94% Match (was 61%)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-300">
                      <span>Cloud AI Platform Engineer</span>
                      <span className="font-mono text-emerald-400 font-bold">91% Match (was 58%)</span>
                    </div>
                  </div>
                </div>
              </FollowerPointerCard>
            </div>
          </div>
        )}

        {selectedFeature === 'agent' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
                <Bot className="w-3.5 h-3.5 text-brand-600" />
                <span>Deterministic Microservice Execution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                An Autonomous Career Agent That Executes Real Tools
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Rather than hallucinating career advice, the ANVESH Agent utilizes strict tool-calling schemas to query your verified profile, compute skill graphs, execute vector searches, and trigger What-If simulations.
              </p>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                  <span><strong>Tool: discover_roles()</strong> Traversing ontological skill graphs.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                  <span><strong>Tool: calculate_skill_gap()</strong> Pinpointing exact gap proficiencies.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                  <span><strong>Tool: simulate_skill()</strong> Running live counterfactual impact math.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <FollowerPointerCard title="AI Agent Tool Orchestrator">
                <div
                  onClick={() => openAuthModal('signup')}
                  className="p-6 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 space-y-4 cursor-pointer hover:border-brand-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">ANVESH Career Agent</span>
                      <span className="text-[10px] text-slate-400">Tool Execution Engine Live</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-800 text-slate-200">
                      <span className="text-[10px] text-slate-400 block font-mono mb-1">CANDIDATE</span>
                      &ldquo;Which high-paying roles can I target if I transition from Backend to AI Engineering?&rdquo;
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 font-mono text-[11px] text-brand-300">
                      &gt; EXECUTING TOOL: calculate_skill_gap(user_id, target=&quot;AI Engineer&quot;) &rarr; Gap: [CUDA, TensorRT]
                    </div>

                    <div className="p-3 rounded-xl bg-brand-950/60 border border-brand-800/60 text-slate-100">
                      <span className="text-[10px] text-brand-400 block font-bold mb-1">AGENT RESPONSE</span>
                      Based on your verified skills (Python, PyTorch, FastAPI), you match strongly with <strong>AI Engineer (94% match)</strong>. Adding <strong>Kubernetes</strong> will unlock 96 additional opportunities with a median salary of $168,000.
                    </div>
                  </div>
                </div>
              </FollowerPointerCard>
            </div>
          </div>
        )}

        {selectedFeature === 'pathway' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ontology Traversal</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Graph-Based Career Pathways & Adjacent Role Discovery
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Roles are not isolated silos. ANVESH maps transitions across adjacent software, AI, and MLOps roles to show you the shortest mathematical path to your dream compensation and job title.
              </p>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span><strong>Adjacent Nodes:</strong> Discovers non-obvious sibling careers with &gt;70% skill overlap.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span><strong>Shortest Path to Mastery:</strong> Focus only on high-leverage missing skills.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <FollowerPointerCard title="Graph Pathway Traversal">
                <div
                  onClick={() => openAuthModal('signup')}
                  className="p-6 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 space-y-4 cursor-pointer hover:border-indigo-500/50 transition-colors"
                >
                  <h4 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3">
                    Active Transition Graph: Backend &rarr; AI Infrastructure
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">Current: Sr. Backend Engineer</span>
                        <span className="text-[11px] text-slate-400">Python, FastAPI, Docker, SQL</span>
                      </div>
                      <Badge variant="slate" className="bg-slate-700 text-slate-300 border-slate-600">Base State</Badge>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-indigo-400 text-xs font-mono font-bold">&darr; Step 1: Add Vector DBs + PyTorch (+25% match)</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-700/60 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">Target: AI Platform Engineer</span>
                        <span className="text-[11px] text-indigo-200">Median $185,000 &bull; High Demand</span>
                      </div>
                      <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">94.2% Match</Badge>
                    </div>
                  </div>
                </div>
              </FollowerPointerCard>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
