'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function AccordionItem({ title, children, isOpen, onToggle, className }: AccordionItemProps) {
  return (
    <div className={cn('border border-slate-200/80 rounded-2xl bg-white overflow-hidden transition-all duration-200 shadow-subtle', className)}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-brand-600 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg pr-4">{title}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180 text-brand-600',
          )}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="space-y-3.5">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
