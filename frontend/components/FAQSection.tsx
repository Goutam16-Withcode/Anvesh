'use client';

import React from 'react';
import { 
  Sparkles, 
  HelpCircle,
  Compass, 
  TrendingUp, 
  ShieldCheck, 
  Key, 
  Rocket, 
  GitBranch, 
  FileCheck2,
  Lock
} from 'lucide-react';
import { Accordion, AccordionItemData } from './ui/accordion';
import { Badge } from './ui/badge';

export function FAQSection() {
  const faqItems: AccordionItemData[] = [
    {
      icon: <Compass className="w-4 h-4 text-brand-600" />,
      title: 'What is ANVESH and how does it help my job search?',
      content: (
        <p>
          ANVESH (derived from Sanskrit <strong>अन्वेषण</strong> for <em>Inquiry &amp; Deep Search</em>) is an intelligent career platform designed to replace broken ATS keyword matching. It analyzes your verified experience and technical depth to recommend roles tailored precisely to your background, complete with transparent match score breakdowns.
        </p>
      ),
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      title: 'How does the What-If Career Simulator work?',
      content: (
        <p>
          The What-If Simulator lets you test adding prospective skills (like <em>Kubernetes</em>, <em>CUDA</em>, or <em>Go</em>) to see the exact increase in matching job openings and projected salary lift—before spending months learning them.
        </p>
      ),
    },
    {
      icon: <Rocket className="w-4 h-4 text-purple-600" />,
      title: 'Is ANVESH free to use for job seekers?',
      content: (
        <p>
          <strong>Yes, 100% free!</strong> Creating an account, uploading your resume, viewing personalized career recommendations, and running What-If counterfactual simulations are completely free for all candidates.
        </p>
      ),
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      title: 'How is my resume and personal data protected?',
      content: (
        <p>
          Your privacy is guaranteed. Your resume and profile embeddings are stored in isolated private databases. Your data is <strong>never sold to third-party data brokers</strong> and is <strong>never used to train public AI models</strong>. You can permanently delete your account and data at any time.
        </p>
      ),
    },
    {
      icon: <FileCheck2 className="w-4 h-4 text-cyan-600" />,
      title: 'How does ANVESH prevent unfair rejections from keyword filters?',
      content: (
        <p>
          ANVESH normalizes skills into standardized ontology categories (e.g. recognizing that <em>&ldquo;K8s&rdquo;</em>, <em>&ldquo;Kubernetes&rdquo;</em>, and <em>&ldquo;Container Orchestration&rdquo;</em> represent the same core competency). This ensures you are evaluated on your real engineering abilities rather than minor phrasing differences.
        </p>
      ),
    },
    {
      icon: <GitBranch className="w-4 h-4 text-indigo-600" />,
      title: 'Can I use ANVESH if I want to switch career roles or tech stacks?',
      content: (
        <p>
          Yes! The Role Pathways feature is built specifically for career transitions. It analyzes adjacent domains with high skill overlap (e.g., moving from Backend Engineering to AI Infrastructure) and maps the fastest route to your target role.
        </p>
      ),
    },
    {
      icon: <Key className="w-4 h-4 text-amber-600" />,
      title: 'What sign-in options do you support?',
      content: (
        <p>
          We support instant 1-click sign-in with Google via Firebase Authentication as well as standard manual email and password accounts secured with enterprise-grade encryption.
        </p>
      ),
    },
    {
      icon: <Sparkles className="w-4 h-4 text-brand-600" />,
      title: 'How do I get started with ANVESH?',
      content: (
        <p>
          Simply click <strong>Get Started</strong>, sign in with Google or your email, and upload your resume or select your verified skills to immediately explore live personalized job recommendations.
        </p>
      ),
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-white relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-500/10 via-indigo-500/5 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Section Header */}
        <div className="text-center mb-14 space-y-4">
          <Badge variant="brand" className="font-bold px-3 py-1 text-xs">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-brand-600 animate-pulse" />
            <span>Frequently Asked Questions</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
            Everything You Need to Know About ANVESH
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Got questions about how ANVESH matches roles, calculates simulations, or protects your privacy? We have answers.
          </p>
        </div>

        {/* Clean All-Questions Accordion List */}
        <Accordion items={faqItems} />

      </div>
    </section>
  );
}
