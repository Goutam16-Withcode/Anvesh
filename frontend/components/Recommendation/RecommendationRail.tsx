'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Filter, ChevronRight, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job, api } from '@/lib/api';
import { JobCard } from '@/components/JobCard';
import Link from 'next/link';

interface RecommendationRailProps {
  initialRecommendations?: Job[];
  onSelectJob?: (job: Job) => void;
  title?: string;
  subtitle?: string;
}

export function RecommendationRail({
  initialRecommendations,
  onSelectJob,
  title = 'AI-Curated Job Recommendations',
  subtitle = 'Multi-stage candidate ranking: HNSW retrieval (384-d) → LightGBM LambdaMART ranking → MMR diversity diversification.',
}: RecommendationRailProps) {
  const [recommendations, setRecommendations] = useState<Job[]>(initialRecommendations || []);
  const [activeMode, setActiveMode] = useState<string>('ALL');
  const [loading, setLoading] = useState(!initialRecommendations);

  useEffect(() => {
    if (!initialRecommendations) {
      loadRecommendations(activeMode);
    }
  }, [activeMode]);

  const loadRecommendations = async (mode: string) => {
    setLoading(true);
    try {
      const res = await api.getRecommendations(mode === 'ALL' ? undefined : mode);
      setRecommendations(res.recommendations || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = recommendations.filter((j) => {
    if (activeMode === 'ALL') return true;
    return j.work_mode === activeMode;
  });

  return (
    <div className="space-y-6">
      {/* Header & Work Mode Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-600" />
            {title}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{subtitle}</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/90 shadow-2xs shrink-0 self-start sm:self-center">
          {['ALL', 'REMOTE', 'HYBRID', 'ON_SITE'].map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeMode === mode
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {mode === 'ALL' ? 'All Roles' : mode.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onSelectJob={onSelectJob}
          />
        ))}
      </div>
    </div>
  );
}
