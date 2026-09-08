'use client';

import React from 'react';
import { Database, Cpu, Layers, ShieldCheck, Zap, GitFork } from 'lucide-react';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';

export function TrustSection() {
  const trustCards = [
    {
      icon: <Database className="w-5 h-5 text-brand-600" />,
      title: 'Qdrant HNSW Vector Search',
      subtitle: 'Dense 384-d MiniLM Embeddings',
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      title: 'LightGBM LambdaMART',
      subtitle: 'Pairwise Learning-to-Rank Engine',
    },
    {
      icon: <GitFork className="w-5 h-5 text-emerald-600" />,
      title: 'Canonical Skill Ontology',
      subtitle: 'Zero-Hallucination Graph Traversal',
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-600" />,
      title: 'MMR Multi-Objective Diversity',
      subtitle: 'Eliminates Redundant Listings',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: 'PostgreSQL 16 & Redis 7',
      subtitle: 'ACID Relational Source of Truth',
    },
  ];

  const streamMatches = [
    {
      name: 'NVIDIA',
      title: 'Senior AI Platform Engineer',
      quote: 'Matched on PyTorch, Vector DBs, and Triton inference pipelines with 0.93 cosine affinity.',
      match: '94.2% Match',
      salary: '$185k - $245k (+$35k Lift)',
    },
    {
      name: 'Stripe',
      title: 'MLOps Systems Engineer',
      quote: 'Direct trajectory match from Backend to MLOps upon simulating Kubernetes and Go.',
      match: '91.5% Match',
      salary: '$190k - $255k (+$42k Lift)',
    },
    {
      name: 'Spotify',
      title: 'Recommendation Systems Lead',
      quote: 'Multi-stage candidate retrieval and LambdaMART pairwise ranker match score.',
      match: '88.7% Match',
      salary: '$195k - $260k (+$28k Lift)',
    },
    {
      name: 'Anthropic',
      title: 'Autonomous AI Agent Architect',
      quote: 'Tool-calling schema and context distillation engineering match.',
      match: '93.0% Match',
      salary: '$200k - $275k (+$50k Lift)',
    },
    {
      name: 'Databricks',
      title: 'Distributed Vector Platform Architect',
      quote: 'Ray, Qdrant HNSW indexing, and distributed model cache alignment.',
      match: '90.4% Match',
      salary: '$195k - $250k (+$38k Lift)',
    },
  ];

  return (
    <section className="py-14 border-y border-slate-200/80 bg-slate-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
          Enterprise-Grade Deterministic Recommendation Architecture
        </p>

        {/* 5 Architecture Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustCards.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-subtle hover:shadow-card hover:border-brand-200 transition-all flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aceternity UI Infinite Moving Cards Stream */}
      <div className="pt-2">
        <div className="text-center mb-3">
          <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60 uppercase tracking-wider">
            Live Stream &bull; Real-Time Hybrid Matches & Simulations
          </span>
        </div>
        <InfiniteMovingCards items={streamMatches} speed="normal" />
      </div>
    </section>
  );
}
