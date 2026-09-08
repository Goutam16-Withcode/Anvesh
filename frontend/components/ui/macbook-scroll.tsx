'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
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
  Volume2,
  VolumeX,
  Play,
  SkipForward,
  SkipBack,
  Search,
  Mic,
  Moon
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking with smooth spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

  // Smooth lid opening: from angled open (14deg) to upright (0deg)
  const rotateLid = useTransform(smoothProgress, [0.15, 0.5, 0.85], [14, 0, -3]);
  const scale = useTransform(smoothProgress, [0.15, 0.5, 0.85], [0.94, 1, 0.96]);

  // Interactive mouse 3D parallax tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 140, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 140, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 4);
      mouseY.set(y * -3);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-8 sm:py-14 md:py-20 flex flex-col items-center justify-center overflow-visible select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-tr from-brand-500/20 via-indigo-500/15 to-emerald-500/20 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Header Badge & Title */}
      <div className="text-center mb-8 sm:mb-12 space-y-3.5 max-w-3xl px-4 z-10">
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
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Interact directly with the ANVESH Discovery Console inside our 3D Apple MacBook environment.
        </p>
      </div>

      {/* 3D Perspective Device Chassis Container */}
      <div className="w-full max-w-5xl px-2 sm:px-6 flex flex-col items-center [perspective:1200px]">
        <motion.div
          style={{
            rotateX: rotateLid,
            rotateY: springMouseX,
            scale: scale,
            transformStyle: 'preserve-3d',
          }}
          className="w-full max-w-[880px] flex flex-col items-center shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5)]"
        >
          {/* =========================================================================
              1. MACBOOK RETINA DISPLAY (LID)
             ========================================================================= */}
          <div className="relative w-full bg-[#181a22] rounded-t-[22px] sm:rounded-t-[28px] p-2 sm:p-3 border-[2px] sm:border-[2.5px] border-[#373d4d] flex flex-col justify-between overflow-hidden shadow-2xl">
            
            {/* Top Webcam Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3.5 sm:h-4 w-28 sm:w-36 bg-[#0c0d11] rounded-b-xl flex items-center justify-center gap-2 z-30 shadow-md border-b border-x border-[#232734]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1b1f2b] border border-slate-700 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-blue-400" />
              </div>
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Screen Glass Reflection Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none z-20 rounded-t-xl" />

            {/* Internal Retina Display Screen */}
            <ScreenContent src={src}>{children}</ScreenContent>
          </div>

          {/* =========================================================================
              2. MACBOOK CHASSIS HINGE & SPACE GRAY KEYBOARD DECK
             ========================================================================= */}
          <div className="relative w-full bg-gradient-to-b from-[#242732] via-[#1b1d26] to-[#121319] rounded-b-[22px] sm:rounded-b-[28px] border-x-[2px] sm:border-x-[2.5px] border-b-[3.5px] border-[#373d4d] shadow-[0_25px_60px_rgba(0,0,0,0.45)] flex flex-col items-center px-3 sm:px-6 py-2.5 sm:py-3.5 -mt-[1px] z-20">
            
            {/* Center Recessed Hinge */}
            <div className="w-36 sm:w-52 h-1.5 sm:h-2 bg-[#0c0e12] rounded-b-md shadow-inner -mt-2.5 sm:-mt-3.5 border-b border-[#2d3342]" />

            {/* Keyboard & Speaker Grille Deck Wrapper */}
            <div className="w-full flex items-center justify-between gap-2 sm:gap-4 my-1.5 sm:my-2">
              
              {/* Left Speaker Micro-Grille */}
              <SpeakerGrid />

              {/* Full Apple Magic Keyboard Matrix */}
              <Keypad />

              {/* Right Speaker Micro-Grille */}
              <SpeakerGrid />

            </div>

            {/* Force Touch Glass Trackpad & Front Opening Notch */}
            <div className="flex flex-col items-center mt-1">
              <div className="w-44 sm:w-56 md:w-68 h-9 sm:h-12 md:h-14 bg-gradient-to-b from-[#181a23] to-[#11131a] rounded-xl border border-[#2c3244] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]" />
              <div className="w-14 sm:w-20 h-1 bg-[#0b0c0f] rounded-b-md border-t border-[#232733] mt-1" />
            </div>

          </div>

          {/* Bottom Ambient Floor Glow */}
          <div className="w-[80%] h-6 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent blur-lg -mt-2 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

