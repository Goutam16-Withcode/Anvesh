'use client';

import React from 'react';
import { FileText, GitGraph, Search, Cpu, Layers, Activity, Sparkles } from 'lucide-react';
import { CardSpotlight } from './ui/card-spotlight';
import { FollowerPointerCard } from './ui/following-pointer';
import { Badge } from './ui/badge';
import { useAuth } from '@/lib/auth-context';

export function CoreFeatures() {
  const { openAuthModal } = useAuth();

  const features = [
    {
      title: 'Deterministic Profile Intelligence',
      description:
        'Ingests multi-page PDF & DOCX resumes without LLM hallucinations. Extracts verified timeline experience, projects, and domain proficiencies into a structured JSON schema.',
      icon: <FileText className="w-5 h-5" />,
      badge: <Badge variant="brand">Stage 1 Ingestion</Badge>,
      pointerTitle: 'Deterministic Parser Live',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Canonical Skill Ontology Graph',
      description:
        'Normalizes arbitrary skill variants (e.g. "K8s", "Kubernetes", "Container Orchestration") into standardized canonical ontology nodes in skills.json with cross-domain relationship graphs.',
      icon: <GitGraph className="w-5 h-5" />,
      badge: <Badge variant="emerald">Graph Ontology</Badge>,
      pointerTitle: 'Canonical Skill Graph',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Hybrid Candidate Retrieval (500 Pool)',
      description:
        'Executes simultaneous Qdrant HNSW vector retrieval (384-dimensional MiniLM embeddings), exact/fuzzy skill match matrices, and adjacent taxonomy graph expansions in sub-25ms.',
      icon: <Search className="w-5 h-5" />,
      badge: <Badge variant="cyan">HNSW Vector DB</Badge>,
      pointerTitle: 'Qdrant HNSW 384-d',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Learning-to-Rank Engine (LightGBM)',
      description:
        'LambdaMART model evaluates pairwise feature vectors (semantic cosine, required skill fit ratio, experience delta, and freshness decay) optimizing NDCG@10 relevance.',
      icon: <Cpu className="w-5 h-5" />,
      badge: <Badge variant="brand">LTR Ranker</Badge>,
      pointerTitle: 'LightGBM LambdaMART',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Multi-Objective MMR Diversification',
      description:
        'Applies Maximal Marginal Relevance with exponential decay penalty (e^-lambda*dt) to eliminate redundant postings from the same employer or duplicate titles.',
      icon: <Layers className="w-5 h-5" />,
      badge: <Badge variant="slate">Diversity Math</Badge>,
      pointerTitle: 'MMR Diversification',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Real-Time Telemetry & Affinity Loop',
      description:
        'Captures CTR, dwell time, and bookmark actions to update personalized company and job-family affinity vectors in real time without storing sensitive candidate PII.',
      icon: <Activity className="w-5 h-5" />,
      badge: <Badge variant="emerald">Real-Time State</Badge>,
      pointerTitle: 'Real-Time Telemetry',
      colSpan: 'md:col-span-2',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-slate-50/50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="brand" className="font-bold">
            Core Architectural Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered for Precision Matching
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every layer in the ANVESH pipeline is built on reproducible mathematical formulations. Move your cursor over any feature to inspect the active pointer badge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((item, i) => (
            <FollowerPointerCard
              key={i}
              title={
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{item.pointerTitle}</span>
                </div>
              }
              className={`${item.colSpan}`}
            >
              <CardSpotlight
                onClick={() => openAuthModal('signup')}
                className="h-full flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100/80 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  {item.badge}
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600">
                  <span className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Click to explore live</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Stage 0{i + 1}</span>
                </div>
              </CardSpotlight>
            </FollowerPointerCard>
          ))}
        </div>

      </div>
    </section>
  );
}
