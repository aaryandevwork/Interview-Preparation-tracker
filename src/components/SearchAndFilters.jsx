import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export const SearchAndFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  setSelectedStatus,
  onReset,
}) => {
  const categories = ['DSA', 'Git', 'Technical', 'Machine Coding'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const statuses = ['Pending', 'In Progress', 'Completed'];

  const hasActiveFilters = searchQuery || selectedCategory || selectedDifficulty || selectedStatus;

  const selectStyle = {
    backgroundColor: 'var(--bg-input)',
    borderColor: 'var(--border-color)',
    color: 'var(--text-main)',
  };

  return (
    <div 
      className="border p-4 rounded-xl mb-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between transition-colors"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-light)' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search entry title or notes..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none transition-all"
          style={selectStyle}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border rounded-lg text-xs font-mono" style={selectStyle}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="px-3 py-2 border rounded-lg text-xs font-mono" style={selectStyle}>
          <option value="">All Difficulties</option>
          {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-3 py-2 border rounded-lg text-xs font-mono" style={selectStyle}>
          <option value="">All Statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        {hasActiveFilters && (
          <button onClick={onReset} className="p-2 transition-colors" style={{ color: 'var(--text-muted)' }} title="Reset Filters">
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};