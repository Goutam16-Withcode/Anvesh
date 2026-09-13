'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, TrendingUp, Route, Zap, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { useNotifications, NotificationSignal } from '@/lib/notification-context';
import { Badge } from '@/components/ui/badge';

export function LiveNotificationToast() {
  const { activeToast, dismissToast, markAsRead } = useNotifications();

  // Auto-dismiss toast after 6.5 seconds
  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 6500);
    return () => clearTimeout(timer);
  }, [activeToast, dismissToast]);

  if (!activeToast) return null;

  const getSignalIcon = (type: NotificationSignal['type']) => {
    switch (type) {
      case 'VECTOR_MATCH':
        return <Sparkles className="w-4 h-4 text-brand-400" />;
      case 'SALARY_ARBITRAGE':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'GRAPH_SHORTCUT':
        return <Route className="w-4 h-4 text-cyan-400" />;
      case 'SCARCITY_SPIKE':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'AUTH_EVENT':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'PROFILE_UPDATE':
        return <FileText className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full pointer-events-auto select-none">
      <AnimatePresence>
        <motion.div
          key={activeToast.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className="relative rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl p-4 text-slate-300 backdrop-blur-xl overflow-hidden space-y-2.5"
        >
          {/* Subtle Top Accent Gradient Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400" />

          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-slate-800 border border-slate-700">
                {getSignalIcon(activeToast.type)}
              </div>
              <Badge variant={activeToast.badgeVariant} className="font-mono text-[10px] tracking-wider uppercase font-bold">
                {activeToast.badgeText}
              </Badge>
            </div>

            <button
              onClick={dismissToast}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Signal Content */}
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white leading-snug">
              {activeToast.title}
            </h4>
            {activeToast.company && (
              <p className="text-xs font-semibold text-brand-300">
                {activeToast.company} &bull; <span className="text-slate-300">{activeToast.roleTitle}</span>
              </p>
            )}
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              {activeToast.message}
            </p>
          </div>

          {/* Actions & Progress */}
          <div className="pt-1 flex items-center justify-between gap-2">
            {activeToast.salaryDelta && (
              <span className="text-xs font-mono font-bold text-emerald-400">
                {activeToast.salaryDelta}
              </span>
            )}

            <Link
              href={activeToast.actionHref}
              onClick={() => {
                markAsRead(activeToast.id);
                dismissToast();
              }}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>{activeToast.actionLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Subtle Progress Bar */}
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 6.5, ease: 'linear' }}
            className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-500/60"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
