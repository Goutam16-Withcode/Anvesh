'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/lib/auth-context';

export function CTASection() {
  const { user, openAuthModal } = useAuth();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glow Container */}
        <div className="relative rounded-3xl p-8 sm:p-16 bg-slate-900 text-white shadow-2xl overflow-hidden text-center space-y-8 border border-slate-800">
          
          {/* Subtle Background Radial Spotlights */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-10 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-grid-slate opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-brand-200">
              <Sparkles className="w-4 h-4 text-brand-300 animate-pulse" />
              <span>Start Your Deterministic Discovery Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Accelerate Your Career Trajectory with ANVESH?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Join thousands of engineers experiencing the power of canonical skill ontology, LightGBM LambdaMART ranking, and real-time counterfactual What-If simulation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-xl shadow-brand-500/30 border border-brand-400/40"
                  >
                    <span>Open Career Dashboard</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={() => openAuthModal('signup')}
                    className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-xl shadow-brand-500/30 border border-brand-400/40"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => openAuthModal('login')}
                    className="w-full sm:w-auto text-slate-200 hover:text-white hover:bg-white/10 border border-slate-700 font-semibold"
                  >
                    <span>Sign In</span>
                  </Button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 pt-4 text-xs sm:text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free candidate tier
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-400" /> Google single sign-on
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> 100% Confidential
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
