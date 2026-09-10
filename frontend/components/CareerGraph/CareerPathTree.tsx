'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, Layers, TrendingUp, Cpu, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CareerTrack, CareerNode } from '@/lib/api';
import { PathNode } from './PathNode';
import { MilestoneTimeline } from './MilestoneTimeline';
import { formatNumber } from '@/lib/utils';

interface CareerPathTreeProps {
  tracks: CareerTrack[];
  initialTrackId?: string;
}

export function CareerPathTree({ tracks, initialTrackId }: CareerPathTreeProps) {
  const [activeTrackId, setActiveTrackId] = useState<string>(initialTrackId || tracks[0]?.id || 'ai_systems');
  const activeTrack = tracks.find((t) => t.id === activeTrackId) || tracks[0];
  const [selectedNode, setSelectedNode] = useState<CareerNode>(activeTrack.nodes[1] || activeTrack.nodes[0]);

  const handleTrackChange = (trackId: string) => {
    setActiveTrackId(trackId);
    const newTrack = tracks.find((t) => t.id === trackId);
    if (newTrack && newTrack.nodes.length > 0) {
      setSelectedNode(newTrack.nodes[1] || newTrack.nodes[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Track Selector Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {tracks.map((trk) => {
          const isActive = trk.id === activeTrackId;
          return (
            <button
              key={trk.id}
              onClick={() => handleTrackChange(trk.id)}
              className={`px-5 py-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 ${
                isActive
                  ? 'bg-white border-brand-500 shadow-md ring-2 ring-brand-500/20'
                  : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {trk.id === 'ai_systems' ? <Cpu className="w-5 h-5" /> : <Award className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{trk.name}</span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {trk.badge}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Target: {trk.targetSalaryRange}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Track Tagline */}
      <div className="p-4 bg-gradient-to-r from-brand-50/70 via-indigo-50/50 to-white rounded-2xl border border-brand-100 flex items-center justify-between gap-4">
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          <span className="font-bold text-slate-900">Track Overview: </span>
          {activeTrack.tagline}
        </p>
        <span className="text-xs font-mono font-bold text-brand-700 shrink-0 hidden sm:inline">
          {activeTrack.nodes.length} Stages Mapped
        </span>
      </div>

      {/* Interactive Horizontal Career Path Pipeline */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeTrack.nodes.map((node, idx) => (
            <div key={node.id} className="relative">
              <PathNode
                node={node}
                index={idx}
                isSelected={selectedNode.id === node.id}
                onSelect={(n) => setSelectedNode(n)}
              />

              {/* Connector Arrow (on large screens) */}
              {idx < activeTrack.nodes.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Node Deep-Dive Milestone Inspector */}
      {selectedNode && (
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MilestoneTimeline selectedNode={selectedNode} />
        </motion.div>
      )}
    </div>
  );
}
