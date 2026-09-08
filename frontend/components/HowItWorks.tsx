'use client';

import React from 'react';
import { Upload, GitBranch, Cpu, Rocket, CheckCircle2, Sparkles, Database, FileText, ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { ExpandableCards, ExpandableCardItem } from './ui/expandable-cards';
import { useAuth } from '@/lib/auth-context';

export function HowItWorks() {
  const { openAuthModal } = useAuth();

  const stepCards: ExpandableCardItem[] = [
    {
      id: 'step-01-ingest',
      title: 'Ingest & Deterministic Parsing',
      category: 'Phase 01 &bull; Document Ingestion',
      badge: 'Step 01',
      badgeVariant: 'brand',
      icon: <Upload className="w-5 h-5 text-brand-600" />,
      shortDescription:
        'Upload your multi-page PDF or DOCX resume. ANVESH deterministically extracts verified timeline experience, projects, and domain proficiencies without LLM hallucinations.',
      metrics: [
        { label: 'Latency', value: '115ms' },
        { label: 'Integrity', value: '100% PII-Safe' },
      ],
      tags: ['PDFParser', 'Validation', 'ZeroHallucination'],
      ctaText: 'Upload Resume Now',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            The ingestion phase extracts text layers and structural layouts from resumes. Instead of relying on random LLM token generation, ANVESH runs regex coordinate mapping and verified JSON schema validation.
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1.5 border border-slate-800">
            <span className="text-brand-400 font-bold block">// Extraction Pipeline</span>
            <p className="text-slate-400">1. PDF text coordinate stream extraction &bull; 24ms</p>
            <p className="text-slate-400">2. Date timeline sequence validation &bull; 12ms</p>
            <p className="text-emerald-300 font-bold">3. Canonical schema compilation &bull; Pydantic Ready</p>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <p>&bull; No personal contact info is shared with third-party tracking networks.</p>
            <p>&bull; Supports multi-column modern tech resumes, CVs, and project portfolios.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'step-02-vectors',
      title: 'Canonical Normalization & Vectors',
      category: 'Phase 02 &bull; Vectorization',
      badge: 'Step 02',
      badgeVariant: 'emerald',
      icon: <GitBranch className="w-5 h-5 text-emerald-600" />,
      shortDescription:
        'Your skills are mapped to canonical ontology nodes in skills.json and encoded into 1536-dimensional dense vectors via sentence-transformers.',
      metrics: [
        { label: 'Embed Dim', value: '1536-d' },
        { label: 'Graph Nodes', value: '15,400+' },
      ],
      tags: ['SentenceTransformers', 'SkillGraph', 'Embeddings'],
      ctaText: 'Explore Vector Math',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            Extracted raw text strings are mapped against the 15,400+ canonical node skills graph. Variations like <em>"k8s"</em>, <em>"kubernetes"</em>, and <em>"containerization"</em> resolve to a single canonical cluster.
          </p>

          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-xs font-mono text-emerald-200 space-y-1">
            <span className="font-bold text-emerald-400 block text-[10px] uppercase">Vector Embedding Output:</span>
            <p className="text-slate-300">[ 0.0841, -0.4120, 0.9123, ... 1536 dense dimensions ]</p>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            Enables high-fidelity semantic matching that understands contextual role seniority rather than simplistic keyword counts.
          </p>
        </div>
      ),
    },
    {
      id: 'step-03-ranking',
      title: 'Hybrid Retrieval & LTR Ranking',
      category: 'Phase 03 &bull; LambdaMART & MMR',
      badge: 'Step 03',
      badgeVariant: 'cyan',
      icon: <Cpu className="w-5 h-5 text-cyan-600" />,
      shortDescription:
        'Qdrant retrieves 500 candidate jobs via HNSW cosine similarity. LightGBM LambdaMART evaluates pairwise features, and MMR diversifies the final top recommendations.',
      metrics: [
        { label: 'Pool Size', value: '500 Jobs' },
        { label: 'Top Output', value: 'Top 10-20' },
      ],
      tags: ['Qdrant', 'LightGBM', 'LambdaMART', 'MMR'],
      ctaText: 'Test Live Ranking',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            Candidate postings undergo two-pass scoring:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block">Pass 1: Sub-25ms Qdrant HNSW Retrieval</strong>
              <span className="text-slate-600 dark:text-slate-400">Filters 100k+ global openings down to the top 500 nearest neighbors.</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block">Pass 2: LightGBM LambdaMART Re-ranking</strong>
              <span className="text-slate-600 dark:text-slate-400">Evaluates pairwise feature vectors and applies MMR diversification.</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'step-04-simulate',
      title: 'Simulate What-If & Accelerate',
      category: 'Phase 04 &bull; Counterfactual Growth',
      badge: 'Step 04',
      badgeVariant: 'violet',
      icon: <Rocket className="w-5 h-5 text-purple-600" />,
      shortDescription:
        'Discover tailored career roles, examine transparent match score breakdowns, and simulate hypothetical skill acquisitions to maximize salary and market leverage.',
      metrics: [
        { label: 'Salary Delta', value: '+$28k Avg' },
        { label: 'Speedup', value: 'Instant' },
      ],
      tags: ['WhatIfEngine', 'Counterfactual', 'CareerGrowth'],
      ctaText: 'Launch What-If Sandbox',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            The What-If Engine simulates adding hypothetical skills (e.g. <em>CUDA</em>, <em>Kubernetes</em>, or <em>Go</em>) to your profile vector, providing instant projected salary lift and newly unlocked roles.
          </p>

          <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/50 text-xs font-mono text-purple-200">
            <span className="text-purple-300 font-bold block text-[10px] uppercase">Simulated Impact:</span>
            <p className="mt-1">+34 New High-Tier Roles Unlocked &bull; +$32,400 Median Comp</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-slate-50/60 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="brand" className="font-bold">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-600 animate-pulse" />
            <span>Interactive 4-Step Pipeline &bull; Click to Expand</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How ANVESH Delivers Deterministic Precision
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A transparent four-stage pipeline engineered to replace brittle ATS filters with mathematically grounded recommendations. <strong>Click any step below</strong> to inspect detailed pipeline metrics.
          </p>
        </div>

        {/* Expandable Step Cards */}
        <ExpandableCards items={stepCards} gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />

      </div>
    </section>
  );
}
