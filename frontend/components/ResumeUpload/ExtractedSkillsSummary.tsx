'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ExtractedSkillsSummaryProps {
  skills: string[];
  onUpdateSkills: (skills: string[]) => void;
}

export function ExtractedSkillsSummary({ skills, onUpdateSkills }: ExtractedSkillsSummaryProps) {
  const [newSkillInput, setNewSkillInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    onUpdateSkills([...skills, trimmed]);
    setNewSkillInput('');
    setIsAdding(false);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdateSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            Verified Extracted Skills ({skills.length})
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Extracted directly from resume evidence and mapped to the canonical skill ontology.
          </p>
        </div>

        {!isAdding && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="text-xs h-8 gap-1 font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Skill
          </Button>
        )}
      </div>

      {/* Add Skill Mini Form */}
      {isAdding && (
        <form onSubmit={handleAddSkill} className="flex items-center gap-2">
          <Input
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            placeholder="e.g. CUDA, Kubernetes, Rust..."
            className="h-8 text-xs max-w-xs"
            autoFocus
          />
          <Button type="submit" size="sm" className="h-8 text-xs font-semibold">
            Add
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsAdding(false);
              setNewSkillInput('');
            }}
            className="h-8 text-xs text-slate-500"
          >
            Cancel
          </Button>
        </form>
      )}

      {/* Skill Chips */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs font-medium hover:border-brand-300 hover:bg-brand-50/40 transition-colors group shadow-2xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-slate-400 hover:text-red-500 p-0.5 rounded-full hover:bg-slate-200/60 transition-colors ml-0.5"
                title="Remove Skill"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
