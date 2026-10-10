import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

export const QuestionRow = ({
  question,
  onEdit,
  onDelete,
  onStatusToggle,
}) => {
  return (
    <tr className="border-b transition-colors hover:opacity-90" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
      <td className="py-3 px-4">
        <p className="font-serif text-sm font-medium" style={{ color: 'var(--text-main)' }}>{question.title}</p>
        {question.notes && <p className="text-xs truncate max-w-md" style={{ color: 'var(--text-muted)' }}>{question.notes}</p>}
      </td>
      <td className="py-3 px-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{question.category}</td>
      <td className="py-3 px-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{question.difficulty}</td>
      <td className="py-3 px-4">
        <button
          onClick={() => onStatusToggle(question.id)}
          className="text-xs font-mono px-2 py-1 rounded border transition-colors"
          style={{ backgroundColor: 'var(--bg-accent)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
        >
          {question.status}
        </button>
      </td>
      <td className="py-3 px-4 text-xs font-mono" style={{ color: 'var(--text-light)' }}>{question.dateAdded}</td>
      <td className="py-3 px-4 text-right space-x-2">
        <button onClick={() => onEdit(question)} style={{ color: 'var(--text-muted)' }}>
          <Edit3 className="w-3.5 h-3.5 inline" />
        </button>
        <button onClick={() => onDelete(question.id)} className="text-rose-500 hover:text-rose-600">
          <Trash2 className="w-3.5 h-3.5 inline" />
        </button>
      </td>
    </tr>
  );
};