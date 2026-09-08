import React from 'react';
import { XCircle, CheckCircle2, ArrowRight, Brain, Filter, Sparkles, Compass } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function WhatIsSection() {
  return (
    <section id="platform" className="py-20 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="brand" className="font-bold">
            Architectural Manifesto
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What is ANVESH?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Named after the Sanskrit word for <em>Discovery & Exploration</em>, ANVESH is an AI career intelligence platform built to solve the fundamental flaws of modern job search.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Traditional Job Boards */}
          <div className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/90 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200/60">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Legacy Job Portals</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Brittle Search</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Keyword Matching & Black-Box Reject Filters
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Traditional portals rely on exact string queries. If your resume says &ldquo;K8s&rdquo; but the job requires &ldquo;Kubernetes Orchestration&rdquo;, you get eliminated by naive ATS filters without understanding your actual engineering depth.
              </p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-slate-200/80 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span>Zero semantic skill understanding (ignores transferable proficiencies)</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span>Repetitive, duplicate postings flooding search results</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span>No forward-looking insights or skill acquisition guidance</span>
              </li>
            </ul>
          </div>

          {/* ANVESH Intelligence Engine */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-brand-50/50 via-white to-white border-2 border-brand-500/30 shadow-card flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>ANVESH Platform</span>
                </div>
                <Badge variant="emerald" className="font-mono">Deterministic Engine</Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Multi-Stage Recommendation & Canonical Skill Graphs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                ANVESH canonicalizes your skills into an ontological graph, retrieves candidates using dense vector cosine similarity in Qdrant, ranks them with LightGBM LambdaMART, and diversifies output via Maximal Marginal Relevance (MMR).
              </p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-brand-100 text-sm text-slate-700 relative z-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Canonical Ontology:</strong> Maps K8s, Kubernetes, Container Orchestration to one verified node</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Multi-Objective Re-ranking:</strong> Balances relevance, domain diversity, and posting freshness</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>What-If Simulation:</strong> Test adding skills and immediately view market opportunity & salary lift</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
