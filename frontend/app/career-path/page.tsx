'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Route,
  Compass,
  GitBranch,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Target,
  Briefcase,
  Layers,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CareerPathTree } from '@/components/CareerGraph';
import { api, CareerTrack, MOCK_CAREER_TRACKS } from '@/lib/api';
import { formatNumber, formatSalary } from '@/lib/utils';

export default function CareerPathPage() {
  const [tracks, setTracks] = useState<CareerTrack[]>(MOCK_CAREER_TRACKS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    setLoading(true);
    try {
      const data = await api.getCareerTracks();
      if (data.tracks && data.tracks.length > 0) {
        setTracks(data.tracks);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10">
        {/* Header Hero Banner */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white via-indigo-50/30 to-brand-50/40 border border-slate-200/80 shadow-subtle overflow-hidden">
          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-semibold">
                <Route className="w-3.5 h-3.5" />
                Shortest Mathematical Career Graph Trajectory
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Interactive Career Path Visualization
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Explore multi-stage progression trajectories from your current baseline role through bridge engineering positions to principal and leadership destinations.
              </p>
            </div>

            {/* Quick KPI Stat Widget */}
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-subtle shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Target Range</span>
                <div className="text-2xl font-mono font-extrabold text-indigo-600">
                  $320k - $450k+
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold font-mono">
                  Principal / Staff Fellow Destination
                </span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200 font-bold text-sm">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Career Path Tree & Milestone Inspector */}
        <CareerPathTree tracks={tracks} />

        {/* Transition Strategy Insights Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200 font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Shortest Distance Routing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our graph engine determines the minimum skill delta transition path to bridge you into top-tier senior roles with the lowest acquisition friction.
            </p>
            <Link href="/skill-gap" className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 pt-1">
              <span>View Vector Skill Gap</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Empirical Salary Uplift</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every milestone unlocked adds quantifiable market value, verified through thousands of live senior compensation benchmarks across tier-1 AI firms.
            </p>
            <Link href="/what-if" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-1">
              <span>Simulate Salary Lift</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200 font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Direct Catalog Bridge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Browse live open positions corresponding precisely to each stage of your chosen career roadmap with 384-d semantic vector match scores.
            </p>
            <Link href="/jobs" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-1">
              <span>Explore Live Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