/* =========================================================================
   INTERNAL RETINA SCREEN DISPLAY WITH LIVE INTERACTIVE CONSOLE
   ========================================================================= */
export const ScreenContent = ({
  src,
  children,
}: {
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
    <div className="w-full min-h-[360px] sm:min-h-[400px] md:min-h-[430px] bg-[#0b0f17] rounded-lg sm:rounded-xl overflow-hidden border border-[#1f293d] flex flex-col text-slate-100 font-sans relative z-10 shadow-inner">
      {children ? (
        children
      ) : src ? (
        <img src={src} alt="Screen Preview" className="w-full h-full object-cover" />
      ) : (
        <>
          {/* Window Title Bar */}
          <div className="h-8 sm:h-9 bg-[#111622] border-b border-[#1f293d] px-3 sm:px-4 flex items-center justify-between shrink-0">
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
            <div className="flex items-center gap-2 bg-[#0b0f17] border border-[#1f293d] px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono text-slate-300 shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-bold">104,250</span>
              <span className="text-slate-400 hidden sm:inline">vectors live</span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-brand-300 font-bold hidden sm:inline">1.2ms latency</span>
            </div>

            {/* Quick Access Action Button */}
            <button
              onClick={() => openAuthModal('signup')}
              className="px-2.5 py-0.8 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-all shadow-sm shadow-brand-500/20"
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
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-[#0b0f17] text-slate-200 space-y-2.5">
            {activeTab === 'discovery' && (
              <div className="space-y-2.5">
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2 bg-[#111622] rounded-xl border border-[#1f293d]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Semantic Vector</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold">0.942 cos(&theta;)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[94%]" />
                    </div>
                  </div>

                  <div className="p-2 bg-[#111622] rounded-xl border border-[#1f293d]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Skill Overlap</span>
                      <span className="px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 font-mono text-[9px] font-bold">96.4% Matched</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full w-[96%]" />
                    </div>
                  </div>

                  <div className="p-2 bg-[#111622] rounded-xl border border-[#1f293d]">
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
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#111622] via-[#131a29] to-[#111622] border border-[#1f293d] shadow-md space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1f293d]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-extrabold text-white text-xs shadow-md">
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
  );
};

/* =========================================================================
   KEYPAD MATRIX WITH APPLE MAGIC KEYBOARD PROPORTIONS & INDIVIDUAL KEYCAPS
   ========================================================================= */
export const Keypad = () => {
  return (
    <div className="flex-1 max-w-[680px] bg-[#07080c] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border border-[#1f2330] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex flex-col gap-1 sm:gap-1.5">
      
      {/* Row 1: Function Keys */}
      <div className="flex w-full gap-0.5 sm:gap-1 items-center">
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><span className="text-[7px]">esc</span></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><Sun className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><Sun className="w-2.5 h-2.5 opacity-90" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><span className="text-[7px]">F3</span></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><Search className="w-2 h-2 opacity-60" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><Mic className="w-2 h-2 opacity-60" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><Moon className="w-2 h-2 opacity-60" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><SkipBack className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><Play className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><SkipForward className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><VolumeX className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><Volume2 className="w-2.5 h-2.5 opacity-60" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem]"><Volume2 className="w-2.5 h-2.5 opacity-90" /></Key>
        <Key className="flex-1 h-[0.95rem] sm:h-[1.25rem] bg-[#141722] border-[#2b3040]">
          <span className="text-[8px] text-brand-400 font-bold">⌽</span>
        </Key>
      </div>

      {/* Row 2: Numbers */}
      <div className="flex w-full gap-0.5 sm:gap-1 items-center">
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">~</span><span>`</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">!</span><span>1</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">@</span><span>2</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">#</span><span>3</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">$</span><span>4</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">%</span><span>5</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">^</span><span>6</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">&</span><span>7</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">*</span><span>8</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">(</span><span>9</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">)</span><span>0</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">_</span><span>-</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">+</span><span>=</span></Key>
        <Key className="flex-[1.6]"><span className="text-[7px] sm:text-[8px]">delete</span></Key>
      </div>

      {/* Row 3: QWERTY */}
      <div className="flex w-full gap-0.5 sm:gap-1 items-center">
        <Key className="flex-[1.5]"><span className="text-[7px] sm:text-[8px]">tab</span></Key>
        <Key className="flex-1">Q</Key>
        <Key className="flex-1">W</Key>
        <Key className="flex-1">E</Key>
        <Key className="flex-1">R</Key>
        <Key className="flex-1">T</Key>
        <Key className="flex-1">Y</Key>
        <Key className="flex-1">U</Key>
        <Key className="flex-1">I</Key>
        <Key className="flex-1">O</Key>
        <Key className="flex-1">P</Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">{'{'}</span><span>[</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">{'}'}</span><span>]</span></Key>
        <Key className="flex-[1.1]"><span className="text-[6px] block -mb-0.5">|</span><span>\</span></Key>
      </div>

      {/* Row 4: ASDF */}
      <div className="flex w-full gap-0.5 sm:gap-1 items-center">
        <Key className="flex-[1.75] relative">
          <span className="w-1 h-1 rounded-full bg-emerald-400 absolute top-1 left-1.5 opacity-80" />
          <span className="text-[7px] sm:text-[8px]">caps lock</span>
        </Key>
        <Key className="flex-1">A</Key>
        <Key className="flex-1">S</Key>
        <Key className="flex-1">D</Key>
        <Key className="flex-1">F</Key>
        <Key className="flex-1">G</Key>
        <Key className="flex-1">H</Key>
        <Key className="flex-1">J</Key>
        <Key className="flex-1">K</Key>
        <Key className="flex-1">L</Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">:</span><span>;</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">"</span><span>'</span></Key>
        <Key className="flex-[1.85] bg-[#171a24] border-[#2c3244]">
          <span className="text-[7px] sm:text-[8px] mr-1 hidden sm:inline">return</span>
          <CornerDownLeft className="w-2.5 h-2.5 inline" />
        </Key>
      </div>

      {/* Row 5: ZXCV */}
      <div className="flex w-full gap-0.5 sm:gap-1 items-center">
        <Key className="flex-[2.2]"><span className="text-[7px] sm:text-[8px]">shift</span></Key>
        <Key className="flex-1">Z</Key>
        <Key className="flex-1">X</Key>
        <Key className="flex-1">C</Key>
        <Key className="flex-1">V</Key>
        <Key className="flex-1">B</Key>
        <Key className="flex-1">N</Key>
        <Key className="flex-1">M</Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">&lt;</span><span>,</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">&gt;</span><span>.</span></Key>
        <Key className="flex-1"><span className="text-[6px] block -mb-0.5">?</span><span>/</span></Key>
        <Key className="flex-[2.2]"><span className="text-[7px] sm:text-[8px]">shift</span></Key>
      </div>

      {/* Row 6: Spacebar & Modifiers */}
      <div className="flex w-full gap-0.5 sm:gap-1 items-center">
        <Key className="flex-[0.9]"><span className="text-[7px]">fn</span></Key>
        <Key className="flex-[0.9]"><span className="text-[7px]">control</span></Key>
        <Key className="flex-[0.9]"><Option className="w-2.5 h-2.5" /></Key>
        <Key className="flex-[1.25]"><Command className="w-2.5 h-2.5" /></Key>
        <Key className="flex-[5.4] bg-[#141722] hover:bg-[#1c202e]" />
        <Key className="flex-[1.25]"><Command className="w-2.5 h-2.5" /></Key>
        <Key className="flex-[0.9]"><Option className="w-2.5 h-2.5" /></Key>
        
        {/* Inverted-T Arrow Keys Cluster */}
        <div className="flex-[1.7] flex gap-0.5 items-end h-[1.35rem] sm:h-[1.75rem] md:h-[2rem]">
          <Key className="flex-1 h-full"><ArrowLeft className="w-2 h-2" /></Key>
          <div className="flex-1 flex flex-col gap-0.5 h-full">
            <Key className="w-full flex-1"><ArrowUp className="w-1.5 h-1.5" /></Key>
            <Key className="w-full flex-1"><ArrowDown className="w-1.5 h-1.5" /></Key>
          </div>
          <Key className="flex-1 h-full"><ArrowRight className="w-2 h-2" /></Key>
        </div>
      </div>

    </div>
  );
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
        'h-[1.35rem] sm:h-[1.75rem] md:h-[2rem] bg-[#12141c] hover:bg-[#1a1e2a] text-slate-300 font-mono text-[7.5px] sm:text-[9px] md:text-[10px] rounded-[3px] sm:rounded-[4px] border border-[#232734] shadow-[0_1.5px_1px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col items-center justify-center transition-colors select-none px-0.5',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div className="hidden sm:grid grid-cols-3 gap-1 w-4 sm:w-6 h-20 sm:h-28 opacity-30 px-0.5">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-slate-950" />
      ))}
    </div>
  );
};
