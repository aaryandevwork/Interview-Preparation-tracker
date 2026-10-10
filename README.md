# 📖 Interview Practice Tracker

A modern, responsive, minimalist web application built to organize, track, and manage technical interview preparation questions. Built with an **Organic Warm Studio & Journal** aesthetic, supporting full dark mode customization, persistent local storage, and flexible search/filter capabilities.

**Developed by:** Aaryan

---

## ✨ Features

- **🎨 Dynamic Warm Journal Theme:** Includes both Light & Dark modes powered by global CSS variables for seamless switching.
- **📱 Responsive Layout:** Mobile-optimized card grid view and desktop compact table view with auto-switch layout adjustments.
- **📊 Real-time Stats Overview:** Automatically calculates overall completion rates and progress breakdowns across DSA, Machine Coding, Git, and Technical categories.
- **🔍 Multi-criteria Search & Filters:** Search entries by title or notes, and filter dynamically by category, difficulty level, or completion status.
- **🔄 Instant Status Cycling:** Quick one-click state machine toggling between `Pending` → `In Progress` → `Completed`.
- **💾 Local Storage Persistence:** Automatically saves and syncs your question journal entries to browser `localStorage`.
- **✍️ Form Validation:** Integrated with `react-hook-form` for creating and editing practice entries with smooth field validation.

---

## 🛠️ Tech Stack

- **Frontend Library:** React (JS)
- **Styling:** Tailwind CSS + Global CSS Theme Variables
- **Form Management:** React Hook Form
- **Icons:** Lucide React

---

## 📁 Project Architecture

```text
src/
├── constants/
│   └── initialData.js       # Pre-loaded practice questions
├── components/
│   ├── Header.jsx           # Top navbar, theme switcher, view controls
│   ├── StatsOverview.jsx    # Metric overview cards & progress bar
│   ├── SearchAndFilters.jsx # Query search & drop-down filters
│   ├── QuestionCard.jsx     # Card view item component
│   ├── QuestionRow.jsx      # Compact table row component
│   ├── QuestionModal.jsx    # Form modal for adding/editing questions
│   └── Footer.jsx           # Custom application footer
├── App.jsx                  # Main application state & window resize handlers
├── index.css                # Global CSS variables & Tailwind config
└── main.jsx                 # Application root entry point
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v16 or higher) and **npm** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aaryandevwork/Interview-Preparation-tracker.git
   cd Interview-Preparation-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install required icons & form handler:**
   ```bash
   npm install tailwindcss @tailwindcss/vite lucide-react react-hook-form
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🛠️ Configuration & Customization

### Theme Variables (`src/index.css`)

Custom theme colors are declared at the root level using standard CSS variables:

```css
:root {
  --bg-main: #FBF9F5;
  --bg-card: #F6F3EC;
  --bg-input: #FFFFFF;
  --text-main: #1C1917;
  --text-muted: #78716C;
  --border-color: #E7E5E4;
}

.dark {
  --bg-main: #121214;
  --bg-card: #18181B;
  --bg-input: #202024;
  --text-main: #F4F4F5;
  --text-muted: #A1A1AA;
  --border-color: #27272A;
}
```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

*Crafted for continuous learning & interview success by **Aaryan**.*