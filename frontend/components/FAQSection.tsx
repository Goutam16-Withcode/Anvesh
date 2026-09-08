'use client';

import React from 'react';
import { Accordion } from './ui/accordion';
import { Badge } from './ui/badge';

export function FAQSection() {
  const faqItems = [
    {
      title: 'What is ANVESH and how does it differ from traditional job boards?',
      content: (
        <p>
          ANVESH (Sanskrit for <em>Discovery & Exploration</em>) is an AI-powered career intelligence and recommendation platform. Unlike legacy portals that rely on brittle keyword string matching, ANVESH utilizes a deterministic 4-stage hybrid recommendation pipeline (Vector Retrieval via Qdrant, Skill Graph Normalization, LightGBM LambdaMART ranking, and MMR Multi-Objective diversification) to deliver transparent, highly personalized career matches.
        </p>
      ),
    },
    {
      title: 'How does the Counterfactual What-If Simulation Engine work?',
      content: (
        <p>
          The What-If Engine allows candidates to simulate adding hypothetical skills (e.g. <em>Kubernetes</em>, <em>CUDA</em>, or <em>Go</em>) to their verified profile vector. It runs zero-hallucination re-indexing against the active job catalog in real time, computing the exact opportunity count increase (&Delta;N) and median market salary trajectory lift.
        </p>
      ),
    },
    {
      title: 'Which authentication options are supported in ANVESH?',
      content: (
        <p>
          ANVESH supports both <strong>Firebase Google Authentication</strong> (&ldquo;Continue with Google&rdquo;) for instant, secure sign-in and traditional <strong>Manual Email & Password Authentication</strong> protected by bcrypt password hashing and NestJS JWT Bearer session tokens.
        </p>
      ),
    },
    {
      title: 'How does the Canonical Skill Ontology prevent ATS rejection?',
      content: (
        <p>
          Arbitrary skill variants like &ldquo;k8s&rdquo;, &ldquo;Kubernetes&rdquo;, and &ldquo;Container Orchestration&rdquo; are normalized into standardized canonical nodes defined in <code>skills.json</code>. This guarantees that candidates are evaluated based on their true technical depth rather than minor terminology mismatches.
        </p>
      ),
    },
    {
      title: 'Is my uploaded resume data secure and confidential?',
      content: (
        <p>
          Yes. ANVESH stores candidate embeddings and profile metadata in isolated private namespaces in PostgreSQL 16 and Qdrant. Your data is strictly used for recommendation ranking and is never resold to third-party data brokers or used to train public foundation models.
        </p>
      ),
    },
    {
      title: 'How does the AI Career Agent generate responses?',
      content: (
        <p>
          The ANVESH Agent is built on deterministic tool-calling microservices (LangChain orchestrator). Instead of guessing or fabricating career insights, it executes tools like <code>discover_roles()</code>, <code>calculate_skill_gap()</code>, and <code>simulate_skill()</code> to provide verified answers backed by live data.
        </p>
      ),
    },
    {
      title: 'Is there a free tier to explore ANVESH?',
      content: (
        <p>
          Yes! Creating an account, running deterministic resume parsing, viewing top multi-stage job recommendations, and testing counterfactual What-If simulations are completely free for candidates.
        </p>
      ),
    },
    {
      title: 'How do I get started with ANVESH?',
      content: (
        <p>
          Click the <strong>Get Started Free</strong> button, create your account or sign in with Google, upload your resume or select your verified skills, and immediately access your personalized discovery feed and What-If career acceleration dashboard.
        </p>
      ),
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <Badge variant="brand" className="font-bold">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Know About ANVESH
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Got questions about our deterministic retrieval architecture, scoring formulas, or security? We have answers.
          </p>
        </div>

        <Accordion items={faqItems} />

      </div>
    </section>
  );
}
