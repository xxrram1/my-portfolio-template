import { Sun, Moon } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ThemeToggle = ({ theme, onToggle }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
      aria-label={t('nav.toggle_theme')}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
