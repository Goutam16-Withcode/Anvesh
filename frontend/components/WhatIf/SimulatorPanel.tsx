'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, RotateCcw, Cpu, Cloud, GitBranch, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SimulatorPanelProps {
  selectedSkills: string[];
  onToggleSkill: (skill: string) => void;
  onApplyBundle: (skills: string[]) => void;
  onReset: () => void;
}

export const SKILL_ONTOLOGY = [
  {
    category: 'AI & Systems Acceleration',
    icon: Cpu,
    skills: ['CUDA', 'TensorRT', 'Triton', 'vLLM', 'FlashAttention', 'C++'],
  },
  {
    category: 'Cloud Native & MLOps',
    icon: Cloud,
    skills: ['Kubernetes', 'Terraform', 'MLflow', 'Docker', 'AWS', 'Ray'],
  },
  {
    category: 'Distributed Systems & Scaling',
    icon: GitBranch,
    skills: ['Rust', 'Distributed Training', 'Kafka', 'InfiniBand', 'Go'],
  },
  {
    category: 'Full-Stack & Data Architecture',
    icon: Layers,
    skills: ['TypeScript', 'GraphQL', 'Apache Spark', 'Scala', 'LangChain'],
  },
];

export const CAREER_BUNDLES = [
  {
    name: 'AI Acceleration Architect',
    skills: ['CUDA', 'TensorRT', 'Triton'],
    badge: '+$52k/yr Lift',
    color: 'border-brand-300 bg-brand-50/50 hover:bg-brand-50 text-brand-900',
  },
  {
    name: 'Cloud-Native MLOps Pro',
    skills: ['Kubernetes', 'Terraform', 'MLflow'],
    badge: '+$38k/yr Lift',
    color: 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-900',
  },
  {
    name: 'Distributed Systems Lead',
    skills: ['Rust', 'Distributed Training', 'Ray'],
    badge: '+$48k/yr Lift',
    color: 'border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-900',
  },
];

export function SimulatorPanel({
  selectedSkills,
  onToggleSkill,
  onApplyBundle,
  onReset,
}: SimulatorPanelProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Interactive Prospective Skill Selector
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select candidate skills to inject into your 384-d vector profile and recalculate ranking matches in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedSkills.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="text-xs h-8 gap-1 text-slate-600"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset ({selectedSkills.length})
            </Button>
          )}
        </div>
      </div>

      {/* Quick 1-Click Accelerator Bundles */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-slate-400">
          One-Click Career Accelerator Bundles
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
          {CAREER_BUNDLES.map((b) => {
            const isAllSelected = b.skills.every((s) => selectedSkills.includes(s));
            return (
              <button
                key={b.name}
                type="button"
                onClick={() => onApplyBundle(b.skills)}
                className={`p-3 rounded-2xl border text-left transition-all ${b.color} ${
                  isAllSelected ? 'ring-2 ring-brand-500 shadow-sm' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{b.name}</span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {b.badge}
                  </Badge>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">
                  {b.skills.join(', ')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorized Skill Ontologies */}
      <div className="space-y-4">
        {SKILL_ONTOLOGY.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.category} className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Icon className="w-3.5 h-3.5 text-brand-600" />
                <span>{cat.category}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => onToggleSkill(skill)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm scale-[1.02]'
                          : 'bg-slate-50 text-slate-700 border-slate-200/90 hover:border-brand-300 hover:bg-brand-50/50'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      )}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
