'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  Terminal,
  FileCode2,
  Scale,
  FileText,
  Activity,
  ExternalLink,
  Lock,
  Server,
  Code,
  X,
  Layers,
  Globe,
  Check,
  Copy,
  AlertCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { AceternityInput, BottomGradient } from './ui/signup-form';
import { TextHoverEffect } from './ui/text-hover-effect';
import { BackgroundBeams } from './ui/background-beams';

type ModalType = 'privacy' | 'gdpr' | 'terms' | 'api' | 'status' | 'security' | null;

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const copyApiSnippet = () => {
    navigator.clipboard.writeText(
`curl -X POST https://api.anvesh.ai/v1/recommend/hybrid \\
  -H "Authorization: Bearer anvesh_live_k8s_904a8f" \\
  -H "Content-Type: application/json" \\
  -d '{
    "candidate_vector_id": "usr_94a0e2",
    "top_k": 20,
    "mmr_diversity_lambda": 0.72,
    "explainability": true
  }'`
    );
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-20 pb-12 border-t border-slate-800 overflow-hidden">
      {/* Background Ambient Beams */}
      <BackgroundBeams />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Newsletter / Intelligence Digest Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-md">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Career Intelligence Digest</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Monthly deterministic skill & salary intelligence.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              Receive verified industry compensation curves, emerging ontology node additions, and vector retrieval research papers directly in your inbox.
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
                <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero marketing spam. Strict privacy. Unsubscribe in one click.</span>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Grid with EXCLUSIVE Footer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: ANVESH Identity & System Verification */}
          <div className="space-y-4">
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
                  Autonomous Career Intelligence
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300 font-semibold">अन्वेष (Anvesh)</strong> is Sanskrit for <em className="text-brand-300">systematic inquiry & exploratory discovery</em>. Built to replace subjective hiring biases with mathematical ranking and candidate sovereignty.
            </p>

            {/* Social / Developer Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-slate-700 transition-colors"
                title="LinkedIn Community"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={() => setActiveModal('security')}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-slate-700 transition-colors"
                title="Security PGP & Bug Bounty"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Legal, Governance & Candidate Rights */}
          <div className="space-y-3.5 text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>Legal & Rights</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400" />
                  <span>Zero-PII Data Retention Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('gdpr')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400" />
                  <span>GDPR Art. 22 Explainability Rights</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400" />
                  <span>MIT Open-Core & Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('security')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400" />
                  <span>Responsible Vulnerability Disclosure</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Developer & API Ecosystem */}
          <div className="space-y-3.5 text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>Developer API</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal('api')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400" />
                  <span>REST & OpenAPI 3.1 Specification</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('api')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400" />
                  <span>Submodular MMR Diversity SDK</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('api')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400" />
                  <span>Self-Hosted Docker & Helm Charts</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('status')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400" />
                  <span>Model Checkpoint Registry (bge-v1.5)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Live Infrastructure & Operational Status */}
          <div className="space-y-3.5 text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-brand-400" />
              <span>System Telemetry</span>
            </h4>
            
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Global Vector Nodes
                </span>
                <span className="font-mono text-emerald-400 text-[11px] font-semibold">99.99% Uptime</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono border-t border-slate-800/80 pt-2 text-slate-400">
                <span>Inference Latency</span>
                <span className="text-brand-300">24.6ms avg</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono border-t border-slate-800/80 pt-2 text-slate-400">
                <span>Active Embeddings</span>
                <span className="text-slate-300">104,850 live</span>
              </div>

              <button
                onClick={() => setActiveModal('status')}
                className="w-full mt-1 pt-1 text-center text-[11px] font-semibold text-brand-400 hover:text-brand-300 transition-colors flex items-center justify-center gap-1"
              >
                <span>Inspect Cluster Health</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Interactive Aceternity TextHoverEffect Banner */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="h-28 sm:h-36 w-full flex items-center justify-center overflow-hidden">
            <TextHoverEffect text="ANVESH" />
          </div>
          <p className="text-center text-xs text-slate-500 font-mono -mt-2">
            Deterministic Career Discovery &bull; अन्वेष &bull; Open-Core Intelligence
          </p>
        </div>

        {/* Bottom Bar: Copyright & Exclusive Quick Triggers */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} ANVESH Open-Core Platform. Algorithms licensed under MIT / Apache-2.0.
          </p>
          <div className="flex items-center gap-5 text-xs">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Zero-PII Policy
            </button>
            <button
              onClick={() => setActiveModal('gdpr')}
              className="hover:text-slate-300 transition-colors"
            >
              GDPR Art. 22
            </button>
            <button
              onClick={() => setActiveModal('api')}
              className="hover:text-slate-300 transition-colors"
            >
              API Spec
            </button>
            <button
              onClick={() => setActiveModal('status')}
              className="hover:text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Status (Operational)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Information Modals (Exclusive Footer Documentation) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setActiveModal(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/90 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                    {activeModal === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                    {activeModal === 'gdpr' && <Scale className="w-5 h-5 text-emerald-400" />}
                    {activeModal === 'terms' && <FileText className="w-5 h-5 text-indigo-400" />}
                    {activeModal === 'api' && <Code className="w-5 h-5 text-cyan-400" />}
                    {activeModal === 'status' && <Activity className="w-5 h-5 text-brand-400" />}
                    {activeModal === 'security' && <Lock className="w-5 h-5 text-amber-400" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {activeModal === 'privacy' && 'Zero-PII Ephemeral Data Retention Policy'}
                      {activeModal === 'gdpr' && 'GDPR Article 22 & Algorithmic Recourse'}
                      {activeModal === 'terms' && 'MIT License & Open-Core Governance'}
                      {activeModal === 'api' && 'REST & OpenAPI 3.1 Developer Spec'}
                      {activeModal === 'status' && 'Live Infrastructure & Cluster Health'}
                      {activeModal === 'security' && 'Responsible Vulnerability Disclosure & PGP'}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      ANVESH Governance Document &bull; Rev 2026.4
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed">
                
                {activeModal === 'privacy' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                      <span><strong>Permanent Guarantee:</strong> Your raw resume text is never retained on disk. All personal identifiers (name, phone, address) are expunged during in-memory tokenization.</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">1. Ephemeral In-Memory Extraction</h4>
                    <p className="text-xs text-slate-400">
                      When a resume is submitted, it is loaded into an isolated RAM-backed micro-worker. Dense vector embeddings (384-d) and ontology skill IDs are extracted, and the original file is wiped from memory buffers within 60 seconds.
                    </p>

                    <h4 className="font-bold text-white text-sm">2. Non-Invertible Mathematical Projections</h4>
                    <p className="text-xs text-slate-400">
                      Vector embeddings stored in our Qdrant cluster represent mathematical coordinates in skill latent space. They are mathematically non-invertible—it is physically impossible to reverse-engineer phone numbers, names, or addresses from vector coordinates.
                    </p>

                    <h4 className="font-bold text-white text-sm">3. Cryptographic Candidate Pseudonymization</h4>
                    <p className="text-xs text-slate-400">
                      User profiles are indexed using HMAC-SHA256 salted hashes. We do not sell, license, or monetize candidate data to any third-party recruitment agencies or ad networks.
                    </p>
                  </div>
                )}

                {activeModal === 'gdpr' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-start gap-2.5">
                      <Scale className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400" />
                      <span><strong>Article 22 Compliance:</strong> Candidates have the fundamental right not to be subjected to arbitrary, non-transparent automated decisions without mathematical explanation.</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">1. Right to Full Algorithmic Explanation</h4>
                    <p className="text-xs text-slate-400">
                      For any recommendation or ranking generated by ANVESH, users can request an exact Shapley value waterfall (TreeSHAP) detailing the positive or negative contribution of every skill, experience year, and domain tag.
                    </p>

                    <h4 className="font-bold text-white text-sm">2. Transparent Parameter Control</h4>
                    <p className="text-xs text-slate-400">
                      Candidates retain full autonomy to tune the trade-off hyperparameters: Semantic Relevance ($\alpha$), Skill Gap Coverage ($\beta$), and MMR Diversity ($\lambda$). No black-box hidden penalties are applied.
                    </p>

                    <h4 className="font-bold text-white text-sm">3. Zero Automated Disqualification</h4>
                    <p className="text-xs text-slate-400">
                      ANVESH does not perform binary disqualification filters based on subjective keywords or demographic metadata.
                    </p>
                  </div>
                )}

                {activeModal === 'terms' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs">
                      <strong>MIT Open-Source License</strong> &bull; Copyright &copy; {new Date().getFullYear()} ANVESH Open-Core Contributors.
                    </div>

                    <p className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 leading-normal">
                      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated mathematical formulations, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies...
                    </p>

                    <h4 className="font-bold text-white text-sm">Commercial Integrations & API Quotas</h4>
                    <p className="text-xs text-slate-400">
                      Individual career explorers enjoy unrestricted free access. Enterprise ATS integrations utilizing bulk real-time scoring endpoints are subject to standard rate-limiting (100 req/sec) and uptime SLAs.
                    </p>
                  </div>
                )}

                {activeModal === 'api' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-semibold">POST /v1/recommend/hybrid</span>
                      <button
                        onClick={copyApiSnippet}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Copy cURL'}</span>
                      </button>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                      <pre className="text-cyan-300">curl -X POST https://api.anvesh.ai/v1/recommend/hybrid \</pre>
                      <pre className="text-slate-400">  -H &quot;Authorization: Bearer anvesh_live_k8s_904a8f&quot; \</pre>
                      <pre className="text-slate-400">  -H &quot;Content-Type: application/json&quot; \</pre>
                      <pre className="text-slate-400">  -d &apos;&#123;</pre>
                      <pre className="text-emerald-400">    &quot;candidate_vector_id&quot;: &quot;usr_94a0e2&quot;,</pre>
                      <pre className="text-emerald-400">    &quot;top_k&quot;: 20,</pre>
                      <pre className="text-emerald-400">    &quot;mmr_diversity_lambda&quot;: 0.72,</pre>
                      <pre className="text-emerald-400">    &quot;explainability&quot;: true</pre>
                      <pre className="text-slate-400">  &#125;&apos;</pre>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Latency SLA</span>
                        <span className="text-emerald-400 font-mono font-bold">&lt; 45ms (p99)</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Authentication</span>
                        <span className="text-cyan-300 font-mono font-bold">HMAC Bearer Token</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'status' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between font-semibold">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        All Production Systems Operational
                      </span>
                      <span className="font-mono">99.992% (30d)</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-medium">Qdrant Vector Cluster (us-east-1)</span>
                        </div>
                        <span className="font-mono text-emerald-400">12ms &bull; Healthy</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-medium">LightGBM Ranking Microservice</span>
                        </div>
                        <span className="font-mono text-emerald-400">28ms &bull; Healthy</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-medium">Canonical Skill Graph (PostgreSQL)</span>
                        </div>
                        <span className="font-mono text-emerald-400">4ms &bull; Healthy</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-medium">Global Edge API Gateway</span>
                        </div>
                        <span className="font-mono text-emerald-400">100% Operational</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'security' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
                      <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                      <span><strong>Responsible Disclosure:</strong> We actively welcome security researchers. Contact our team directly for vulnerability submissions with guaranteed 24h triage.</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">Security Contact & Bug Bounty</h4>
                    <p className="text-xs text-slate-400">
                      Direct inquiries to <span className="text-brand-300 font-mono">security@anvesh.ai</span>. Submissions are eligible for recognition and bounty compensation based on severity.
                    </p>

                    <h4 className="font-bold text-white text-sm">PGP Master Key Fingerprint</h4>
                    <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
                      4A9B 81C2 940E 38F7 D94B  2061 5F02 81C9 904A 8F01
                    </pre>

                    <h4 className="font-bold text-white text-sm">Infrastructure Standards</h4>
                    <p className="text-xs text-slate-400">
                      All data in transit is encrypted using TLS 1.3 with Perfect Forward Secrecy (PFS). Vector databases at rest are encrypted via AES-256 with KMS key rotation.
                    </p>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModal(null)}
                  className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  Close (Esc)
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}

