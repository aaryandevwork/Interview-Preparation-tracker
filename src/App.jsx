import React, { useState, useEffect } from "react";
import { INITIAL_QUESTIONS } from "./constants/initialData";
import { Header } from "./components/Header";
import { StatsOverview } from "./components/StatsOverview";
import { SearchAndFilters } from "./components/SearchAndFilters";
import { QuestionCard } from "./components/QuestionCard";
import { QuestionRow } from "./components/QuestionRow";
import { QuestionModal } from "./components/QuestionModal";
import { Inbox } from "lucide-react";
import { Footer } from "./components/Footer";

function App() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem("interview_tracker_data");
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("interview_theme") === "dark";
  });

  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Sync LocalStorage for questions
  useEffect(() => {
    localStorage.setItem("interview_tracker_data", JSON.stringify(questions));
  }, [questions]);

  // Sync Dark Mode class & LocalStorage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("interview_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("interview_theme", "light");
    }
  }, [darkMode]);

  const handleStatusToggle = (id) => {
    const statusCycle = {
      Pending: "In Progress",
      "In Progress": "Completed",
      Completed: "Pending",
    };
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: statusCycle[q.status] } : q,
      ),
    );
  };

  const handleSaveQuestion = (formData) => {
    if (editingQuestion) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestion.id ? { ...q, ...formData } : q,
        ),
      );
    } else {
      const newEntry = {
        ...formData,
        id: `q-${Date.now()}`,
        dateAdded: new Date().toISOString().split("T")[0],
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

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.notes && q.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory
      ? q.category === selectedCategory
      : true;
    const matchesDifficulty = selectedDifficulty
      ? q.difficulty === selectedDifficulty
      : true;
    const matchesStatus = selectedStatus ? q.status === selectedStatus : true;
    return (
      matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
    );
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("grid");
      }
    };

    // Run on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="min-h-screen p-4 sm:p-8 transition-colors duration-200"
      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
    >
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

        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onReset={() => {
            setSearchQuery("");
            setSelectedCategory("");
            setSelectedDifficulty("");
            setSelectedStatus("");
          }}
        />

        {filteredQuestions.length === 0 ? (
          <div
            className="border border-dashed rounded-xl p-12 text-center"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <Inbox
              className="w-8 h-8 mx-auto mb-3"
              style={{ color: "var(--text-light)" }}
            />
            <p className="font-serif text-lg mb-1">
              No preparation entries found
            </p>
            <p
              className="text-xs font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              Try adjusting your search criteria or create a new question entry.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusToggle={handleStatusToggle}
              />
            ))}
          </div>
        ) : (
          <div
            className="border rounded-xl overflow-hidden shadow-xs"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="border-b text-[14px] font-mono uppercase"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--text-muted)",
                  }}
                >
                  <th className="py-3 px-4">Title & Notes</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Added</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((q) => (
                  <QuestionRow
                    key={q.id}
                    question={q}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onStatusToggle={handleStatusToggle}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

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

      <Footer />
    </div>
  );
}

export default App;
