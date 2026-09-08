'use client';

import React from 'react';
import { Database, Cpu, Layers, ShieldCheck, Zap, GitFork, Sparkles, Activity } from 'lucide-react';
import { InfiniteMovingCards, StreamMatchItem } from './ui/infinite-moving-cards';
import { Badge } from './ui/badge';

export function TrustSection() {
  const trustCards = [
    {
      icon: <Database className="w-5 h-5 text-brand-600" />,
      title: 'Qdrant HNSW Vector Search',
      subtitle: 'Dense 1536-d Vectors & Cosine Index',
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      title: 'LightGBM LambdaMART',
      subtitle: 'Pairwise Learning-to-Rank Engine',
    },
    {
      icon: <GitFork className="w-5 h-5 text-emerald-600" />,
      title: 'Canonical Skill Ontology',
      subtitle: '15,400+ Node Directed Graph',
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-600" />,
      title: 'MMR Multi-Objective Diversity',
      subtitle: 'Eliminates Monopolistic Postings',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: 'PostgreSQL 16 & Redis 7',
      subtitle: 'ACID Relational Source of Truth',
    },
  ];

  const streamRow1: StreamMatchItem[] = [
    {
      name: 'NVIDIA',
      title: 'Lead AI Infrastructure Engineer',
      quote: 'Matched on PyTorch, Triton Inference, and CUDA kernel optimization with 0.942 cosine affinity.',
      match: '94.8% Match',
      salary: '$195k - $265k (+$35k Lift)',
      latency: '1.1ms',
      timeAgo: 'Just now',
      skills: ['CUDA', 'PyTorch', 'Kubernetes'],
      logoBg: 'bg-emerald-700',
    },
    {
      name: 'Stripe',
      title: 'MLOps Platform Architect',
      quote: 'Direct trajectory match from Backend to MLOps upon counterfactual simulation of Go + Kubernetes.',
      match: '92.5% Match',
      salary: '$190k - $255k (+$42k Lift)',
      latency: '0.8ms',
      timeAgo: '12s ago',
      skills: ['Go', 'Kubernetes', 'Docker'],
      logoBg: 'bg-indigo-600',
    },
    {
      name: 'Anthropic',
      title: 'AI Alignment Systems Lead',
      quote: 'Tool-calling schema and context distillation engineering match on verified ontology path.',
      match: '93.2% Match',
      salary: '$210k - $280k (+$50k Lift)',
      latency: '1.4ms',
      timeAgo: '35s ago',
      skills: ['RLHF', 'LangChain', 'Python'],
      logoBg: 'bg-amber-700',
    },
    {
      name: 'Spotify',
      title: 'Recommendation Systems Engineer',
      quote: 'Two-stage candidate retrieval and LambdaMART pairwise ranker match score calibration.',
      match: '89.7% Match',
      salary: '$185k - $240k (+$28k Lift)',
      latency: '1.2ms',
      timeAgo: '1m ago',
      skills: ['Scikit-Learn', 'VectorDB', 'Java'],
      logoBg: 'bg-green-700',
    },
    {
      name: 'Databricks',
      title: 'Distributed Vector Platform Architect',
      quote: 'Ray, Qdrant HNSW indexing, and distributed model caching alignment.',
      match: '91.4% Match',
      salary: '$200k - $260k (+$38k Lift)',
      latency: '0.9ms',
      timeAgo: '2m ago',
      skills: ['Spark', 'Qdrant', 'Rust'],
      logoBg: 'bg-rose-700',
    },
  ];

  const streamRow2: StreamMatchItem[] = [
    {
      name: 'Google DeepMind',
      title: 'Senior Research Infrastructure Engineer',
      quote: 'JAX, TPU cluster scheduling, and distributed memory management match.',
      match: '95.1% Match',
      salary: '$220k - $310k (+$62k Lift)',
      latency: '1.0ms',
      timeAgo: 'Just now',
      skills: ['JAX', 'Distributed', 'C++'],
      logoBg: 'bg-blue-600',
    },
    {
      name: 'Meta AI',
      title: 'Llama Inference Optimization Lead',
      quote: 'vLLM, TensorRT-LLM, and kernel fusion optimization matched via skill ontology graph.',
      match: '93.6% Match',
      salary: '$205k - $290k (+$48k Lift)',
      latency: '1.3ms',
      timeAgo: '40s ago',
      skills: ['TensorRT', 'vLLM', 'PyTorch'],
      logoBg: 'bg-sky-600',
    },
    {
      name: 'OpenAI',
      title: 'Operator Systems Engineer',
      quote: 'FastAPI microservices, tool orchestration, and deterministic API schemas verified.',
      match: '94.0% Match',
      salary: '$215k - $300k (+$55k Lift)',
      latency: '1.1ms',
      timeAgo: '1m ago',
      skills: ['Python', 'FastAPI', 'Redis'],
      logoBg: 'bg-slate-900',
    },
    {
      name: 'Scale AI',
      title: 'Generative Data Engine Lead',
      quote: 'Automated evaluation pipelines and fine-tuning curation vectors matched with 0.91 cosine.',
      match: '90.8% Match',
      salary: '$190k - $250k (+$36k Lift)',
      latency: '1.5ms',
      timeAgo: '2m ago',
      skills: ['Evaluation', 'PostgreSQL', 'Python'],
      logoBg: 'bg-purple-700',
    },
    {
      name: 'Snowflake',
      title: 'Cortex ML Platform Architect',
      quote: 'Data warehouse vector embeddings and ACID relational metadata ingestion match.',
      match: '89.9% Match',
      salary: '$180k - $245k (+$30k Lift)',
      latency: '0.8ms',
      timeAgo: '3m ago',
      skills: ['Snowflake', 'SQL', 'FastAPI'],
      logoBg: 'bg-cyan-700',
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-y border-slate-200/80 bg-slate-50/70 overflow-hidden relative">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8 font-mono">
          Enterprise-Grade Deterministic Recommendation Architecture
        </p>

        {/* 5 Architecture Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {trustCards.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-[#0e121b] border border-slate-200/90 dark:border-slate-800 shadow-subtle hover:shadow-card hover:border-brand-200 transition-all flex flex-col items-center text-center space-y-2 group cursor-default"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Stream Telemetry Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Live Recommendation Stream
          </span>
          <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hidden sm:inline">
            104,250 Live Vectors
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
          <Activity className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
          <span>Real-Time LightGBM LambdaMART Ranking Loop &bull; Sub-25ms</span>
        </div>
      </div>

      {/* Dual Row Staggered Marquee Stream */}
      <div className="space-y-3 sm:space-y-4">
        {/* Row 1: Left */}
        <InfiniteMovingCards items={streamRow1} direction="left" speed="normal" />

        {/* Row 2: Right */}
        <InfiniteMovingCards items={streamRow2} direction="right" speed="normal" />
      </div>

    </section>
  );
}
