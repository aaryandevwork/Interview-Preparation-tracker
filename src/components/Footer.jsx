import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer 
      className="mt-16 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono transition-colors"
      style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
    >
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-500" />
        <span>Interview Practice Tracker &mdash; Stay Consistent.</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span>Designed & Developed by</span>
        <span className="font-medium px-2 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}>
          Aaryan
        </span>
        <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 inline" />
      </div>
    </footer>
  );
};