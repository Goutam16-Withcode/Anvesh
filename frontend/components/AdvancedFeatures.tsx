'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Compass, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Plus, 
  Check, 
  Terminal, 
  ShieldCheck, 
  GitBranch,
  Layers,
  Database,
  ChevronRight,
  Code2,
  Cpu,
  Workflow,
  Sliders,
  Play,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '@/lib/auth-context';

// Engineering-grade Developer Agent Execution Core Icon
function AgentIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <polyline points="7 9 11 12 7 15" />
      <line x1="13" y1="15" x2="17" y2="15" />
    </svg>
  );
}

export function AdvancedFeatures() {
  const { openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'what-if' | 'agent' | 'pathway'>('what-if');

  // Interactive What-If Simulator Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Kubernetes', 'CUDA Kernels']);
  
  // Interactive Agent Queries
  const [agentQuery, setAgentQuery] = useState<number>(0);

  const agentQueries = [
    {
      prompt: 'Which high-paying roles can I target if I transition from Backend to AI Systems?',
      toolName: 'calculate_skill_gap',
      toolParams: '{ candidate_id: "usr_9984", target: "AI Infrastructure Engineer" }',
      toolOutput: 'Missing: [CUDA, TensorRT-LLM] • Overlap: 82.4%',
      response: 'Based on your verified skills (Python, FastAPI, Distributed Systems), you match 82.4% with AI Infrastructure Engineer. Simulating CUDA & TensorRT unlocks +94 verified positions with a median compensation of $195,000/yr.',
      steps: ['parse_candidate_profile()', 'calculate_skill_gap()', 'rank_live_opportunities()'],
    },
    {
      prompt: 'What is the fastest mathematical pathway to a $220k+ ML Platform role?',
      toolName: 'traverse_career_graph',
      toolParams: '{ source: "Backend", target: "ML Platform", min_salary: 220000 }',
      toolOutput: 'Shortest Path: [Vector DBs -> Triton Inference -> Ray Cluster]',
      response: 'The shortest mathematical path requires acquiring Ray and Qdrant vector indexing. This bridges 91% of the distance to Principal Distributed Platform roles with an estimated +$45,000 annual salary lift.',
      steps: ['extract_ontology_subgraph()', 'traverse_career_graph()', 'estimate_salary_delta()'],
    },
    {
      prompt: 'Simulate adding Go and Rust to my candidate embedding vector.',
      toolName: 'simulate_skill',
      toolParams: '{ add_skills: ["Go", "Rust"], reindex_catalog: true }',
      toolOutput: 'ΔN = +88 openings • Median Salary Delta = +$28,000',
      response: 'Re-indexing against 104,250 active postings yields +88 newly qualified opportunities. Your candidate match percentile leaps from Top 18.2% to Top 4.1% across Tier-1 engineering teams.',
      steps: ['project_embedding_vector()', 'simulate_skill()', 'reindex_catalog()'],
    },
  ];

  const availableSkills = [
    { name: 'Kubernetes', domain: 'Cloud/Infra', lift: 14500, roles: 28 },
    { name: 'CUDA Kernels', domain: 'AI Acceleration', lift: 22000, roles: 36 },
    { name: 'Go / Systems', domain: 'Distributed', lift: 16000, roles: 31 },
    { name: 'Rust', domain: 'Core Systems', lift: 19500, roles: 24 },
    { name: 'TensorRT-LLM', domain: 'Inference', lift: 25000, roles: 42 },
    { name: 'Ray / vLLM', domain: 'Distributed AI', lift: 21000, roles: 34 },
  ];

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]
    );
  };

  // Dynamic calculations based on selected skills
  const activeSkillObjects = availableSkills.filter((s) => selectedSkills.includes(s.name));
  const oppCount = 64 + activeSkillObjects.reduce((acc, curr) => acc + curr.roles, 0);
  const salaryLift = activeSkillObjects.reduce((acc, curr) => acc + curr.lift, 0);
  const matchBoost = Math.min(98.5, 78.4 + activeSkillObjects.length * 4.6).toFixed(1);

  return (
    <section id="advanced" className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Background Decorative Ambient Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-brand-600/15 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute -top-20 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-brand-300 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            <span>Aceternity Advanced Architecture &bull; Counterfactual Math</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Counterfactual Simulation &amp; Autonomous Agents
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Move beyond static matching. Model your future career moves with deterministic mathematical confidence.
          </p>
        </div>

        {/* Aceternity Interactive Animated Segmented Tabs */}
        <div className="flex justify-center">
          <div className="relative p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-wrap gap-1 justify-center">
            
            {/* Tab 1: What-If */}
            <button
              onClick={() => setActiveTab('what-if')}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'what-if' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeTab === 'what-if' && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 shadow-lg shadow-brand-500/30"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <TrendingUp className="w-4 h-4 relative z-10 text-emerald-400" />
              <span className="relative z-10">What-If Simulation</span>
            </button>

            {/* Tab 2: AI Career Agent */}
            <button
              onClick={() => setActiveTab('agent')}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'agent' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeTab === 'agent' && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 shadow-lg shadow-brand-500/30"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <AgentIcon className="w-4 h-4 relative z-10 text-brand-300" />
              <span className="relative z-10">AI Career Agent</span>
            </button>

            {/* Tab 3: Role Pathways */}
            <button
              onClick={() => setActiveTab('pathway')}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'pathway' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeTab === 'pathway' && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 shadow-lg shadow-brand-500/30"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Compass className="w-4 h-4 relative z-10 text-cyan-400" />
              <span className="relative z-10">Role Pathways</span>
            </button>

          </div>
        </div>

        {/* Unified Studio Card Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800/90 shadow-2xl backdrop-blur-xl relative">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: WHAT-IF SIMULATION */}
            {activeTab === 'what-if' && (
              <motion.div
                key="what-if"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Context & Action */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-Time Vector Counterfactuals</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                    Simulate skill acquisitions before investing months learning.
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Toggle prospective skills below to simulate modifying your candidate 384-dimensional vector coordinate. ANVESH immediately calculates the exact net shift in job opportunities, salary ceilings, and qualification probabilities.
                  </p>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">&Delta;N Opportunity Math:</strong>
                        <span className="text-slate-400 text-xs">Computes verified net new openings matching your vector above the 80% cosine threshold.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">&Delta;Salary Projection:</strong>
                        <span className="text-slate-400 text-xs">Estimates annual median compensation delta across calibrated Tier-1 company tiers.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="noise"
                      size="md"
                      className="font-bold text-xs gap-2 shadow-lg shadow-brand-500/25"
                      onClick={() => openAuthModal('signup')}
                    >
                      <span>Launch Full What-If Simulator</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Right Column: Interactive Simulator Console */}
                <div className="lg:col-span-7">
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner space-y-6">
                    
                    {/* Console Header Bar */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-slate-200">Interactive Skill Matrix Sandbox</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 font-bold">
                        Live Simulation Active
                      </span>
                    </div>

                    {/* Skill Chips */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-mono">Select skills to inject into candidate vector:</span>
                        <span className="text-emerald-400 font-mono font-bold">{selectedSkills.length} active</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableSkills.map((skill) => {
                          const isSelected = selectedSkills.includes(skill.name);
                          return (
                            <button
                              key={skill.name}
                              onClick={() => toggleSkill(skill.name)}
                              className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                                isSelected
                                  ? 'bg-emerald-500/20 border-emerald-500/80 text-emerald-300 shadow-md shadow-emerald-500/20 scale-[1.02]'
                                  : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              <span className="truncate">{skill.name}</span>
                              {isSelected ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <Plus className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dynamic Metrics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Opportunity Lift</span>
                        <span className="text-2xl font-extrabold text-emerald-400 font-mono">+{oppCount}</span>
                        <span className="text-[10px] text-slate-500 block">Verified Openings</span>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Salary Delta</span>
                        <span className="text-2xl font-extrabold text-indigo-300 font-mono">+${salaryLift.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500 block">Annual Median</span>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Top Match Fit</span>
                        <span className="text-2xl font-extrabold text-cyan-300 font-mono">{matchBoost}%</span>
                        <span className="text-[10px] text-slate-500 block">Rank Percentile</span>
                      </div>
                    </div>

                    {/* Real-time Unlocked Roles */}
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block">Simulated High-Affinity Unlocks:</span>
                      
                      <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white block">Lead AI Infrastructure Engineer</span>
                          <span className="text-[10px] text-slate-400 font-mono">Triton &bull; CUDA &bull; Distributed Storage</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                          {matchBoost}% Match
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white block">Principal MLOps Architect</span>
                          <span className="text-[10px] text-slate-400 font-mono">Kubernetes &bull; Ray &bull; Vector Retrieval</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
                          {(parseFloat(matchBoost) - 2.8).toFixed(1)}% Match
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: AUTONOMOUS AI CAREER AGENT */}
            {activeTab === 'agent' && (
              <motion.div
                key="agent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Context & Action */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
                    <AgentIcon className="w-3.5 h-3.5 text-brand-400" />
                    <span>Deterministic Tool-Calling Architecture</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                    An autonomous agent executing strict microservices, not hallucinations.
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Instead of generating generic chat text, the ANVESH Agent calls structured tools to query your verified profile vector, calculate ontological skill graph distances, and execute multi-stage ranking models.
                  </p>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                      <Code2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">Strict JSON Schema Validation:</strong>
                        <span className="text-slate-400 text-xs">Every tool execution adheres to mathematical type schemas with guaranteed deterministic inputs.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                      <Cpu className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">Multi-Step Execution Pipeline:</strong>
                        <span className="text-slate-400 text-xs">Automates complex multi-stage queries across vector search, salary forecasting, and skill gap calibration.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="noise"
                      size="md"
                      className="font-bold text-xs gap-2 shadow-lg shadow-brand-500/25"
                      onClick={() => openAuthModal('signup')}
                    >
                      <span>Interact with Agent in Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Right Column: Interactive Agent Console */}
                <div className="lg:col-span-7">
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner space-y-5">
                    
                    {/* Console Header Bar */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-xs font-mono text-slate-400 ml-2">agent_runtime_v2.py</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-[10px] font-mono text-brand-300 font-bold">
                        Microservice Active
                      </span>
                    </div>

                    {/* Sample Query Buttons */}
                    <div className="space-y-2">
                      <span className="text-xs text-slate-400 font-mono">Select candidate inquiry:</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {agentQueries.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => setAgentQuery(idx)}
                            className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                              agentQuery === idx
                                ? 'bg-brand-500/20 text-white border-brand-500 font-bold shadow-sm shadow-brand-500/20'
                                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                            }`}
                          >
                            &ldquo;{q.prompt}&rdquo;
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tool Execution Pipeline Steps */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5">
                        <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Execution Pipeline</span>
                        </span>
                        <span className="text-slate-500">Latency: 34ms</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 py-1">
                        {agentQueries[agentQuery].steps.map((step, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-300 font-mono">
                            {sIdx + 1}. {step}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] space-y-1 pt-1 border-t border-slate-800/80">
                        <p className="text-amber-300">
                          &gt; tool: <strong>{agentQueries[agentQuery].toolName}</strong>{agentQueries[agentQuery].toolParams}
                        </p>
                        <p className="text-emerald-400">
                          &rarr; output: {agentQueries[agentQuery].toolOutput}
                        </p>
                      </div>
                    </div>

                    {/* Agent Response Card */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-brand-950/80 to-slate-900 border border-brand-800/60 text-xs text-slate-200 leading-relaxed space-y-1">
                      <span className="text-[10px] font-mono font-bold text-brand-400 uppercase tracking-wider block">
                        Autonomous Recommendation:
                      </span>
                      <p>{agentQueries[agentQuery].response}</p>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: ROLE PATHWAYS */}
            {activeTab === 'pathway' && (
              <motion.div
                key="pathway"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Context & Action */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ontology Graph Traversal</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                    Shortest mathematical transition paths across technical roles.
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Careers are connected directed graphs. ANVESH calculates the minimum-distance path to pivot from your current role into high-paying AI, MLOps, or distributed systems positions with the least friction.
                  </p>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                      <GitBranch className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">Adjacent Node Discovery:</strong>
                        <span className="text-slate-400 text-xs">Identifies sibling career nodes with &gt;75% skill reuse to accelerate transitions.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                      <Workflow className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">High-Leverage Bridge Skills:</strong>
                        <span className="text-slate-400 text-xs">Pinpoints the 2-3 specific competencies that unlock the largest compensation leap.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="noise"
                      size="md"
                      className="font-bold text-xs gap-2 shadow-lg shadow-brand-500/25"
                      onClick={() => openAuthModal('signup')}
                    >
                      <span>Explore Your Transition Graph</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Right Column: Visual Graph Transition Console */}
                <div className="lg:col-span-7">
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner space-y-5">
                    
                    {/* Console Header Bar */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-slate-200">Directed Acyclic Career Transition</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold">
                        Shortest Path (Cost: 0.18)
                      </span>
                    </div>

                    {/* 3-Step Flow Visual */}
                    <div className="space-y-3 relative">
                      
                      {/* Step 1: Base State */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-400" />
                            <span className="text-xs font-bold text-white">Current Node: Senior Backend Engineer</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono">Python &bull; FastAPI &bull; Docker &bull; PostgreSQL</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-slate-300 block">$145,000</span>
                          <span className="text-[10px] text-slate-500">Base State</span>
                        </div>
                      </div>

                      {/* Transition Vector Connector */}
                      <div className="flex items-center justify-center">
                        <div className="px-4 py-1.5 rounded-full bg-indigo-950/90 border border-indigo-700/80 text-[11px] font-mono text-indigo-300 flex items-center gap-2 shadow-lg shadow-indigo-950/60">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Bridge: Qdrant Vectors + Triton Inference (+26% Match)</span>
                        </div>
                      </div>

                      {/* Step 2: Intermediate Target */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-700/80 flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-bold text-white">Target Node: Lead AI Platform Engineer</span>
                          </div>
                          <p className="text-[11px] text-indigo-200/90 font-mono">PyTorch &bull; Triton &bull; Kubernetes &bull; CUDA</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-emerald-400 block">$215,000+</span>
                          <span className="text-[10px] text-indigo-300 font-semibold">94.8% Match</span>
                        </div>
                      </div>

                    </div>

                    {/* Transition ROI Summary */}
                    <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Estimated Effort</span>
                        <span className="text-sm font-bold text-white font-mono mt-0.5 block">6 - 8 Weeks</span>
                        <span className="text-[10px] text-slate-500">2 High-Leverage Skills</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Annual ROI</span>
                        <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">+$70,000/yr</span>
                        <span className="text-[10px] text-slate-500">Comp Delta</span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
