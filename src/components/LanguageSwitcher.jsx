import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'th', label: 'TH' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: 'ZH' },
  ];

  return (
    <div className="flex items-center space-x-2 text-sm p-1 bg-slate-100 dark:bg-slate-800 rounded-full">
      {languages.map((lang, index) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900 ${
            i18n.language.startsWith(lang.code) 
              ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
          disabled={i18n.language.startsWith(lang.code)}
          aria-current={i18n.language.startsWith(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
