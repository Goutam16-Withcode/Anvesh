'use client';

import React from 'react';
import { FileText, GitGraph, Search, Cpu, Layers, Activity, Sparkles, CheckCircle2, ShieldCheck, Terminal, Database } from 'lucide-react';
import { Badge } from './ui/badge';
import { ExpandableCards, ExpandableCardItem } from './ui/expandable-cards';
import { useAuth } from '@/lib/auth-context';

export function CoreFeatures() {
  const { openAuthModal } = useAuth();

  const featureCards: ExpandableCardItem[] = [
    {
      id: 'profile-intelligence',
      title: 'Deterministic Profile Intelligence',
      category: 'Stage 1 &bull; Ingestion Pipeline',
      badge: 'Zero-Hallucination',
      badgeVariant: 'brand',
      icon: <FileText className="w-5 h-5" />,
      shortDescription:
        'Ingests multi-page PDF & DOCX resumes without LLM hallucinations. Extracts verified timeline experience, projects, and domain proficiencies into a structured JSON schema.',
      metrics: [
        { label: 'Parse Latency', value: '115ms' },
        { label: 'Schema Fit', value: '99.8%' },
      ],
      tags: ['PDFParser', 'StrictJSON', 'FastAPI', 'NoHallucinations'],
      ctaText: 'Test Resume Parser',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            Unlike traditional generative chatbots that invent degrees or embellish project scopes, ANVESH runs a <strong>deterministic parsing pipeline</strong>. Resumes are converted into hierarchical semantic tokens and validated against strict TypeScript/Pydantic schemas.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5">
              <span>Verified Candidate Payload Schema</span>
              <span className="text-emerald-400">Pydantic v2 Validated</span>
            </div>
            <pre className="text-emerald-300 overflow-x-auto leading-relaxed">
{`{
  "candidate_id": "usr_9984_verified",
  "total_yoe": 6.4,
  "skills_explicit": ["PyTorch", "CUDA", "FastAPI", "Kubernetes"],
  "verified_timeline": [
    { "role": "Senior ML Engineer", "duration_months": 38, "domain": "Inference" }
  ],
  "latent_dimensions": 1536
}`}
            </pre>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Architectural Guarantees:</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Deterministic text coordinate extraction from PDF layout streams.</li>
              <li>Cross-reference verification of date gaps and company entities.</li>
              <li>Immediate vector embedding generation via local GPU worker instances.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'canonical-ontology',
      title: 'Canonical Skill Ontology Graph',
      category: 'Stage 2 &bull; Graph Normalization',
      badge: 'Graph Ontology',
      badgeVariant: 'emerald',
      icon: <GitGraph className="w-5 h-5" />,
      shortDescription:
        'Normalizes arbitrary skill variants (e.g. "K8s", "Kubernetes", "Container Orchestration") into standardized canonical ontology nodes in skills.json with cross-domain relationship graphs.',
      metrics: [
        { label: 'Ontology Nodes', value: '15,400+' },
        { label: 'Synonym Map', value: '99.4%' },
      ],
      tags: ['OntologyGraph', 'Taxonomy', 'CrossDomain', 'SkillMapper'],
      ctaText: 'Explore Skill Graph',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            Recruiters and job postings use thousands of aliases for the same underlying technical skills. ANVESH bridges this gap with a <strong>directed weighted ontology graph</strong> that maps synonyms, hierarchical parent skills, and adjacent competencies.
          </p>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-xs space-y-2">
            <span className="font-bold text-emerald-400 block uppercase tracking-wider text-[10px]">
              Sample Ontology Traversal
            </span>
            <div className="flex items-center gap-2 font-mono text-slate-200 flex-wrap">
              <span className="px-2 py-1 bg-slate-900 rounded-md border border-slate-700">"K8s"</span>
              <span>&rarr;</span>
              <span className="px-2 py-1 bg-emerald-900/80 rounded-md border border-emerald-500 font-bold text-emerald-200">
                Kubernetes (Canonical Node #481)
              </span>
              <span>&rarr;</span>
              <span className="px-2 py-1 bg-slate-900 rounded-md border border-slate-700">Container Orchestration (Parent)</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              Candidates who specify <em>TensorRT</em> automatically receive weighted affinity credit for <em>Deep Learning Inference Optimization</em> and <em>NVIDIA GPU acceleration</em>.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'hybrid-retrieval',
      title: 'Hybrid Candidate Retrieval (500 Pool)',
      category: 'Stage 3 &bull; Vector & BM25 Match',
      badge: 'Qdrant HNSW',
      badgeVariant: 'cyan',
      icon: <Search className="w-5 h-5" />,
      shortDescription:
        'Executes simultaneous Qdrant HNSW vector retrieval (1536-dimensional embeddings), exact/fuzzy skill match matrices, and adjacent taxonomy graph expansions in sub-25ms.',
      metrics: [
        { label: 'Retrieval Latency', value: '18.4ms' },
        { label: 'Initial Pool', value: '500 Jobs' },
      ],
      tags: ['Qdrant', 'HNSW', 'CosineSimilarity', 'FastRetrieval'],
      ctaText: 'Test Vector Search',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            Rather than relying solely on keyword search or purely semantic vector distance, ANVESH employs a <strong>two-stage hybrid candidate generation engine</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-2 text-slate-200">
            <div className="flex justify-between text-[11px] text-cyan-400 border-b border-slate-800 pb-1">
              <span>Retrieval Scoring Formulation</span>
              <span>ef_search = 100</span>
            </div>
            <p className="text-cyan-200">
              S_hybrid = &alpha; &times; cos(V_user, V_job) + &beta; &times; (Skills_overlap / Required_count) + &gamma; &times; Taxonomy_score
            </p>
          </div>

          <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400 list-disc pl-5">
            <li>Filters out roles violating strict work-mode preferences (Remote vs Hybrid).</li>
            <li>Sub-25ms search over millions of active postings via Qdrant HNSW indexing.</li>
            <li>Prunes the candidate catalog down to the top 500 candidate jobs for the reranker.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'learning-to-rank',
      title: 'Learning-to-Rank Engine (LightGBM)',
      category: 'Stage 4 &bull; Multi-Feature LTR',
      badge: 'LambdaMART',
      badgeVariant: 'brand',
      icon: <Cpu className="w-5 h-5" />,
      shortDescription:
        'LambdaMART model evaluates pairwise feature vectors (semantic cosine, required skill fit ratio, experience delta, and freshness decay) optimizing NDCG@10 relevance.',
      metrics: [
        { label: 'NDCG@10', value: '0.942' },
        { label: 'Rank Latency', value: '6.8ms' },
      ],
      tags: ['LightGBM', 'LambdaMART', 'NDCG', 'PairwiseRanking'],
      ctaText: 'Inspect LTR Weights',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            The 500 retrieved candidates pass into a specialized <strong>LightGBM LambdaMART ranking model</strong>. The model scores 18 granular features per candidate-job pair to generate a deterministic relevance ranking.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Top Feature Weights:</span>
              <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                <li>&bull; Semantic Similarity (0.34)</li>
                <li>&bull; Required Skill Overlap (0.28)</li>
                <li>&bull; Preferred Skill Lift (0.16)</li>
              </ul>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Dynamic Adjustments:</span>
              <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                <li>&bull; Experience Fit Band (&plusmn;2 yrs)</li>
                <li>&bull; Posting Freshness Decay</li>
                <li>&bull; Salary Band Compatibility</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'mmr-diversity',
      title: 'Multi-Objective MMR Diversification',
      category: 'Stage 5 &bull; Diversity Math',
      badge: 'Exponential Decay',
      badgeVariant: 'slate',
      icon: <Layers className="w-5 h-5" />,
      shortDescription:
        'Applies Maximal Marginal Relevance with exponential decay penalty (e^-lambda*dt) to eliminate redundant postings from the same employer or duplicate titles.',
      metrics: [
        { label: 'Employer Cap', value: 'Max 2' },
        { label: 'Diversity Gain', value: '+42%' },
      ],
      tags: ['MMR', 'Diversification', 'AntiMonopoly', 'Entropy'],
      ctaText: 'See Diversification',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            Standard job boards often flood recommendations with 20 postings from a single corporation. ANVESH applies <strong>Maximal Marginal Relevance (MMR)</strong> to guarantee catalog diversity across domains and companies.
          </p>

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/50 text-xs font-mono text-indigo-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
              MMR Objective Function:
            </span>
            <p>
              argmax [ &lambda; &times; Rel(d_i) - (1 - &lambda;) &times; max_(d_j &isin; S) Sim(d_i, d_j) ]
            </p>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            This balances peak relevance while ensuring candidates discover hidden gem startups and top enterprise employers simultaneously.
          </p>
        </div>
      ),
    },
    {
      id: 'real-time-telemetry',
      title: 'Real-Time Telemetry & Affinity Loop',
      category: 'Stage 6 &bull; Privacy-Safe Affinity',
      badge: 'AES-256 GCM',
      badgeVariant: 'emerald',
      icon: <Activity className="w-5 h-5" />,
      shortDescription:
        'Captures CTR, dwell time, and bookmark actions to update personalized company and job-family affinity vectors in real time without storing sensitive candidate PII.',
      metrics: [
        { label: 'Loop Latency', value: '1.2ms' },
        { label: 'PII Stored', value: '0 Bytes' },
      ],
      tags: ['Telemetry', 'ZeroPII', 'AES256', 'Personalization'],
      ctaText: 'Inspect Privacy Model',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            Every user action (bookmarks, clicks, simulation tests) generates an instant micro-update to their encrypted affinity vector. The system gets smarter with every interaction while safeguarding user confidentiality.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-2 text-emerald-300">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-PII Tokenized Affinity</span>
              </span>
              <span className="text-emerald-400 text-[10px]">AES-256</span>
            </div>
            <p className="text-[11px] text-slate-300">
              affinity_state = update_state(prev_vector, event_type="BOOKMARK", weight=1.4)
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-slate-50/50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="brand" className="font-bold">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-600 animate-pulse" />
            <span>Interactive Architecture &bull; Expandable Deep Dive</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered for Mathematical Precision
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every layer in the ANVESH pipeline is built on reproducible formulations. <strong>Click any card below</strong> to expand the full architectural breakdown, formulas, and live metrics.
          </p>
        </div>

        {/* Aceternity Expandable Card Grid */}
        <ExpandableCards items={featureCards} />

      </div>
    </section>
  );
}
