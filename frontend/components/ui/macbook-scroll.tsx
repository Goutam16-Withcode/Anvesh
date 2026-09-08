'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  Database, 
  BarChart3, 
  ChevronRight,
  Command,
  Option,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Play,
  SkipForward,
  SkipBack
} from 'lucide-react';
import { Badge } from './badge';
import { useAuth } from '@/lib/auth-context';

export const MacbookScroll = ({
  src,
  showGradient = true,
  title,
  badge,
  children,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.4],
    [1.08, isMobile ? 1 : 1.15],
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [0.75, isMobile ? 1 : 1.15],
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 450]);
  const rotate = useTransform(scrollYProgress, [0.05, 0.15, 0.4], [-22, -10, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.4], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  return (
    <div
      ref={ref}
      className="relative min-h-[110vh] sm:min-h-[125vh] flex flex-col items-center py-6 sm:py-12 justify-start flex-shrink-0 [perspective:1000px] transform scale-[0.7] sm:scale-85 md:scale-95 lg:scale-100 transition-all"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-500/20 via-indigo-500/15 to-emerald-500/20 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Header Badge & Title */}
      <motion.div
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="text-center mb-8 sm:mb-12 space-y-3.5 max-w-3xl px-4 z-10"
      >
        {badge || (
          <Badge variant="brand" className="font-bold px-3 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-600 animate-pulse" />
            <span>3D Interactive Architecture</span>
          </Badge>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
          {title || (
            <span>
              Deterministic Intelligence. <br />
              <span className="gradient-text">Rendered on the Big Screen.</span>
            </span>
          )}
        </h2>
      </motion.div>

      {/* 3D Apple MacBook Lid with Display */}
      <Lid src={src} scaleX={scaleX} scaleY={scaleY} rotate={rotate} translate={translate}>
        {children}
      </Lid>

      {/* 3D Apple MacBook Chassis with Full Keypad Matrix & Trackpad */}
      <div className="h-[23rem] sm:h-[26rem] w-[34rem] sm:w-[44rem] md:w-[50rem] bg-gradient-to-b from-[#2b2e38] via-[#1f222b] to-[#15171e] rounded-b-[28px] sm:rounded-b-[36px] overflow-hidden relative font-sans -mt-10 sm:-mt-12 border-x-[3px] border-b-[4px] border-[#3f4556] shadow-[0_30px_90px_rgba(0,0,0,0.45)] flex flex-col justify-between p-3 sm:p-5 z-20">
        
        {/* Above Keyboard Hinge Bar */}
        <div className="h-6 w-full bg-[#12141a] rounded-t-lg flex items-center justify-between px-6 border-b border-[#252834]">
          <div className="w-20 h-1.5 bg-[#252834] rounded-full" />
          <div className="w-3 h-1.5 rounded-full bg-[#0a0b0e]" />
          <div className="w-20 h-1.5 bg-[#252834] rounded-full" />
        </div>

        {/* Keyboard & Speaker Grilles Deck */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 my-auto">
          {/* Left Speaker Grille */}
          <SpeakerGrid />

          {/* Full Apple Magic Keyboard Matrix */}
          <Keypad />

          {/* Right Speaker Grille */}
          <SpeakerGrid />
        </div>

        {/* Force Touch Trackpad & Front Lip Notch */}
        <div className="flex flex-col items-center mt-1">
          <div className="w-40 sm:w-56 md:w-64 h-12 sm:h-16 md:h-20 bg-gradient-to-b from-[#1c1e27] to-[#13151c] rounded-xl sm:rounded-2xl border border-[#303646] shadow-inner" />
          <div className="w-16 sm:w-20 h-1.5 bg-[#0d0e12] rounded-b-md border-t border-[#20232e]" />
        </div>

      </div>

      {/* Bottom Ambient Floor Glow */}
      <div className="w-[80%] h-8 bg-gradient-to-r from-transparent via-brand-500/25 to-transparent blur-xl -mt-4 pointer-events-none" />
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
  children,
}: {
  scaleX: any;
  scaleY: any;
  rotate: any;
  translate: any;
  src?: string;
  children?: React.ReactNode;
}) => {
  const { openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'discovery' | 'whatif' | 'vectors' | 'shap'>('discovery');
  const [simulatedSkills, setSimulatedSkills] = useState<string[]>(['CUDA', 'Kubernetes']);

  const toggleSkill = (skill: string) => {
    setSimulatedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="relative [perspective:1000px] z-10">
      <div
        style={{
          transform: 'perspective(1000px) rotateX(-20deg) translateZ(0px)',
          transformOrigin: 'bottom',
          transformStyle: 'preserve-3d',
        }}
        className="h-[14rem] sm:h-[18rem] md:h-[22rem] w-[34rem] sm:w-[44rem] md:w-[50rem] bg-[#1a1c24] p-1.5 sm:p-2.5 rounded-t-[24px] sm:rounded-t-[32px] border-[3px] border-[#363b4a] shadow-2xl"
      >
        <motion.div
          style={{
            scaleX: scaleX,
            scaleY: scaleY,
            rotateX: rotate,
            translateY: translate,
            transformStyle: 'preserve-3d',
            transformOrigin: 'bottom',
          }}
          className="h-[22rem] sm:h-[28rem] md:h-[32rem] w-[34rem] sm:w-[44rem] md:w-[50rem] bg-[#0b0f17] rounded-[20px] sm:rounded-[26px] p-2 sm:p-3 relative shadow-2xl border-[3px] border-[#2c313e] flex flex-col justify-between overflow-hidden"
        >
          {/* Top Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3.5 sm:h-4 w-28 sm:w-36 bg-[#090a0d] rounded-b-xl flex items-center justify-center gap-2 z-30 shadow-md border-b border-x border-[#1e222d]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1b1f2b] border border-slate-700 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-400" />
            </div>
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Screen Glass Reflection Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none z-20 rounded-[18px] sm:rounded-[24px]" />

          {/* Internal Retina Display Screen */}
          <div className="w-full h-full bg-[#0b0f17] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-[#1f293d] flex flex-col text-slate-100 font-sans relative z-10 shadow-inner">
            {children ? (
              children
            ) : src ? (
              <img src={src} alt="Screen Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                {/* Window Title Bar */}
                <div className="h-9 sm:h-10 bg-[#111622] border-b border-[#1f293d] px-3 sm:px-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] hover:opacity-80 transition-opacity cursor-pointer" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] hover:opacity-80 transition-opacity cursor-pointer" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] hover:opacity-80 transition-opacity cursor-pointer" />
                    </div>
                    <div className="hidden md:flex items-center gap-1.5 ml-3 pl-3 border-l border-slate-800 text-[11px] text-slate-400">
                      <Compass className="w-3.5 h-3.5 text-brand-400" />
                      <span className="font-semibold text-slate-200">ANVESH Discovery Console</span>
                      <span className="text-slate-500 font-mono text-[10px]">v2.4.0</span>
                    </div>
                  </div>

                  {/* Simulated Cluster Telemetry Pill */}
                  <div className="flex items-center gap-2 bg-[#0b0f17] border border-[#1f293d] px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono text-slate-300 shadow-inner">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-emerald-400 font-bold">104,250</span>
                    <span className="text-slate-400 hidden sm:inline">vectors live</span>
                    <span className="text-slate-600 hidden sm:inline">|</span>
                    <span className="text-brand-300 font-bold hidden sm:inline">1.2ms latency</span>
                  </div>

                  {/* Quick Access Action Button */}
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="px-2.5 py-1 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-all shadow-sm shadow-brand-500/20"
                  >
                    <span>Explore Live</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Interactive Screen Tabs */}
                <div className="bg-[#0e131f] border-b border-[#1f293d] px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shrink-0">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => setActiveTab('discovery')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeTab === 'discovery'
                          ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <Compass className="w-3 h-3" />
                      <span>Live Discovery</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('whatif')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeTab === 'whatif'
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>What-If Sandbox</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('vectors')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeTab === 'vectors'
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <Database className="w-3 h-3" />
                      <span>HNSW Vectors</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('shap')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeTab === 'shap'
                          ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <BarChart3 className="w-3 h-3" />
                      <span>TreeSHAP</span>
                    </button>
                  </div>

                  <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-brand-500" />
                    <span>LightGBM LambdaMART</span>
                  </div>
                </div>

                {/* Main Screen Body View */}
                <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-[#0b0f17] text-slate-200 space-y-3">
                  {activeTab === 'discovery' && (
                    <div className="space-y-2.5">
                      {/* 3 Metric Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2.5 bg-[#111622] rounded-xl border border-[#1f293d]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Semantic Vector</span>
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold">0.942 cos(&theta;)</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-[94%]" />
                          </div>
                        </div>

                        <div className="p-2.5 bg-[#111622] rounded-xl border border-[#1f293d]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Skill Overlap</span>
                            <span className="px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 font-mono text-[9px] font-bold">96.4% Matched</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-500 rounded-full w-[96%]" />
                          </div>
                        </div>

                        <div className="p-2.5 bg-[#111622] rounded-xl border border-[#1f293d]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Projected Lift</span>
                            <span className="text-xs font-bold text-cyan-400 font-mono">+$32,000</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full w-[88%]" />
                          </div>
                        </div>
                      </div>

                      {/* Top Recommendation Role Card 1 */}
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#111622] via-[#131a29] to-[#111622] border border-[#1f293d] shadow-md space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1f293d]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-extrabold text-white text-xs shadow-md">
                              NV
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-slate-100 text-xs sm:text-sm">Lead AI Infrastructure Engineer</h4>
                                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[9px] border border-emerald-500/30">
                                  94.8% Match
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400">
                                NVIDIA AI Systems &bull; Santa Clara, CA &bull; $195,000 - $265,000 USD
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => openAuthModal('signup')}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-colors self-start sm:self-auto shrink-0 shadow-sm shadow-emerald-600/30"
                          >
                            Explore Role
                          </button>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-2 text-[10px]">
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-slate-400 text-[9px]">Required:</span>
                            {['PyTorch', 'Distributed Training', 'CUDA C++', 'Kubernetes'].map((s) => (
                              <span key={s} className="px-2 py-0.2 rounded bg-[#1a2233] text-brand-300 border border-[#2b3752] font-mono text-[9px]">
                                {s}
                              </span>
                            ))}
                          </div>
                          <span className="text-slate-400 font-mono text-[9px]">Rank #1 &bull; 0.942 Cosine</span>
                        </div>
                      </div>

                      {/* Recommendation Role Card 2 */}
                      <div className="p-2.5 rounded-xl bg-[#111622]/80 border border-[#1f293d]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-indigo-900/60 border border-indigo-700/40 flex items-center justify-center font-bold text-indigo-300 text-[10px]">
                            AN
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-200 text-xs">AI Alignment Lead</span>
                              <span className="text-[8px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 font-mono font-bold">92.4%</span>
                            </div>
                            <span className="text-[9px] text-slate-400">Anthropic &bull; $210,000 - $280,000 USD</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold self-end sm:self-center">Rank #2 &bull; +$24k Lift</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'whatif' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">Interactive Counterfactual Simulation</span>
                        <span className="text-xs text-emerald-400 font-mono font-bold">+34 Roles Unlocked</span>
                      </div>

                      <div className="p-3 rounded-xl bg-[#111622] border border-[#1f293d] space-y-2">
                        <span className="text-[10px] text-slate-400 block">Click skills to simulate rank uplift:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {['CUDA', 'Kubernetes', 'Rust', 'TensorRT', 'LangChain', 'vLLM', 'MLflow'].map((skill) => {
                            const isSelected = simulatedSkills.includes(skill);
                            return (
                              <button
                                key={skill}
                                onClick={() => toggleSkill(skill)}
                                className={`px-2.5 py-0.8 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1 border ${
                                  isSelected
                                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                                    : 'bg-[#1a2233] text-slate-300 border-[#2b3752] hover:bg-[#222d44]'
                                }`}
                              >
                                {isSelected ? <CheckCircle2 className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                                <span>{skill}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 text-center">
                        <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                          <span className="text-[9px] uppercase font-bold text-emerald-400 block">Projected Salary Delta</span>
                          <span className="text-base sm:text-lg font-extrabold text-emerald-300 font-mono">+$28,400 / yr</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/50">
                          <span className="text-[9px] uppercase font-bold text-indigo-400 block">Candidate Rank Boost</span>
                          <span className="text-base sm:text-lg font-extrabold text-indigo-300 font-mono">Top 4.2%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'vectors' && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-[#111622] rounded-xl border border-[#1f293d] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-indigo-400" />
                          <div>
                            <span className="text-xs font-bold text-slate-200 block">Qdrant HNSW Vector Cloud</span>
                            <span className="text-[9px] text-slate-400 font-mono">1536-dim Cosine Distance (M=16, ef=100)</span>
                          </div>
                        </div>
                        <Badge variant="brand" className="text-[9px]">Latency: 1.18ms</Badge>
                      </div>

                      <div className="p-3 bg-[#0e131f] rounded-xl border border-[#1f293d] font-mono text-[10px] space-y-1.5 text-slate-300">
                        <div className="flex justify-between py-1 border-b border-[#1f293d]">
                          <span className="text-slate-400">[0] Candidate Embedding:</span>
                          <span className="text-indigo-400">[0.084, -0.412, 0.912, ... 1536 dim]</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1f293d]">
                          <span className="text-slate-400">[1] NVIDIA AI Platform Engineer:</span>
                          <span className="text-emerald-400 font-bold">Score: 0.942 (Nearest Neighbor)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-400">[2] Anthropic Alignment Infra:</span>
                          <span className="text-emerald-400 font-bold">Score: 0.918 (Top 2 Cluster)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'shap' && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-[#111622] rounded-xl border border-[#1f293d] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-amber-400" />
                          <div>
                            <span className="text-xs font-bold text-slate-200 block">TreeSHAP Feature Attribution</span>
                            <span className="text-[9px] text-slate-400 font-mono">LightGBM Ranking Model Explanation</span>
                          </div>
                        </div>
                        <span className="text-xs text-emerald-400 font-mono font-bold">&phi; = +0.482</span>
                      </div>

                      <div className="space-y-1.5 text-[10px]">
                        <div className="p-2 bg-[#111622] rounded-lg border border-[#1f293d] flex items-center justify-between">
                          <span className="text-slate-300 font-medium">Distributed Systems Experience</span>
                          <span className="text-emerald-400 font-mono font-bold">+0.24 SHAP</span>
                        </div>
                        <div className="p-2 bg-[#111622] rounded-lg border border-[#1f293d] flex items-center justify-between">
                          <span className="text-slate-300 font-medium">CUDA / TensorRT Proficiency</span>
                          <span className="text-emerald-400 font-mono font-bold">+0.18 SHAP</span>
                        </div>
                        <div className="p-2 bg-[#111622] rounded-lg border border-[#1f293d] flex items-center justify-between">
                          <span className="text-slate-300 font-medium">Location Mismatch Penalty</span>
                          <span className="text-rose-400 font-mono font-bold">-0.02 SHAP</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Screen Bottom Telemetry Bar */}
                <div className="h-6 bg-[#111622] border-t border-[#1f293d] px-3.5 flex items-center justify-between text-[9px] font-mono text-slate-500 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Deterministic Rank Engine Active</span>
                  </div>
                  <span>AES-256 GCM Encrypted</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* =========================================================================
   KEYPAD MATRIX WITH INDIVIDUAL KEYCAPS & APPLE MAGIC KEYBOARD ROWS
   ========================================================================= */
export const Keypad = () => {
  return (
    <div className="flex-1 bg-[#090a0e] rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-[#232733] shadow-inner flex flex-col gap-1 sm:gap-1.5">
      {/* Row 1: Function Keys */}
      <Row>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><span className="text-[7px]">esc</span></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><Sun className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><Sun className="w-2.5 h-2.5 opacity-80" /></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><span className="text-[7px]">F3</span></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><span className="text-[7px]">F4</span></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><span className="text-[7px]">F5</span></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><span className="text-[7px]">F6</span></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><SkipBack className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><Play className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><SkipForward className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><VolumeX className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><Volume2 className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><Volume2 className="w-2.5 h-2.5 opacity-90" /></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem] bg-[#14161f] border-[#2b3040]"><span className="text-[8px] text-brand-400 font-bold">⌽</span></Key>
      </Row>

      {/* Row 2: Numbers */}
      <Row>
        <Key><span className="text-[6px] block -mb-1">~</span><span>`</span></Key>
        <Key><span className="text-[6px] block -mb-1">!</span><span>1</span></Key>
        <Key><span className="text-[6px] block -mb-1">@</span><span>2</span></Key>
        <Key><span className="text-[6px] block -mb-1">#</span><span>3</span></Key>
        <Key><span className="text-[6px] block -mb-1">$</span><span>4</span></Key>
        <Key><span className="text-[6px] block -mb-1">%</span><span>5</span></Key>
        <Key><span className="text-[6px] block -mb-1">^</span><span>6</span></Key>
        <Key><span className="text-[6px] block -mb-1">&</span><span>7</span></Key>
        <Key><span className="text-[6px] block -mb-1">*</span><span>8</span></Key>
        <Key><span className="text-[6px] block -mb-1">(</span><span>9</span></Key>
        <Key><span className="text-[6px] block -mb-1">)</span><span>0</span></Key>
        <Key><span className="text-[6px] block -mb-1">_</span><span>-</span></Key>
        <Key><span className="text-[6px] block -mb-1">+</span><span>=</span></Key>
        <Key className="w-[2.4rem] sm:w-[3.4rem]"><span className="text-[7px] sm:text-[8px]">delete</span></Key>
      </Row>

      {/* Row 3: QWERTY */}
      <Row>
        <Key className="w-[2.2rem] sm:w-[3.2rem]"><span className="text-[7px] sm:text-[8px]">tab</span></Key>
        <Key>Q</Key>
        <Key>W</Key>
        <Key>E</Key>
        <Key>R</Key>
        <Key>T</Key>
        <Key>Y</Key>
        <Key>U</Key>
        <Key>I</Key>
        <Key>O</Key>
        <Key>P</Key>
        <Key><span className="text-[6px] block -mb-1">{'{'}</span><span>[</span></Key>
        <Key><span className="text-[6px] block -mb-1">{'}'}</span><span>]</span></Key>
        <Key className="w-[1.8rem] sm:w-[2.4rem]"><span className="text-[6px] block -mb-1">|</span><span>\</span></Key>
      </Row>

      {/* Row 4: ASDF */}
      <Row>
        <Key className="w-[2.6rem] sm:w-[3.8rem]"><span className="text-[7px] sm:text-[8px]">caps lock</span></Key>
        <Key>A</Key>
        <Key>S</Key>
        <Key>D</Key>
        <Key>F</Key>
        <Key>G</Key>
        <Key>H</Key>
        <Key>J</Key>
        <Key>K</Key>
        <Key>L</Key>
        <Key><span className="text-[6px] block -mb-1">:</span><span>;</span></Key>
        <Key><span className="text-[6px] block -mb-1">"</span><span>'</span></Key>
        <Key className="w-[2.6rem] sm:w-[3.8rem] bg-[#1a1d27] border-[#2b3040]"><CornerDownLeft className="w-2.5 h-2.5" /></Key>
      </Row>

      {/* Row 5: ZXCV */}
      <Row>
        <Key className="w-[3.2rem] sm:w-[4.8rem]"><span className="text-[7px] sm:text-[8px]">shift</span></Key>
        <Key>Z</Key>
        <Key>X</Key>
        <Key>C</Key>
        <Key>V</Key>
        <Key>B</Key>
        <Key>N</Key>
        <Key>M</Key>
        <Key><span className="text-[6px] block -mb-1">&lt;</span><span>,</span></Key>
        <Key><span className="text-[6px] block -mb-1">&gt;</span><span>.</span></Key>
        <Key><span className="text-[6px] block -mb-1">?</span><span>/</span></Key>
        <Key className="w-[3.2rem] sm:w-[4.8rem]"><span className="text-[7px] sm:text-[8px]">shift</span></Key>
      </Row>

      {/* Row 6: Spacebar & Modifiers */}
      <Row>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><span className="text-[7px]">fn</span></Key>
        <Key className="w-[1.6rem] sm:w-[2.2rem]"><span className="text-[7px]">control</span></Key>
        <Key className="w-[1.8rem] sm:w-[2.6rem]"><Option className="w-2.5 h-2.5" /></Key>
        <Key className="w-[2.2rem] sm:w-[3.2rem]"><Command className="w-2.5 h-2.5" /></Key>
        <Key className="flex-1 min-w-[7rem] sm:min-w-[12rem] bg-[#14161f]" />
        <Key className="w-[2.2rem] sm:w-[3.2rem]"><Command className="w-2.5 h-2.5" /></Key>
        <Key className="w-[1.8rem] sm:w-[2.6rem]"><Option className="w-2.5 h-2.5" /></Key>
        
        {/* Arrow Keys Cluster */}
        <div className="flex gap-0.5 items-end">
          <Key className="w-[1.4rem] sm:w-[1.8rem] h-[1.1rem] sm:h-[1.4rem]"><ArrowLeft className="w-2 h-2" /></Key>
          <div className="flex flex-col gap-0.5">
            <Key className="w-[1.4rem] sm:w-[1.8rem] h-[0.55rem] sm:h-[0.7rem]"><ArrowUp className="w-1.5 h-1.5" /></Key>
            <Key className="w-[1.4rem] sm:w-[1.8rem] h-[0.55rem] sm:h-[0.7rem]"><ArrowDown className="w-1.5 h-1.5" /></Key>
          </div>
          <Key className="w-[1.4rem] sm:w-[1.8rem] h-[1.1rem] sm:h-[1.4rem]"><ArrowRight className="w-2 h-2" /></Key>
        </div>
      </Row>
    </div>
  );
};

export const Row = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-1 sm:gap-1.5 items-center justify-between w-full">{children}</div>;
};

export const Key = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'h-[1.6rem] sm:h-[2.1rem] md:h-[2.4rem] min-w-[1.4rem] sm:min-w-[1.9rem] md:min-w-[2.2rem] bg-[#11131a] hover:bg-[#181b25] text-slate-300 font-mono text-[8px] sm:text-[9px] md:text-[10px] rounded-[3px] sm:rounded-[4px] border border-[#232734] shadow-[0_1px_2px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col items-center justify-center transition-colors select-none shrink-0 px-1',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div className="hidden sm:grid grid-cols-4 gap-1 w-6 sm:w-10 h-28 sm:h-36 opacity-30 px-0.5">
      {Array.from({ length: 48 }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-slate-950" />
      ))}
    </div>
  );
};
