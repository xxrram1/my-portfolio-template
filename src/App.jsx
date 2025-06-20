import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Preloader from './components/Preloader';
// ลบ Command as CommandIcon ออกจากการ import ด้านล่าง
import { FileText, Menu, X, Eye, UserCheck, Code, Briefcase } from 'lucide-react'; 
import ThemeToggle from './components/ThemeToggle.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import BackToTopButton from './components/BackToTopButton.jsx';
// ลบการ import CommandPalette.jsx
import WelcomeModal from './components/WelcomeModal.jsx';
import ContactModal from './components/ContactModal.jsx';
import { useVisitor } from './context/VisitorContext';
import useScrollRestoration from './hooks/useScrollRestoration';

const HomePage = lazy(() => import('./pages/HomePage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

const visitorIcons = {
  recruiter: <UserCheck size={20} />,
  tech: <Code size={20} />,
  client: <Briefcase size={20} />,
  guest: <Eye size={20} />,
  default: <Eye size={20} />
};

function MainApp() {
  const { t } = useTranslation();
  const location = useLocation();
  const { visitorType, openChangeViewModal } = useVisitor();
  useScrollRestoration();
  
  const [isAppReady, setIsAppReady] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // ลบ State ของ Command Palette
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const navLinks = [
    { labelKey: 'nav.overview', sectionId: 'hero' },
    { labelKey: 'nav.profile', sectionId: 'about' },
    { labelKey: 'nav.expertise', sectionId: 'skills' },
    { labelKey: 'nav.projects', sectionId: 'portfolio' },
    { labelKey: 'nav.blog', sectionId: 'blog' },
    { labelKey: 'nav.contact', sectionId: 'contact' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsAppReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(''); 
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px', threshold: 0 }
    );
    navLinks.forEach((link) => {
      const section = document.getElementById(link.sectionId);
      if (section) observer.observe(section);
    });
    return () => {
      navLinks.forEach((link) => {
        const section = document.getElementById(link.sectionId);
        if (section) observer.unobserve(section);
      });
    };
  }, [location.pathname, navLinks, isAppReady]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
        const onNonHomePage = location.pathname.startsWith('/article') || location.pathname.startsWith('/project');
        if (onNonHomePage) {
            setIsScrolled(true);
            return;
        }
        setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ลบฟังก์ชัน openCommandPaletteFromMenu
  
  return (
    <>
      <AnimatePresence>
        {!isAppReady && <Preloader />}
      </AnimatePresence>

      <div className={`transition-opacity duration-500 ${isAppReady ? 'opacity-100' : 'opacity-0'}`}>
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'dark:bg-slate-800 dark:text-white',
            duration: 4000,
          }}
        />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-slate-800 focus:text-slate-900 dark:focus:text-slate-100 focus:rounded-md focus:z-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
        >
          {t('skip_to_content')}
        </a>

        <WelcomeModal />
        
        {/* ลบ Component <CommandPalette /> */}

        <AnimatePresence>
          {isContactModalOpen && <ContactModal onClose={() => setContactModalOpen(false)} />}
        </AnimatePresence>

        <nav
          className={`fixed top-0 w-full z-40 transition-all duration-300 ${
            isScrolled ? 'bg-white/80 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'
          }`}
        >
           <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
            <RouterLink to="/" className="text-xl font-semibold tracking-wider text-slate-900 dark:text-slate-50 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900">
              KITTISAK P.
            </RouterLink>
            <div className="hidden lg:flex items-center space-x-6"> 
              {navLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-200 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900 ${
                    activeSection === link.sectionId
                      ? 'text-slate-900 dark:text-slate-50'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                  }`}
                >
                  {t(link.labelKey)}
                  {activeSection === link.sectionId && (
                    <motion.div
                      className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-indigo-500"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              <button
                onClick={openChangeViewModal}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
                aria-label={t('view_switcher.change_view')}
              >
                {visitorIcons[visitorType]}
              </button>
              
              {/* ลบปุ่มเปิด Command Palette */}

              <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
              <LanguageSwitcher />
            </div>
            <div className="lg:hidden flex items-center gap-2"> 
              <button
                onClick={openChangeViewModal}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
                aria-label={t('view_switcher.change_view')}
              >
                {visitorIcons[visitorType]}
              </button>
              <LanguageSwitcher />
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-slate-600 dark:text-slate-300 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
                aria-label={t('nav.open_menu')}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
               <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end mb-8">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-slate-600 dark:text-slate-300 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
                    aria-label={t('nav.close_menu')}
                  >
                    <X size={26} />
                  </button>
                </div>
                <nav className="flex flex-col space-y-5">
                  {navLinks.map((link) => (
                    <button
                      key={link.sectionId}
                      onClick={() => scrollToSection(link.sectionId)}
                      className="text-xl text-left text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      {t(link.labelKey)}
                    </button>
                  ))}
                </nav>

                {/* ลบส่วนของปุ่ม Command Palette ในเมนูมือถือ */}
                
                <div className="mt-auto pt-8 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-6 px-2">
                    <span className="text-base text-slate-700 dark:text-slate-200">
                      {t('nav.theme_switcher')}
                    </span>
                    <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
                  </div>
                  <a href="/Kittisak_Phanngeam_Resume.pdf" download="Kittisak_Phanngeam_Resume.pdf" className="w-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-3 font-medium text-sm tracking-wide uppercase hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 flex items-center justify-center space-x-3 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900">
                    <FileText size={18} />
                    <span>{t('nav.download_resume')}</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="main-content">
          <Suspense fallback={<div className="min-h-screen"/>}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage setContactModalOpen={setContactModalOpen} />} />
                <Route path="/article/:slug" element={<ArticlePage />} />
                <Route path="/project/:projectSlug" element={<CaseStudyPage />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        
        <footer className="py-8 px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto text-center text-xs text-slate-500 dark:text-slate-500 tracking-widest uppercase">
            © {new Date().getFullYear()} Kittisak Phanngeam. All Rights Reserved.
          </div>
        </footer>

        <BackToTopButton />
      </div>
    </>
  );
}

export default function App() {
  return (
      <MainApp />
  );
}