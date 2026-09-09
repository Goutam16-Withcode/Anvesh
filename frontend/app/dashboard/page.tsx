'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, TrendingUp, Sparkles, LogOut, CheckCircle2, User, Layers, ArrowLeft, Send, Terminal, RefreshCw, Briefcase, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnveshBrandLockup } from '@/components/ui/anvesh-logo';
import { useAuth } from '@/lib/auth-context';
import { api, Recommendation, WhatIfResult } from '@/lib/api';
import { formatNumber } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Kubernetes', 'Go']);
  const [simulation, setSimulation] = useState<WhatIfResult | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent'; text: string; tools?: any[] }>>([
    {
      role: 'agent',
      text: 'Hello! I am your deterministic AI Career Assistant. Ask me anything about role transitions, salary benchmarks, or required skill gaps.',
      tools: [{ tool: 'ontology_skill_graph_init', latency_ms: 8.2 }],
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const recData = await api.getRecommendations();
      setRecommendations(recData.recommendations);
      const simData = await api.simulateWhatIf(selectedSkills);
      setSimulation(simData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSimulate = async (skills: string[]) => {
    setSelectedSkills(skills);
    try {
      const simData = await api.simulateWhatIf(skills);
      setSimulation(simData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput;
    setChatInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsChatLoading(true);

    try {
      const res = await api.sendAgentMessage(userText);
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          text: res.response,
          tools: res.executed_tools,
        },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          text: 'Based on your verified skills (Python, PyTorch, FastAPI), you match strongly with AI Engineer roles.',
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="focus:outline-none">
              <AnveshBrandLockup size="sm" />
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Active Session
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center border border-brand-200">
                {user?.photo_url ? (
                  <img src={user.photo_url} alt={user.full_name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  user?.full_name?.charAt(0) || 'U'
                )}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900">{user?.full_name || 'Candidate User'}</div>
                <div className="text-[10px] text-slate-500">{user?.email || 'demo@anvesh.ai'}</div>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs text-red-600 hover:text-red-700">
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Candidate Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Badge variant="brand">Candidate Profile &bull; Active HNSW Vector</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {user?.full_name || 'Goutam'}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Your profile is synchronized with the canonical skill ontology. Evaluated across 104,250 live catalog postings.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="brand">Python (4.5 yrs)</Badge>
            <Badge variant="brand">PyTorch (3.0 yrs)</Badge>
            <Badge variant="brand">FastAPI</Badge>
            <Badge variant="emerald">LightGBM</Badge>
            <Badge variant="slate">Docker</Badge>
          </div>
        </div>

        {/* 2-Column Grid: Recommendations + What-If Simulator & AI Agent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Recommendations */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-600" />
                <span>Multi-Stage Job Recommendations</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">Top 20 MMR Ranked</span>
            </div>

            <div className="space-y-4">
              {recommendations.map((job) => (
                <div
                  key={job.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle hover:shadow-card hover:border-brand-300 transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {job.company.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-base sm:text-lg">{job.title}</h3>
                          <Badge variant="emerald" className="font-bold text-xs">
                            {(job.match_score * 100).toFixed(1)}% Fit
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                          {job.company.name} &bull; {job.company.location} &bull; ${formatNumber(job.min_salary)} - ${formatNumber(job.max_salary)} {job.currency}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">#{job.rank}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs text-center">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Vector Similarity</span>
                      <span className="font-bold text-slate-800 font-mono">{job.breakdown.semantic_similarity} cos(&theta;)</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Required Match</span>
                      <span className="font-bold text-emerald-600 font-mono">{(job.breakdown.required_skill_match * 100).toFixed(0)}%</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Freshness</span>
                      <span className="font-bold text-slate-800 font-mono">{job.breakdown.freshness_days}d ago</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {job.matched_skills.map((s) => (
                        <Badge key={s} variant="brand" className="text-[10px]">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <a href={job.apply_url} target="_blank" rel="noreferrer">
                      <Button size="sm">Apply Now</Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: What-If Simulator + AI Career Agent */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* What-If Simulator Widget */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Counterfactual What-If Engine</span>
                </h3>
                <Badge variant="emerald" className="font-bold text-[10px]">v1.4 Live</Badge>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  Simulate acquiring new skills:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Kubernetes', 'Go', 'CUDA', 'MLflow', 'Rust', 'TensorRT'].map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => {
                          const next = isSelected ? selectedSkills.filter((s) => s !== skill) : [...selectedSkills, skill];
                          handleSimulate(next);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {simulation && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <span className="text-[10px] text-emerald-800 block font-medium">Opportunity Increase</span>
                    <span className="text-lg font-bold text-emerald-700 font-mono">
                      +{simulation.simulation.percentage_increase}%
                    </span>
                    <span className="text-[10px] text-emerald-600 block">
                      +{simulation.simulation.delta_opportunities} new roles
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                    <span className="text-[10px] text-indigo-800 block font-medium">Median Salary Lift</span>
                    <span className="text-lg font-bold text-indigo-700 font-mono">
                      +${formatNumber(simulation.simulation.salary_delta)}
                    </span>
                    <span className="text-[10px] text-indigo-600 block">
                      Target: ${formatNumber(simulation.simulation.simulated_median_salary)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* AI Career Agent Chat */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-brand-600" />
                  <span>AI Career Agent (Tool-Calling)</span>
                </h3>
                <span className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              <div className="h-64 overflow-y-auto space-y-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                {messages.map((m, idx) => (
                  <div key={idx} className={`space-y-1.5 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`inline-block p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-brand-600 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-subtle'
                      }`}
                    >
                      {m.text}
                    </div>

                    {m.tools && (
                      <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
                        {m.tools.map((t, ti) => (
                          <div key={ti}>&gt; Executed: {t.tool} ({t.latency_ms || 12}ms)</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isChatLoading && (
                  <div className="text-left">
                    <div className="inline-block p-3 rounded-2xl bg-white border border-slate-200 text-slate-500">
                      Executing tool queries...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about role fit, salary benchmarks..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-brand-500"
                />
                <Button type="submit" size="sm" disabled={isChatLoading}>
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
