import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

export const QuestionModal = ({
  isOpen,
  onClose,
  onSubmitQuestion,
  editingQuestion,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      category: 'DSA',
      difficulty: 'Medium',
      status: 'Pending',
      notes: '',
    },
  });

  useEffect(() => {
    if (editingQuestion) {
      reset({
        title: editingQuestion.title,
        category: editingQuestion.category,
        difficulty: editingQuestion.difficulty,
        status: editingQuestion.status,
        notes: editingQuestion.notes || '',
      });
    } else {
      reset({
        title: '',
        category: 'DSA',
        difficulty: 'Medium',
        status: 'Pending',
        notes: '',
      });
    }
  }, [editingQuestion, reset, isOpen]);

  if (!isOpen) return null;

  const onFormSubmit = (data) => {
    onSubmitQuestion(data);
    onClose();
  };

  const inputStyle = {
    backgroundColor: 'var(--bg-input)',
    borderColor: 'var(--border-color)',
    color: 'var(--text-main)',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div 
        className="border w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className="text-xl font-serif" style={{ color: 'var(--text-main)' }}>
            {editingQuestion ? 'Edit Journal Entry' : 'New Practice Entry'}
          </h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
              Title / Problem Statement <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 3, message: 'Must be at least 3 characters' },
              })}
              placeholder="e.g. Implement LRU Cache with O(1) operations"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
              style={inputStyle}
            />
            {errors.title && (
              <p className="text-xs text-rose-500 mt-1 font-mono">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                Category
              </label>
              <select {...register('category')} className="w-full px-3 py-2 border rounded-lg text-xs font-mono" style={inputStyle}>
                <option value="DSA">DSA</option>
                <option value="Git">Git</option>
                <option value="Technical">Technical</option>
                <option value="Machine Coding">Machine Coding</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                Difficulty
              </label>
              <select {...register('difficulty')} className="w-full px-3 py-2 border rounded-lg text-xs font-mono" style={inputStyle}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Status</label>
            <select {...register('status')} className="w-full px-3 py-2 border rounded-lg text-xs font-mono" style={inputStyle}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
              Notes / Takeaways (Optional)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="Key edge cases, time complexity, or concepts remembered..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
              style={inputStyle}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-mono font-medium transition-all"
              style={{ backgroundColor: 'var(--text-main)', color: 'var(--bg-main)' }}
            >
              {editingQuestion ? 'Update Entry' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};