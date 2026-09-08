import React from 'react';
import { Upload, GitBranch, Cpu, Rocket } from 'lucide-react';
import { Badge } from './ui/badge';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Ingest & Deterministic Parsing',
      description:
        'Upload your multi-page PDF or DOCX resume. ANVESH deterministically extracts verified timeline experience, projects, and domain proficiencies without LLM hallucinations.',
      icon: <Upload className="w-6 h-6 text-brand-600" />,
    },
    {
      step: '02',
      title: 'Canonical Normalization & Vectors',
      description:
        'Your skills are mapped to canonical ontology nodes in skills.json and encoded into 384-dimensional dense vectors via sentence-transformers.',
      icon: <GitBranch className="w-6 h-6 text-indigo-600" />,
    },
    {
      step: '03',
      title: 'Hybrid Retrieval & LTR Ranking',
      description:
        'Qdrant retrieves 500 candidate jobs via HNSW cosine similarity. LightGBM LambdaMART evaluates pairwise features, and MMR diversifies the final top recommendations.',
      icon: <Cpu className="w-6 h-6 text-emerald-600" />,
    },
    {
      step: '04',
      title: 'Simulate What-If & Accelerate',
      description:
        'Discover tailored career roles, examine transparent match score breakdowns, and simulate hypothetical skill acquisitions to maximize salary and market leverage.',
      icon: <Rocket className="w-6 h-6 text-brand-600" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-slate-50/60 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="brand" className="font-bold">
            Step-By-Step Workflow
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How ANVESH Delivers Deterministic Precision
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A transparent four-stage pipeline engineered to replace brittle ATS filters with mathematically grounded recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-subtle hover:shadow-card hover:border-brand-300 transition-all flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-slate-300 group-hover:text-brand-600 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-brand-600 h-full w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
