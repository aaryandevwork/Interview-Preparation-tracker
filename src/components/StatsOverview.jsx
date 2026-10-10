import React from 'react';
import { CheckCircle2, Code2, Cpu, FileCode2 } from 'lucide-react';

export const StatsOverview = ({ questions }) => {
  const total = questions.length;
  const completed = questions.filter((q) => q.status === 'Completed').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const dsaDone = questions.filter((q) => q.category === 'DSA' && q.status === 'Completed').length;
  const dsaTotal = questions.filter((q) => q.category === 'DSA').length;

  const mcDone = questions.filter((q) => q.category === 'Machine Coding' && q.status === 'Completed').length;
  const mcTotal = questions.filter((q) => q.category === 'Machine Coding').length;

  const techDone = questions.filter((q) => (q.category === 'Technical' || q.category === 'Git') && q.status === 'Completed').length;
  const techTotal = questions.filter((q) => q.category === 'Technical' || q.category === 'Git').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[
        { title: 'Overall Mastery', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />, val: `${percentage}%`, sub: `${completed} / ${total} Done`, isProgress: true },
        { title: 'DSA Solved', icon: <Code2 className="w-4 h-4 text-amber-600" />, val: `${dsaDone}`, subTotal: dsaTotal, sub: 'Data Structures & Algorithms' },
        { title: 'Machine Coding', icon: <Cpu className="w-4 h-4 text-amber-600" />, val: `${mcDone}`, subTotal: mcTotal, sub: 'UI Projects & Components' },
        { title: 'Tech & Git', icon: <FileCode2 className="w-4 h-4 text-amber-600" />, val: `${techDone}`, subTotal: techTotal, sub: 'System Concepts & Tools' },
      ].map((card, idx) => (
        <div 
          key={idx} 
          className="border p-5 rounded-xl flex flex-col justify-between shadow-xs transition-colors"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{card.title}</span>
            {card.icon}
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl font-serif" style={{ color: 'var(--text-main)' }}>
                {card.val} {card.subTotal !== undefined && <span className="text-sm font-sans" style={{ color: 'var(--text-light)' }}>/ {card.subTotal}</span>}
              </span>
              {card.isProgress && <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{card.sub}</span>}
            </div>
            {card.isProgress ? (
              <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%`, backgroundColor: 'var(--text-main)' }} />
              </div>
            ) : (
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{card.sub}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};