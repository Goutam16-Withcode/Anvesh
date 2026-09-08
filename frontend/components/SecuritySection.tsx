'use client';

import React from 'react';
import { ShieldCheck, Lock, Key, Server, UserCheck, CheckCircle2, Sparkles, FileCode, Check } from 'lucide-react';
import { Badge } from './ui/badge';
import { ExpandableCards, ExpandableCardItem } from './ui/expandable-cards';
import { useAuth } from '@/lib/auth-context';

export function SecuritySection() {
  const { openAuthModal } = useAuth();

  const securityCards: ExpandableCardItem[] = [
    {
      id: 'sec-auth',
      title: 'Firebase Google & JWT Authentication',
      category: 'Identity & Access',
      badge: 'Bcrypt + Firebase',
      badgeVariant: 'brand',
      icon: <ShieldCheck className="w-5 h-5 text-brand-600" />,
      shortDescription:
        'Supports seamless Google sign-in via Firebase Auth alongside robust manual JWT authentication with bcrypt-encrypted credential hashing.',
      metrics: [
        { label: 'Hash Rounds', value: '12 Rounds' },
        { label: 'Token Expiry', value: '24 Hours' },
      ],
      tags: ['FirebaseAuth', 'JWT', 'Bcrypt', 'OAuth2'],
      ctaText: 'Sign In Securely',
      ctaAction: () => openAuthModal('login'),
      content: () => (
        <div className="space-y-4">
          <p>
            ANVESH provides a dual authentication architecture: instantaneous 1-click Google OAuth verification powered by Firebase Auth, and direct email/password credential management secured by NestJS Passport JWT guards with 12 bcrypt salt rounds.
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-200">
            <span className="text-brand-400 font-bold block">// Security Specs</span>
            <p className="text-slate-300">&bull; Signed JWT token with HMAC-SHA256 signature.</p>
            <p className="text-slate-300">&bull; Automatic token refresh &amp; revocation blacklist.</p>
            <p className="text-emerald-400">&bull; Rate-limited brute force protection.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'sec-confidentiality',
      title: 'Confidential Resume & Vector Protection',
      category: 'Data Privacy',
      badge: 'Zero-PII Training',
      badgeVariant: 'emerald',
      icon: <Lock className="w-5 h-5 text-indigo-600" />,
      shortDescription:
        'Parsed profile vectors and parsed PDF content are strictly stored in private PostgreSQL and Qdrant namespaces. Your data is never sold or used for public model training.',
      metrics: [
        { label: 'Data Sharing', value: '0% Third-Party' },
        { label: 'Encryption', value: 'AES-256 GCM' },
      ],
      tags: ['ZeroPII', 'PrivateNamespace', 'QdrantStorage'],
      ctaText: 'View Privacy Policy',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            Your career trajectory and compensation history are confidential. All candidate profile embeddings are partitioned into tenant-isolated Qdrant collections.
          </p>

          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-xs font-mono text-emerald-200">
            <span className="font-bold text-emerald-400 block text-[10px] uppercase">Guaranteed Principles:</span>
            <ul className="mt-1 space-y-1 text-slate-300">
              <li>&bull; Resumes are never ingested into open LLM training sets.</li>
              <li>&bull; User embeddings are salted and pseudonymized.</li>
              <li>&bull; Immediate full data purge on account deletion.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'sec-rbac',
      title: 'Role-Based Access Control (RBAC)',
      category: 'Authorization',
      badge: 'NestJS Guards',
      badgeVariant: 'emerald',
      icon: <Key className="w-5 h-5 text-emerald-600" />,
      shortDescription:
        'Strict NestJS Passport authentication guards isolate candidate profile modifications and recruiter telemetry channels with granular scopes.',
      metrics: [
        { label: 'Scopes', value: 'Candidate / Recruiter' },
        { label: 'Guard Level', value: 'Controller Level' },
      ],
      tags: ['RBAC', 'NestJS', 'PassportGuards'],
      ctaText: 'Access Dashboard',
      ctaAction: () => openAuthModal('login'),
      content: () => (
        <div className="space-y-4">
          <p>
            Endpoints are defended by strict NestJS Guards (<code>JwtAuthGuard</code>, <code>RolesGuard</code>). Candidate data cannot be modified by unauthorized third parties, and recruitment partner feeds only receive anonymized candidate match scores.
          </p>
        </div>
      ),
    },
    {
      id: 'sec-transport',
      title: 'Encrypted Microservice Transport',
      category: 'Infrastructure Security',
      badge: 'TLS 1.3 / mTLS',
      badgeVariant: 'cyan',
      icon: <Server className="w-5 h-5 text-cyan-600" />,
      shortDescription:
        'End-to-end TLS encryption across API gateways, vector database transactions, and asynchronous ingestion worker queues.',
      metrics: [
        { label: 'Transport', value: 'TLS 1.3' },
        { label: 'Cert Strength', value: '4096-bit RSA' },
      ],
      tags: ['TLS1.3', 'Microservices', 'mTLS'],
      ctaText: 'Inspect Infra Specs',
      ctaAction: () => openAuthModal('signup'),
      content: () => (
        <div className="space-y-4">
          <p>
            All network communication between Next.js client, NestJS API gateway, Qdrant vector database, and PostgreSQL is encrypted via TLS 1.3 with strict CORS origin validation.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="security" className="py-20 md:py-32 bg-slate-50/70 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="emerald" className="font-bold">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-emerald-600 animate-pulse" />
            <span>Enterprise Security &bull; Click to Expand</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Security &amp; Data Integrity by Design
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Built on verified standards for credential hashing, identity verification, and vector storage isolation. <strong>Click any card</strong> to view security protocols.
          </p>
        </div>

        {/* Expandable Security Cards Grid */}
        <ExpandableCards items={securityCards} gridCols="grid-cols-1 md:grid-cols-2" />

      </div>
    </section>
  );
}
