import React from 'react';
import { Plus, BookOpen, LayoutGrid, List, Sun, Moon } from 'lucide-react';

export const Header = ({ onOpenModal, viewMode, setViewMode, darkMode, setDarkMode }) => {
  return (
    <header className="border-b pb-6 mb-8 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
            Interview Preparation Journal
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-normal tracking-tight" style={{ color: 'var(--text-main)' }}>
            Practice Tracker
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Dark / Light Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-lg border transition-all"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)'
            }}
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          {/* View Toggle - Hidden on mobile (<768px), visible on desktop (≥768px) */}
          <div 
            className="hidden md:flex p-1 rounded-lg items-center gap-1 border" 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <button
              onClick={() => setViewMode('grid')}
              className="p-2 rounded-md transition-all"
              style={{
                backgroundColor: viewMode === 'grid' ? 'var(--bg-input)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--text-main)' : 'var(--text-muted)'
              }}
              title="Notebook View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className="p-2 rounded-md transition-all"
              style={{
                backgroundColor: viewMode === 'table' ? 'var(--bg-input)' : 'transparent',
                color: viewMode === 'table' ? 'var(--text-main)' : 'var(--text-muted)'
              }}
              title="Compact Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all shadow-xs active:scale-95"
            style={{
              backgroundColor: darkMode ? '#F4F4F5' : '#1C1917',
              color: darkMode ? '#18181B' : '#FBF9F5',
            }}
          >
            <Plus className="w-4 h-4" />
            <span>New Entry</span>
          </button>
        </div>
      </div>
    </header>
  );
};