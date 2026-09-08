'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  ShieldCheck,
  Zap,
  Database,
  Cpu,
  Mail,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from './ui/button';
import { AceternityInput, BottomGradient } from './ui/signup-form';
import { TextHoverEffect } from './ui/text-hover-effect';
import { BackgroundBeams } from './ui/background-beams';
import { useAuth } from '@/lib/auth-context';

export function Footer() {
  const { openAuthModal } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-20 pb-12 border-t border-slate-800 overflow-hidden">
      {/* Background Ambient Beams */}
      <BackgroundBeams />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Newsletter & Telemetry Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-md">
          
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Career Intelligence Digest</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Stay ahead of market demand and salary trajectories.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              Get monthly deterministic skill benchmark reports, vector ranking algorithm updates, and high-growth AI/MLOps career transition paths.
            </p>
          </div>

          <div className="lg:col-span-5">
            {isSubscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Subscribed! You will receive our next quarterly benchmark digest.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <AceternityInput
                    type="email"
                    placeholder="engineer@company.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="bg-slate-800/90 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  <div className="relative group/btn shrink-0">
                    <Button type="submit" variant="noise" size="md" className="w-full sm:w-auto font-bold">
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <BottomGradient />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Zero spam. Strictly confidential engineering data. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Multi-Column Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 animate-pulse-subtle" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white">
                    ANVESH
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-700/60">
                    अन्वेष
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  AI Career Discovery Platform
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Deterministic, multi-stage career intelligence replacing brittle ATS keyword searches with canonical skill graphs, Qdrant vector retrieval, and LightGBM LambdaMART ranking.
            </p>

            {/* Architecture Telemetry Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Qdrant 384-d: 104k Live
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-brand-300 font-mono">
                <Zap className="w-3 h-3 text-brand-400" />
                Latency: 32.8ms
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3.5 text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>Platform</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#platform" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  Architectural Manifesto
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  Multi-Stage Hybrid Pipeline
                </a>
              </li>
              <li>
                <a href="#advanced" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  What-If Simulation Engine
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  Live Interactive Sandbox
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  4-Step Workflow Timeline
                </a>
              </li>
            </ul>
          </div>

          {/* Architecture & Tech Links */}
          <div className="space-y-3.5 text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Architecture</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#features" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  Qdrant HNSW Vector Search
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  LightGBM LambdaMART LTR
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  Canonical Skill Ontology
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  MMR Diversity Formulation
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">
                  Confidential Vector Storage
                </a>
              </li>
            </ul>
          </div>

          {/* Account & Resources */}
          <div className="space-y-3.5 text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Account & Trust</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => openAuthModal('login')} className="hover:text-white transition-colors text-left">
                  Candidate Sign In
                </button>
              </li>
              <li>
                <button onClick={() => openAuthModal('signup')} className="hover:text-white transition-colors text-left">
                  Create Free Account
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">
                  Privacy Policy &bull; SOC-2 Ready
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">
                  Terms of Service &bull; MIT License
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Aceternity UI TextHoverEffect Interactive Banner */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="h-28 sm:h-36 w-full flex items-center justify-center overflow-hidden">
            <TextHoverEffect text="ANVESH" />
          </div>
          <p className="text-center text-xs text-slate-500 font-mono -mt-2">
            Deterministic Career Discovery &bull; Sanskrit for Exploration
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} ANVESH AI Platform. All rights reserved. Built with deterministic engineering and Aceternity UI design.
          </p>
          <div className="flex items-center gap-6">
            <a href="#platform" className="hover:text-slate-300 transition-colors">
              Platform
            </a>
            <a href="#security" className="hover:text-slate-300 transition-colors">
              Security
            </a>
            <a href="#faq" className="hover:text-slate-300 transition-colors">
              FAQ
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
