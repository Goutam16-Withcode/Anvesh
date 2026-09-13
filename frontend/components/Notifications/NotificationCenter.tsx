'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Sparkles,
  TrendingUp,
  Route,
  Zap,
  CheckCheck,
  Volume2,
  VolumeX,
  X,
  ArrowRight,
  Radio,
  SlidersHorizontal,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useNotifications, NotificationSignal } from '@/lib/notification-context';
import { Badge } from '@/components/ui/badge';

export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    soundEnabled,
    toggleSound,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    triggerSimulatedSignal,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'MATCH' | 'ARBITRAGE' | 'SHORTCUT'>('ALL');
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filter notifications by tab
  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'MATCH') return item.type === 'VECTOR_MATCH';
    if (activeTab === 'ARBITRAGE') return item.type === 'SALARY_ARBITRAGE';
    if (activeTab === 'SHORTCUT') return item.type === 'GRAPH_SHORTCUT' || item.type === 'SCARCITY_SPIKE' || item.type === 'AUTH_EVENT';
    return true;
  });

  const getSignalIcon = (type: NotificationSignal['type']) => {
    switch (type) {
      case 'VECTOR_MATCH':
        return <Sparkles className="w-3.5 h-3.5 text-brand-400" />;
      case 'SALARY_ARBITRAGE':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
      case 'GRAPH_SHORTCUT':
        return <Route className="w-3.5 h-3.5 text-cyan-400" />;
      case 'SCARCITY_SPIKE':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'AUTH_EVENT':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case 'PROFILE_UPDATE':
        return <FileText className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="relative inline-block" ref={panelRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Career Intelligence Notifications"
        className={`relative p-2 rounded-xl border transition-all duration-200 focus:outline-none ${
          isOpen
            ? 'bg-slate-100 border-slate-300 text-slate-900 shadow-sm'
            : 'bg-white/80 border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300'
        }`}
      >
        <Bell className="w-4 h-4" />

        {/* Dynamic Unread Badge Pill */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold font-mono text-white shadow-sm">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative">{unreadCount}</span>
          </span>
        )}
      </button>

      {/* Popover Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="absolute right-0 mt-2 w-[380px] sm:w-[420px] rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl text-slate-300 z-50 overflow-hidden flex flex-col max-h-[560px]"
          >
            {/* Header */}
            <div className="p-3.5 px-4 border-b border-slate-800/90 bg-slate-900/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">
                  Career Signals
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Stream
                </span>
              </div>

              {/* Utility Controls */}
              <div className="flex items-center gap-1 text-slate-400">
                {/* Trigger Demo Signal Button */}
                <button
                  onClick={triggerSimulatedSignal}
                  title="Simulate incoming real-time signal"
                  className="p-1.5 rounded-lg hover:text-brand-300 hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px] font-mono px-2"
                >
                  <Zap className="w-3 h-3 text-brand-400" />
                  <span>Test Ping</span>
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={toggleSound}
                  title={soundEnabled ? 'Mute signal chimes' : 'Enable signal chimes'}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-brand-400" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </button>

                {/* Mark All Read */}
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    title="Mark all as read"
                    className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-2 border-b border-slate-800/80 bg-slate-900/40 text-xs shrink-0 font-medium">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === 'ALL'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setActiveTab('MATCH')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === 'MATCH'
                    ? 'bg-brand-500/20 text-brand-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                90%+ Match
              </button>
              <button
                onClick={() => setActiveTab('ARBITRAGE')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === 'ARBITRAGE'
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Arbitrage
              </button>
              <button
                onClick={() => setActiveTab('SHORTCUT')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === 'SHORTCUT'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Shortcuts
              </button>
            </div>

            {/* Notification List Body */}
            <div className="overflow-y-auto divide-y divide-slate-800/60 flex-1">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center space-y-2 text-slate-500">
                  <Bell className="w-6 h-6 mx-auto text-slate-600" />
                  <p className="text-xs">No signals found in this category.</p>
                </div>
              ) : (
                filteredNotifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markAsRead(item.id)}
                    className={`p-3.5 sm:p-4 transition-colors relative group hover:bg-slate-900/80 ${
                      !item.read ? 'bg-slate-900/40' : 'bg-transparent'
                    }`}
                  >
                    {/* Unread Indicator Bar */}
                    {!item.read && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-brand-500 rounded-r" />
                    )}

                    <div className="space-y-2">
                      {/* Badge & Timestamp Row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-md bg-slate-800 border border-slate-700">
                            {getSignalIcon(item.type)}
                          </div>
                          <Badge variant={item.badgeVariant} className="text-[10px] font-mono tracking-wider font-bold">
                            {item.badgeText}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-500">
                            {item.timestamp}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissNotification(item.id);
                            }}
                            title="Dismiss signal"
                            className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Role Info */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                          {item.title}
                        </h4>
                        {item.company && (
                          <p className="text-xs font-semibold text-slate-300 mt-0.5">
                            <span className="text-brand-300 font-bold">{item.company}</span> &bull; {item.roleTitle}
                          </p>
                        )}
                      </div>

                      {/* Message Body */}
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {item.message}
                      </p>

                      {/* Footer Actions */}
                      <div className="pt-1 flex items-center justify-between">
                        {item.salaryDelta ? (
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            {item.salaryDelta}
                          </span>
                        ) : (
                          <span />
                        )}

                        <Link
                          href={item.actionHref}
                          onClick={() => {
                            markAsRead(item.id);
                            setIsOpen(false);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors group/link"
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Panel Bottom Footer */}
            <div className="p-2.5 px-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-[11px] text-slate-500 font-mono shrink-0">
              <span>HNSW Spatial Distance &bull; Qdrant Live</span>
              <button
                onClick={triggerSimulatedSignal}
                className="text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1"
              >
                <span>Trigger Live Event</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
