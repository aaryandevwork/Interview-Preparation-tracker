import { useEffect, useState } from "react";
import { INITIAL_QUESTIONS } from "./constants/initialData";
import { StatsOverview } from "./components/StatsOverview";
import { QuestionModal } from "./components/QuestionModal";
import { Header } from "./components/Header";

function App() {

   const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('interview_tracker_data');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('interview_theme') === 'dark';
  });

  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  console.log(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Sync LocalStorage for questions
  useEffect(() => {
    localStorage.setItem('interview_tracker_data', JSON.stringify(questions));
  }, [questions]);

  // Sync Dark Mode class & LocalStorage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('interview_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('interview_theme', 'light');
    }
  }, [darkMode]);

  const handleStatusToggle = (id) => {
    const statusCycle = {
      Pending: 'In Progress',
      'In Progress': 'Completed',
      Completed: 'Pending',
    };
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: statusCycle[q.status] } : q))
    );
  };

  const handleSaveQuestion = (formData) => {
    if (editingQuestion) {
      setQuestions((prev) =>
        prev.map((q) => (q.id === editingQuestion.id ? { ...q, ...formData } : q))
      );
    } else {
      const newEntry = {
        ...formData,
        id: `q-${Date.now()}`,
        dateAdded: new Date().toISOString().split('T')[0],
      };
      setQuestions((prev) => [newEntry, ...prev]);
    }
    setEditingQuestion(null);
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleEdit = (q) => {
    setEditingQuestion(q);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 transition-colors duration-200" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div className="max-w-7xl mx-auto">
        <Header
          onOpenModal={() => {
            setEditingQuestion(null);
            setIsModalOpen(true);
          }}
          viewMode={viewMode}
          setViewMode={setViewMode}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <StatsOverview questions={questions} />


        <QuestionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingQuestion(null);
          }}
          onSubmitQuestion={handleSaveQuestion}
          editingQuestion={editingQuestion}
        />
      </div>
    </div>
  );
}

export default App;
