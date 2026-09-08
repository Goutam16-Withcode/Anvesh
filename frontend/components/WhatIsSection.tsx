'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Layers, 
  TrendingUp, 
  GitGraph, 
  Sliders, 
  ShieldAlert, 
  Zap, 
  Database,
  Search,
  Check,
  Cpu,
  ArrowUpRight
} from 'lucide-react';

export function WhatIsSection() {
  return (
    <section id="platform" className="py-24 md:py-36 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Ambient Lighting & High-Tech Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-brand-600/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-cyan-300 shadow-inner">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architectural Manifesto &bull; अन्वेष</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            What is ANVESH?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Named after the Sanskrit word for <strong className="text-cyan-300 font-semibold">Discovery &amp; Exploration</strong>, ANVESH is an AI career intelligence platform built to solve the fundamental flaws of modern job search.
          </p>
        </div>

        {/* 2-Column Comparison Grid (Midnight Sapphire & Electric Cyan Theme) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Column 1: Legacy Job Portals (The Problem) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-rose-500/30 shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden backdrop-blur-xl group hover:border-rose-500/50 transition-all duration-300"
          >
            {/* Top Glow Ambient */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-bold text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Legacy Job Portals</span>
                </div>
                <span className="text-xs text-rose-400/80 font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-rose-900/50">
                  Brittle Search
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                Keyword Matching &amp; Black-Box Reject Filters
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Traditional portals rely on exact string queries. If your resume says <code className="px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 font-mono text-xs border border-rose-800/80">&ldquo;K8s&rdquo;</code> but the job requires <code className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">&ldquo;Kubernetes Orchestration&rdquo;</code>, you get eliminated by naive ATS filters without understanding your actual engineering depth.
              </p>

              {/* Visual String Failure Simulation */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-rose-500/25 space-y-2 font-mono text-xs shadow-inner">
                <div className="flex justify-between items-center text-slate-400 text-[11px] pb-1 border-b border-slate-800">
                  <span>ATS Exact-String Parser</span>
                  <span className="text-rose-400 font-bold">REJECTED (Score: 0.0)</span>
                </div>
                <div className="text-[11px] space-y-1 text-slate-300">
                  <p className="text-rose-300">&gt; Query: &quot;Kubernetes Orchestration&quot;</p>
                  <p className="text-slate-400">&gt; Candidate Token: &quot;K8s&quot;</p>
                  <p className="text-rose-400 font-semibold">&rarr; String Match Failed: False (Levenshtein Distance &gt; 12)</p>
                </div>
              </div>
            </div>

            {/* Pain Point List */}
            <ul className="space-y-3.5 pt-6 border-t border-slate-800/80 text-sm text-slate-300 relative z-10">
              <li className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <XCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white font-semibold block text-xs">Zero Semantic Understanding:</strong>
                  <span className="text-slate-400 text-xs">Ignores adjacent and transferable engineering competencies across tools and frameworks.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <XCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white font-semibold block text-xs">Duplicate &amp; Stale Postings:</strong>
                  <span className="text-slate-400 text-xs">Repetitive scraped recruiter listings flood candidate feeds with zero freshness decay.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <XCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white font-semibold block text-xs">Zero Forward-Looking Guidance:</strong>
                  <span className="text-slate-400 text-xs">No mathematical simulation for high-ROI skill acquisitions or future compensation jumps.</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Column 2: ANVESH Platform (The Solution) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/15 flex flex-col justify-between space-y-8 relative overflow-hidden backdrop-blur-xl group hover:border-cyan-400 hover:shadow-cyan-500/25 transition-all duration-300"
          >
            {/* Top Radial Glow Accent */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-cyan-400/20 via-brand-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-extrabold shadow-sm shadow-cyan-500/30">
                  <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>ANVESH Platform</span>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Deterministic Engine
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                Multi-Stage Recommendation &amp; Canonical Skill Graphs
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                ANVESH canonicalizes your skills into an ontological graph, retrieves candidates using dense vector cosine similarity in Qdrant, ranks them with LightGBM LambdaMART, and diversifies output via Maximal Marginal Relevance (MMR).
              </p>

              {/* Visual Vector Unification Proof */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 shadow-inner space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-400 text-[11px] pb-1 border-b border-slate-800">
                  <span>Canonical Ontology Vector Index</span>
                  <span className="text-emerald-400 font-bold">MATCHED (Affinity: 98.4%)</span>
                </div>
                <div className="text-[11px] space-y-1 text-slate-200">
                  <p className="text-cyan-300">&gt; Node Resolution: [K8s &harr; Kubernetes &harr; Orchestration] &rarr; node_8109</p>
                  <p className="text-slate-400">&gt; Qdrant 384-d Cosine Metric: 0.9842 &bull; Latency: 1.18ms</p>
                  <p className="text-emerald-400 font-semibold">&rarr; Ranked #1 with TreeSHAP verified feature attribution</p>
                </div>
              </div>
            </div>

            {/* Architectural Solutions List */}
            <ul className="space-y-3.5 pt-6 border-t border-slate-800/80 text-sm text-slate-200 relative z-10">
              <li className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white font-semibold block text-xs">Canonical Ontology:</strong>
                  <span className="text-slate-400 text-xs">Maps K8s, Kubernetes, and Container Orchestration to one unified verified graph node.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white font-semibold block text-xs">Multi-Objective Re-ranking:</strong>
                  <span className="text-slate-400 text-xs">LightGBM LambdaMART balances semantic fit, domain diversity (<code className="text-cyan-300 font-mono">&lambda;=0.72</code>), and freshness.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white font-semibold block text-xs">What-If Simulation:</strong>
                  <span className="text-slate-400 text-xs">Test prospective skill acquisitions and immediately calculate live market opportunity &amp; salary lift.</span>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}


