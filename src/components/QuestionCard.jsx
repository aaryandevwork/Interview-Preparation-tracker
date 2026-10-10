import React from 'react';
import { Trash2, Edit3, Calendar } from 'lucide-react';

export const QuestionCard = ({
  question,
  onEdit,
  onDelete,
  onStatusToggle,
}) => {
  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  const statusBadge = {
    Pending: 'opacity-70 hover:opacity-100',
    'In Progress': 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    Completed: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  };

  return (
    <div 
      className="border p-5 rounded-xl shadow-xs transition-all flex flex-col justify-between group"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span 
            className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md border"
            style={{ 
              backgroundColor: 'var(--bg-accent)', 
              borderColor: 'var(--border-color)',
              color: 'var(--text-muted)'
            }}
          >
            {question.category}
          </span>
          <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${difficultyColors[question.difficulty]}`}>
            {question.difficulty}
          </span>
        </div>

        <h3 className="font-serif text-lg leading-snug mb-2 font-normal" style={{ color: 'var(--text-main)' }}>
          {question.title}
        </h3>

        {question.notes && (
          <p 
            className="text-xs font-sans leading-relaxed mb-4 p-3 rounded-md border italic"
            style={{ 
              backgroundColor: 'var(--bg-accent)', 
              borderColor: 'var(--border-color)',
              color: 'var(--text-muted)'
            }}
          >
            "{question.notes}"
          </p>
        )}
      </div>

      <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={() => onStatusToggle(question.id)}
          className={`text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-transparent transition-all ${statusBadge[question.status]}`}
          style={{ backgroundColor: 'var(--bg-accent)', color: 'var(--text-main)' }}
        >
          ● {question.status}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono flex items-center gap-1" style={{ color: 'var(--text-light)' }}>
            <Calendar className="w-3 h-3" />
            {question.dateAdded}
          </span>
          <button
            onClick={() => onEdit(question)}
            className="p-1 transition-colors"
            style={{ color: 'var(--text-light)' }}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(question.id)}
            className="p-1 text-rose-500 hover:text-rose-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};