'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Activity, CheckCircle2, TrendingUp, Compass, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Spotlight } from './ui/spotlight';
import { FlipWords } from './ui/flip-words';
import { AnimatedTooltip } from './ui/animated-tooltip';
import { useAuth } from '@/lib/auth-context';

export function Hero() {
  const { user, openAuthModal } = useAuth();
  const rotatingWords = ['AI Engineers', 'MLOps Architects', 'Systems Researchers', 'Backend Leads'];

  const candidateAvatars = [
    {
      id: 1,
      name: 'Priya Sharma',
      designation: 'Sr. AI Engineer @ NVIDIA (+$42k)',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Alex Rivera',
      designation: 'MLOps Lead @ Stripe (+$35k)',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Kavita Patel',
      designation: 'Vector Systems @ Anthropic',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Marcus Chen',
      designation: 'Ranker Architect @ Spotify',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white">
      {/* Background Grid & Spotlights */}
      <div className="absolute inset-0 bg-grid-slate pointer-events-none opacity-60 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(79, 70, 229, 0.14)" />
      
      {/* Ambient gradient circles */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-200/80 shadow-sm shadow-brand-500/10 hover:border-brand-300 transition-all cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-ping" />
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800">
              Deterministic Hybrid Retrieval & What-If Simulation
            </span>
            <span className="text-xs font-bold text-brand-600 px-1.5 py-0.5 rounded bg-brand-50">v1.4</span>
          </div>

          {/* Main Headline with Flip Words */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
            Deterministic Career Discovery for <br />
            <FlipWords words={rotatingWords} className="text-brand-600" />
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            ANVESH maps your verified experience to canonical skill graphs, evaluates global positions using 
            <strong className="text-slate-900 font-semibold"> Qdrant HNSW vector retrieval</strong>, 
            <strong className="text-slate-900 font-semibold"> LightGBM LambdaMART ranking</strong>, and lets you simulate counterfactual career growth with zero hallucinations.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto font-bold gap-3 shadow-lg shadow-brand-500/25 text-base">
                  <span>Enter Discovery Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={() => openAuthModal('signup')}
                className="w-full sm:w-auto font-bold gap-3 shadow-lg shadow-brand-500/25 text-base"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}

            <a href="#showcase">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold gap-2 text-base">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Explore Live Interactive Demo</span>
              </Button>
            </a>
          </div>

          {/* Social Proof with Tooltip Avatars */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-3">
              <AnimatedTooltip items={candidateAvatars} />
              <div className="text-left pl-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="text-[11px] text-slate-600 font-semibold">
                  Used by top AI & Systems Engineers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Dashboard Visual Mockup */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Outer glow frame */}
          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-brand-200/50 via-slate-200/60 to-slate-100/40 shadow-2xl border border-white/60">
            
            {/* Browser top-bar */}
            <div className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-inner">
              <div className="bg-slate-50/90 border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="px-4 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-500 font-mono flex items-center gap-2 shadow-subtle">
                  <Compass className="w-3.5 h-3.5 text-brand-600" />
                  <span>https://anvesh.ai/discovery/recommendations?mode=hybrid</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LTR Pipeline Live</span>
                </div>
              </div>

              {/* Mockup Dashboard Content */}
              <div className="p-4 sm:p-6 lg:p-8 bg-slate-50/40 grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Candidate Profile & Skill Radar */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 text-white font-bold flex items-center justify-center text-base shadow-sm">
                        GA
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Goutam Anvesh</h4>
                        <p className="text-xs text-slate-500">Sr. Machine Learning Systems</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Experience Index</span>
                        <span className="font-semibold text-slate-800">4.5 yrs (Tier 1 Verified)</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Canonical Skills</span>
                        <span className="font-semibold text-brand-600">8 Verified Nodes</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <Badge variant="brand">Python</Badge>
                      <Badge variant="brand">PyTorch</Badge>
                      <Badge variant="brand">FastAPI</Badge>
                      <Badge variant="brand">Vector DBs</Badge>
                      <Badge variant="emerald">LightGBM</Badge>
                      <Badge variant="slate">Docker</Badge>
                    </div>
                  </div>

                  {/* Stage Metrics Card */}
                  <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-100 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-brand-900">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-brand-600" />
                        Hybrid Pipeline Latency
                      </span>
                      <span className="font-mono text-brand-700">32.8 ms</span>
                    </div>
                    <div className="w-full bg-brand-200/60 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-brand-600 h-full w-[85%] rounded-full" />
                    </div>
                    <p className="text-[11px] text-brand-700 leading-tight">
                      500 retrieved &rarr; 100 LambdaMART ranked &rarr; Top 20 MMR Diversified
                    </p>
                  </div>
                </div>

                {/* Right Column: Top Multi-Stage Recommendation Match */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card hover:border-brand-300 transition-all space-y-4">
                    
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                          NV
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                              Senior AI Platform Engineer
                            </h3>
                            <Badge variant="emerald" className="font-bold">
                              94.2% Match
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 font-medium">
                            NVIDIA &bull; Santa Clara, CA (Remote) &bull; $185,000 - $245,000 USD
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Rank #1 LTR
                        </span>
                      </div>
                    </div>

                    {/* Breakdown Scores Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 pb-1">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-500 block">Vector Similarity</span>
                        <span className="text-sm font-bold text-slate-900 font-mono">0.93 cos(&theta;)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-500 block">Required Skills</span>
                        <span className="text-sm font-bold text-emerald-600 font-mono">95% Fit</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-500 block">Experience Delta</span>
                        <span className="text-sm font-bold text-brand-600 font-mono">Optimal</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-500 block">Posting Freshness</span>
                        <span className="text-sm font-bold text-slate-900 font-mono">1 Day Old</span>
                      </div>
                    </div>

                    {/* Matched vs Gap Skills */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-semibold text-slate-700">Matched Skills:</span>
                        <Badge variant="brand">Python</Badge>
                        <Badge variant="brand">PyTorch</Badge>
                        <Badge variant="brand">FastAPI</Badge>
                        <Badge variant="brand">Vector Databases</Badge>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-semibold text-slate-500">Simulation Delta:</span>
                        <Badge variant="amber">+ CUDA adds $25,000 salary lift</Badge>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Live Badge Overlay 1 */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-xl max-w-xs animate-float">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">+52.8% Opportunity Unlock</span>
                <span className="text-[11px] text-slate-500">What-If on Kubernetes & Go</span>
              </div>
            </div>

            {/* Floating Live Badge Overlay 2 */}
            <div className="hidden sm:flex items-center gap-3 absolute -top-6 -right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-xl max-w-xs animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">100% Deterministic Parsing</span>
                <span className="text-[11px] text-slate-500">Canonical Taxonomy Ontology</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
