'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookmarkButtonProps {
  jobId: string;
  className?: string;
}

export function BookmarkButton({ jobId, className = '' }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('anvesh_saved_jobs');
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        setIsBookmarked(parsed.includes(jobId));
      }
    } catch (_) {}
  }, [jobId]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const saved = localStorage.getItem('anvesh_saved_jobs');
      let parsed: string[] = saved ? JSON.parse(saved) : [];

      if (parsed.includes(jobId)) {
        parsed = parsed.filter((id) => id !== jobId);
        setIsBookmarked(false);
      } else {
        parsed.push(jobId);
        setIsBookmarked(true);
      }

      localStorage.setItem('anvesh_saved_jobs', JSON.stringify(parsed));
    } catch (_) {
      setIsBookmarked(!isBookmarked);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={toggleBookmark}
      title={isBookmarked ? 'Remove Bookmark' : 'Save Job'}
      className={`p-2 rounded-xl transition-all ${
        isBookmarked
          ? 'bg-brand-50 text-brand-600 border border-brand-200'
          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
      } ${className}`}
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-brand-600' : ''}`} />
    </motion.button>
  );
}
