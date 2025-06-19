import { Sun, Moon } from 'lucide-react';
import React from 'react';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full text-slate-400 hover:text-slate-50 hover:bg-slate-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;