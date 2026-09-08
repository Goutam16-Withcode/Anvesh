import React from 'react';
import { ShieldCheck, Lock, Key, Server, UserCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-600" />,
      title: 'Firebase Google & JWT Authentication',
      description:
        'Supports seamless Google sign-in via Firebase Auth alongside robust manual JWT authentication with bcrypt-encrypted credential hashing.',
    },
    {
      icon: <Lock className="w-5 h-5 text-indigo-600" />,
      title: 'Confidential Resume & Vector Protection',
      description:
        'Parsed profile vectors and parsed PDF content are strictly stored in private PostgreSQL and Qdrant namespaces. Your data is never sold or used for public model training.',
    },
    {
      icon: <Key className="w-5 h-5 text-emerald-600" />,
      title: 'Role-Based Access Control (RBAC)',
      description:
        'Strict NestJS Passport authentication guards isolate candidate profile modifications and recruiter telemetry channels with granular scopes.',
    },
    {
      icon: <Server className="w-5 h-5 text-cyan-600" />,
      title: 'Encrypted Microservice Transport',
      description:
        'End-to-end TLS encryption across API gateways, vector database transactions, and asynchronous ingestion worker queues.',
    },
  ];

  return (
    <section id="security" className="py-20 md:py-32 bg-slate-50/70 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="emerald" className="font-bold">
            Security & Data Integrity
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Enterprise Security by Design
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Built on verified standards for credential hashing, identity verification, and vector storage isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {securityFeatures.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-subtle hover:shadow-card hover:border-brand-200 transition-all flex items-start gap-4"
            >
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
