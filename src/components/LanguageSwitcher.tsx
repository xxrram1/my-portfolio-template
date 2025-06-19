import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => handleLanguageChange('th')}
        className={`uppercase font-semibold ${i18n.language === 'th' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
        disabled={i18n.language === 'th'}
      >
        TH
      </button>
      <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`uppercase font-semibold ${i18n.language === 'en' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
        disabled={i18n.language === 'en'}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;