'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Briefcase,
  DollarSign,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Bookmark,
  Share2,
  X,
  Filter,
  ArrowUpDown,
  Zap,
  Cpu,
  Layers,
  Clock,
  ShieldCheck,
  ChevronRight,
  Info,
  Calendar,
  Globe,
  Building,
  RotateCcw,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { api, Job, MOCK_JOBS_CATALOG } from '@/lib/api';
import { formatNumber } from '@/lib/utils';

const CANONICAL_FILTER_SKILLS = [
  'Python',
  'PyTorch',
  'FastAPI',
  'Vector Databases',
  'Kubernetes',
  'Docker',
  'CUDA',
  'Transformers',
  'LightGBM',
  'AWS',
  'TypeScript',
  'React',
  'Rust',
  'MLflow',
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS_CATALOG);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [workMode, setWorkMode] = useState<string>('ALL');
  const [experienceLevel, setExperienceLevel] = useState<string>('ALL');
  const [minSalaryFilter, setMinSalaryFilter] = useState<number>(0);
  const [matchScoreFilter, setMatchScoreFilter] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'match_score' | 'salary_desc' | 'semantic' | 'freshness'>('match_score');
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      const res = await api.getRecommendations();
      if (res.recommendations && res.recommendations.length > 0) {
        setJobs(res.recommendations);
      }
    } catch (e) {
      console.warn('Using local catalog fallback', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleToggleSave = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setWorkMode('ALL');
    setExperienceLevel('ALL');
    setMinSalaryFilter(0);
    setMatchScoreFilter(0);
    setSelectedSkills([]);
    setSortBy('match_score');
  };

  // Filtered and Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        // Query search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = job.title.toLowerCase().includes(q);
          const matchCompany = job.company.name.toLowerCase().includes(q);
          const matchLocation = job.company.location.toLowerCase().includes(q);
          const matchSkills = [...job.required_skills, ...job.preferred_skills].some((s) =>
            s.toLowerCase().includes(q)
          );
          const matchDesc = job.description.toLowerCase().includes(q);
          if (!matchTitle && !matchCompany && !matchLocation && !matchSkills && !matchDesc) {
            return false;
          }
        }

        // Work mode filter
        if (workMode !== 'ALL' && job.work_mode !== workMode) {
          return false;
        }

        // Experience Level filter
        if (experienceLevel !== 'ALL' && job.experience_level !== experienceLevel) {
          return false;
        }

        // Min Salary filter
        if (minSalaryFilter > 0 && job.min_salary < minSalaryFilter) {
          return false;
        }

        // Match Score filter
        if (matchScoreFilter > 0 && job.match_score < matchScoreFilter) {
          return false;
        }

        // Skills filter
        if (selectedSkills.length > 0) {
          const allJobSkills = [...job.required_skills, ...job.preferred_skills];
          const hasAllSelected = selectedSkills.every((s) =>
            allJobSkills.some((js) => js.toLowerCase() === s.toLowerCase())
          );
          if (!hasAllSelected) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match_score') {
          return b.match_score - a.match_score;
        }
        if (sortBy === 'salary_desc') {
          return b.max_salary - a.max_salary;
        }
        if (sortBy === 'semantic') {
          return b.breakdown.semantic_similarity - a.breakdown.semantic_similarity;
        }
        if (sortBy === 'freshness') {
          return a.breakdown.freshness_days - b.breakdown.freshness_days;
        }
        return 0;
      });
  }, [jobs, searchQuery, workMode, experienceLevel, minSalaryFilter, matchScoreFilter, selectedSkills, sortBy]);

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (workMode !== 'ALL' ? 1 : 0) +
    (experienceLevel !== 'ALL' ? 1 : 0) +
    (minSalaryFilter > 0 ? 1 : 0) +
    (matchScoreFilter > 0 ? 1 : 0) +
    selectedSkills.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      {/* Hero Header with Background Gradient */}
      <section className="relative pt-28 pb-12 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-dot-slate opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
                <span>Deterministic Multi-Stage Catalog &bull; 384-D Qdrant HNSW</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Global Career Discovery & <span className="gradient-text">Verified Openings</span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Explore 104,250+ enterprise positions indexed directly from company careers APIs. Every job is scored with verified semantic alignment, required skill overlap, and freshness decay.
              </p>
            </div>

            {/* Quick Live Stats Pill Card */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-subtle min-w-[130px]">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Catalog Pool</div>
                <div className="text-xl font-black text-slate-900 font-mono mt-0.5">104,250</div>
                <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Active HNSW vectors</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-subtle min-w-[130px]">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Match</div>
                <div className="text-xl font-black text-brand-600 font-mono mt-0.5">91.4%</div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">LightGBM Ranker</div>
              </div>
            </div>
          </div>

          {/* Omnibar Search Input */}
          <div className="p-2 rounded-2xl bg-white border border-slate-300 shadow-xl shadow-slate-200/60 flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role title, company (NVIDIA, Anthropic, Stripe), or skill (PyTorch, CUDA)..."
                className="w-full pl-11 pr-4 py-3 text-sm text-slate-900 bg-transparent rounded-xl focus:outline-none placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className={`gap-2 text-xs font-bold w-full sm:w-auto ${
                  activeFilterCount > 0 ? 'border-brand-500 text-brand-600 bg-brand-50/50' : ''
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>

              <Link href="/what-if" className="w-full sm:w-auto">
                <Button variant="noise" size="sm" className="gap-2 text-xs font-bold w-full sm:w-auto">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                  <span>What-If Sandbox</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Skill Tags Filter Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-slate-400 font-bold text-[11px] shrink-0 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Zap className="w-3 h-3 text-brand-500" />
              Quick Skills:
            </span>
            {CANONICAL_FILTER_SKILLS.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => handleToggleSkill(skill)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {skill}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Main Content Area: Sidebar Filters + Results Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-subtle space-y-6 sticky top-24">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">Faceted Filters</h3>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Work Mode */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Work Mode
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'All Modes', value: 'ALL' },
                    { label: 'Remote', value: 'REMOTE' },
                    { label: 'Hybrid', value: 'HYBRID' },
                    { label: 'On-Site', value: 'ON_SITE' },
                  ].map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setWorkMode(mode.value)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                        workMode === mode.value
                          ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Tier */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Experience Tier
                </label>
                <div className="space-y-1.5">
                  {[
                    { label: 'All Experience Levels', value: 'ALL' },
                    { label: 'Mid Level (3-6 yrs)', value: 'MID' },
                    { label: 'Senior Level (4-9 yrs)', value: 'SENIOR' },
                    { label: 'Lead / Principal (7+ yrs)', value: 'LEAD' },
                  ].map((exp) => (
                    <button
                      key={exp.value}
                      onClick={() => setExperienceLevel(exp.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                        experienceLevel === exp.value
                          ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{exp.label}</span>
                      {experienceLevel === exp.value && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimum Base Salary Filter */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <label className="text-slate-700 uppercase tracking-wider">Salary Floor</label>
                  <span className="text-brand-600 font-mono font-bold">
                    {minSalaryFilter === 0 ? 'Any Salary' : `$${(minSalaryFilter / 1000).toFixed(0)}k+`}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Any', value: 0 },
                    { label: '$180k+', value: 180000 },
                    { label: '$200k+', value: 200000 },
                    { label: '$220k+', value: 220000 },
                  ].map((sal) => (
                    <button
                      key={sal.value}
                      onClick={() => setMinSalaryFilter(sal.value)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center font-mono ${
                        minSalaryFilter === sal.value
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {sal.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Match Compatibility Threshold */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Candidate Fit Threshold
                </label>
                <div className="space-y-1.5">
                  {[
                    { label: 'All Postings (Unrestricted)', value: 0 },
                    { label: '>85% High Match', value: 0.85 },
                    { label: '>90% Elite Match Only', value: 0.90 },
                  ].map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setMatchScoreFilter(m.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                        matchScoreFilter === m.value
                          ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{m.label}</span>
                      {matchScoreFilter === m.value && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* What-If CTA Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Simulate Skill Uplift</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Want to know what adding Kubernetes or CUDA would do to your match score?
                </p>
                <Link href="/what-if" className="block pt-1">
                  <Button size="sm" variant="noise" className="w-full text-xs font-bold">
                    Launch Simulator &rarr;
                  </Button>
                </Link>
              </div>

            </div>
          </aside>

          {/* Results Grid Column */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Control Bar: Result Count + Sorting */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900">
                  {filteredJobs.length} Position{filteredJobs.length === 1 ? '' : 's'} Found
                </span>
                <span className="text-xs text-slate-400">&bull; Filtered from 104k catalog</span>
              </div>

              {/* Sort By Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value="match_score">Match Compatibility (LTR Score)</option>
                  <option value="salary_desc">Compensation (High to Low)</option>
                  <option value="semantic">Vector Similarity (cos &theta;)</option>
                  <option value="freshness">Posting Freshness (Decay Score)</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-subtle space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">No positions match your specific criteria</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try removing some of your skill filters or adjusting your salary floor to see more opportunities.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleClearFilters} className="text-xs font-bold">
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id);
                return (
                  <div
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job);
                      setIsModalOpen(true);
                    }}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-subtle hover:shadow-card hover:border-brand-300 transition-all cursor-pointer group space-y-4 relative"
                  >
                    {/* Top Row: Company & Title + Match Fit */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                          {job.company.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-brand-600 transition-colors">
                              {job.title}
                            </h3>
                            <Badge variant="emerald" className="font-bold text-[11px] font-mono">
                              {(job.match_score * 100).toFixed(1)}% Fit
                            </Badge>
                            {job.company.verified && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                                <ShieldCheck className="w-3 h-3" />
                                Verified API
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 font-medium">
                            <span className="font-bold text-slate-800">{job.company.name}</span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {job.company.location}
                            </span>
                            <span>&bull;</span>
                            <span className="font-mono font-bold text-emerald-700">
                              ${formatNumber(job.min_salary)} - ${formatNumber(job.max_salary)} {job.currency}
                            </span>
                            <span>&bull;</span>
                            <Badge variant="slate" className="text-[10px] font-bold">
                              {job.work_mode}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => handleToggleSave(job.id, e)}
                        className={`p-2 rounded-xl border transition-all ${
                          isSaved
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                        title={isSaved ? 'Saved to Bookmarks' : 'Save Position'}
                      >
                        <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Job Description Excerpt */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {job.description}
                    </p>

                    {/* Mathematical Ranking Breakdown Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vector Similarity</span>
                        <span className="font-extrabold text-slate-800 font-mono">{job.breakdown.semantic_similarity} cos(&theta;)</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Required Match</span>
                        <span className="font-extrabold text-emerald-600 font-mono">{(job.breakdown.required_skill_match * 100).toFixed(0)}%</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Experience Delta</span>
                        <span className="font-extrabold text-brand-600 font-mono">{job.breakdown.experience_fit}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Freshness</span>
                        <span className="font-extrabold text-slate-700 font-mono">{job.breakdown.freshness_days}d ago</span>
                      </div>
                    </div>

                    {/* Bottom Action Strip: Skill Badges + Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {job.matched_skills.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            {s}
                          </span>
                        ))}
                        {job.missing_skills.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-medium"
                          >
                            + {s}
                          </span>
                        ))}
                        {job.missing_skills.length > 2 && (
                          <span className="text-[10px] text-slate-400 font-bold">
                            +{job.missing_skills.length - 2} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs font-bold gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJob(job);
                            setIsModalOpen(true);
                          }}
                        >
                          <span>Deep-Dive</span>
                          <ChevronRight className="w-3 h-3" />
                        </Button>

                        <a
                          href={job.apply_url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button size="sm" variant="noise" className="text-xs font-bold gap-1.5">
                            <span>Apply</span>
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </a>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </main>

      {/* Deep-Dive Job Details Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 sm:p-8 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-4 pr-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shrink-0">
                  {selectedJob.company.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{selectedJob.title}</h2>
                    <Badge variant="emerald" className="font-bold text-xs font-mono">
                      {(selectedJob.match_score * 100).toFixed(1)}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">
                    {selectedJob.company.name} &bull; {selectedJob.company.location} &bull; {selectedJob.work_mode}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-mono font-bold text-sm border border-emerald-200">
                  ${formatNumber(selectedJob.min_salary)} - ${formatNumber(selectedJob.max_salary)} {selectedJob.currency} / year
                </span>
                <Badge variant="brand">{selectedJob.experience_level} Tier ({selectedJob.experience_years_range[0]}-{selectedJob.experience_years_range[1]} yrs exp)</Badge>
                <Badge variant="slate">{selectedJob.category}</Badge>
              </div>
            </div>

            {/* Mathematical Alignment Radar Pill */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-brand-600" />
                  Mathematical Ranking Vector Breakdown
                </span>
                <span className="font-mono text-slate-400">Rank #{selectedJob.rank || 1} of 500 Pool</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold">Cosine Similarity</span>
                  <span className="font-extrabold text-slate-900 font-mono">{selectedJob.breakdown.semantic_similarity} cos(&theta;)</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold">Required Skills Overlap</span>
                  <span className="font-extrabold text-emerald-600 font-mono">{(selectedJob.breakdown.required_skill_match * 100).toFixed(0)}%</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold">Preferred Skills Overlap</span>
                  <span className="font-extrabold text-brand-600 font-mono">{(selectedJob.breakdown.preferred_skill_match * 100).toFixed(0)}%</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold">Decay Half-Life Score</span>
                  <span className="font-extrabold text-slate-700 font-mono">{selectedJob.breakdown.decay_score || 0.95}</span>
                </div>
              </div>
            </div>

            {/* Role Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Position Summary</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedJob.description}</p>
            </div>

            {/* Key Responsibilities */}
            {selectedJob.responsibilities && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Engineering Responsibilities</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skill Alignment Comparison Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Your Verified Skills Matched
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.matched_skills.map((s) => (
                    <Badge key={s} variant="emerald" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
                <span className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Recommended Upskill Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.missing_skills.map((s) => (
                    <Badge key={s} variant="brand" className="text-xs">
                      + {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* What-If Simulation Bridge Banner */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-emerald-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulate this Career Move</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Simulate acquiring {selectedJob.missing_skills.slice(0, 2).join(' and ')} in the What-If Engine.
                </p>
              </div>

              <Link href="/what-if">
                <Button size="sm" variant="noise" className="text-xs font-bold shrink-0">
                  Launch Simulator
                </Button>
              </Link>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleToggleSave(selectedJob.id, e)}
                  className="gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{savedJobIds.includes(selectedJob.id) ? 'Saved' : 'Save'}</span>
                </Button>

                <a href={selectedJob.apply_url} target="_blank" rel="noreferrer">
                  <Button variant="noise" size="sm" className="gap-1.5 font-bold">
                    <span>Apply on Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
