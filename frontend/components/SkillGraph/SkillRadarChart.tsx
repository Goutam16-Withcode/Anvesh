'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RadarDataPoint {
  subject: string;
  candidateScore: number; // 0 - 100
  requiredScore: number;  // 0 - 100
  fullMark?: number;
}

interface SkillRadarChartProps {
  data: RadarDataPoint[];
  size?: number;
  className?: string;
}

export function SkillRadarChart({ data, size = 380, className = '' }: SkillRadarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const center = size / 2;
  const radius = (size - 90) / 2;
  const totalAxes = data.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Concentric circle levels (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (index: number, scoreRatio: number) => {
    // Start angle at top (-PI/2)
    const angle = index * angleStep - Math.PI / 2;
    const r = radius * scoreRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Generate SVG Polygon path string for a score set
  const generatePolygonPath = (getScore: (item: RadarDataPoint) => number) => {
    const points = data.map((item, idx) => {
      const ratio = Math.max(0.05, Math.min(1.0, getScore(item) / 100));
      const coords = getCoordinates(idx, ratio);
      return `${coords.x},${coords.y}`;
    });
    return points.join(' ');
  };

  const candidatePolygon = generatePolygonPath((d) => d.candidateScore);
  const requiredPolygon = generatePolygonPath((d) => d.requiredScore);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg width={size} height={size} className="overflow-visible select-none">
        <defs>
          {/* Gradients for polygons */}
          <linearGradient id="candidateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="requiredGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
          </linearGradient>
          <filter id="glowShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Concentric Grid Web */}
        {levels.map((lvl) => {
          const gridPoints = data.map((_, idx) => {
            const coords = getCoordinates(idx, lvl);
            return `${coords.x},${coords.y}`;
          }).join(' ');

          return (
            <g key={lvl}>
              <polygon
                points={gridPoints}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray={lvl < 1.0 ? '3 3' : 'none'}
              />
              <text
                x={center + 4}
                y={center - radius * lvl + 10}
                fill="#94a3b8"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="500"
              >
                {Math.round(lvl * 100)}%
              </text>
            </g>
          );
        })}

        {/* Radial Axis Lines */}
        {data.map((item, idx) => {
          const edgeCoords = getCoordinates(idx, 1.0);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={edgeCoords.x}
              y2={edgeCoords.y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}

        {/* Required Role Shape Polygon (Orange / Coral outline) */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          points={requiredPolygon}
          fill="url(#requiredGradient)"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Candidate Skills Shape Polygon (Indigo / Cyan fill) */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          points={candidatePolygon}
          fill="url(#candidateGradient)"
          stroke="#4f46e5"
          strokeWidth="2.5"
          filter="url(#glowShadow)"
        />

        {/* Candidate Vertex Points & Hover Hotspots */}
        {data.map((item, idx) => {
          const candidateCoords = getCoordinates(idx, Math.max(0.05, item.candidateScore / 100));
          const requiredCoords = getCoordinates(idx, Math.max(0.05, item.requiredScore / 100));
          const labelCoords = getCoordinates(idx, 1.18);
          const isHovered = hoveredIndex === idx;

          return (
            <g key={idx} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}>
              {/* Required Target Dot */}
              <circle
                cx={requiredCoords.x}
                cy={requiredCoords.y}
                r={3}
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1.5"
              />

              {/* Candidate Current Dot */}
              <circle
                cx={candidateCoords.x}
                cy={candidateCoords.y}
                r={isHovered ? 6 : 4.5}
                fill="#4f46e5"
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all cursor-pointer"
              />

              {/* Axis Label */}
              <text
                x={labelCoords.x}
                y={labelCoords.y}
                textAnchor={labelCoords.x > center + 10 ? 'start' : labelCoords.x < center - 10 ? 'end' : 'middle'}
                dominantBaseline="central"
                fill={isHovered ? '#1e1b4b' : '#475569'}
                fontWeight={isHovered ? '700' : '600'}
                fontSize="11"
                className="transition-colors cursor-pointer"
              >
                {item.subject}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend & Tooltip Summary */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span className="w-3 h-3 rounded-full bg-brand-600 ring-2 ring-brand-200" />
          <span>Candidate Profile ({Math.round(data.reduce((acc, d) => acc + d.candidateScore, 0) / data.length)}% avg)</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-200" />
          <span>Target Role Benchmark ({Math.round(data.reduce((acc, d) => acc + d.requiredScore, 0) / data.length)}% avg)</span>
        </div>
      </div>

      {hoveredIndex !== null && data[hoveredIndex] && (
        <div className="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-mono shadow-md flex items-center gap-3">
          <span className="font-bold text-slate-200">{data[hoveredIndex].subject}:</span>
          <span className="text-brand-300">You: {data[hoveredIndex].candidateScore}%</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-300">Required: {data[hoveredIndex].requiredScore}%</span>
          <span className="text-slate-500">|</span>
          <span className={data[hoveredIndex].candidateScore >= data[hoveredIndex].requiredScore ? 'text-emerald-400' : 'text-rose-400'}>
            Gap: {data[hoveredIndex].candidateScore - data[hoveredIndex].requiredScore}%
          </span>
        </div>
      )}
    </div>
  );
}
