import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

// Import Pages
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CaseStudyPage from './pages/CaseStudyPage';

// Import Components & Hooks
import { FileText, Menu, X, Command as CommandIcon, Eye, UserCheck, Code, Briefcase } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import BackToTopButton from './components/BackToTopButton.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import WelcomeModal from './components/WelcomeModal.jsx';
import { useVisitor } from './context/VisitorContext';
import useScrollRestoration from './hooks/useScrollRestoration';

const visitorIcons = {
  recruiter: <UserCheck size={20} />,
  tech: <Code size={20} />,
  client: <Briefcase size={20} />,
  guest: <Eye size={20} />,
  default: <Eye size={20} />
};

const App = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { visitorType, openChangeViewModal } = useVisitor();
  
  useScrollRestoration();

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
     const initialNavLinks = [
        { labelKey: 'nav.overview', sectionId: 'hero' },
        { labelKey: 'nav.profile', sectionId: 'about' },
        { labelKey: 'nav.expertise', sectionId: 'skills' },
        { labelKey: 'nav.projects', sectionId: 'portfolio' },
        { labelKey: 'nav.blog', sectionId: 'blog' },
        { labelKey: 'nav.contact', sectionId: 'contact' },
      ];
      setNavLinks(initialNavLinks);

    const handleScroll = () => {
        const onNonHomePage = location.pathname.startsWith('/article') || location.pathname.startsWith('/project');
        if (onNonHomePage) {
            setIsScrolled(true);
            return;
        }
        setIsScrolled(window.scrollY > 50);
    };

    if (location.pathname === '/') {
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

        initialNavLinks.forEach((link) => {
            const section = document.getElementById(link.sectionId);
            if (section) observer.observe(section);
        });
        
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
             initialNavLinks.forEach((link) => {
                const section = document.getElementById(link.sectionId);
                if (section) observer.unobserve(section);
            });
            window.removeEventListener('scroll', handleScroll);
        };
    } else {
        setActiveSection('');
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }
}, [i18n, location.pathname]);


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const openCommandPaletteFromMenu = () => {
    setIsMenuOpen(false);
    // ใช้ setTimeout เล็กน้อยเพื่อให้แน่ใจว่า animation ปิดเมนูทำงานไปก่อน
    setTimeout(() => {
      setCommandPaletteOpen(true);
    }, 150);
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-50 font-sans transition-colors duration-300">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-slate-800 focus:text-slate-900 dark:focus:text-slate-100 focus:rounded-md focus:z-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
      >
        {t('skip_to_content')}
      </a>

      <WelcomeModal />
      <CommandPalette 
        open={isCommandPaletteOpen}
        setOpen={setCommandPaletteOpen}
        scrollToSection={scrollToSection}
        handleThemeToggle={handleThemeToggle}
        currentTheme={theme}
      />

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
            <button 
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
              aria-label={t('nav.open_command_palette')}
            >
              <CommandIcon size={20} />
            </button>
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
            {/* --- ส่วนที่แก้ไข: นำปุ่ม Command Palette ออกจาก Header ของ Mobile --- */}
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

              {/* --- ส่วนที่แก้ไข: เพิ่มปุ่ม Command Palette ใน Mobile Menu --- */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                    onClick={openCommandPaletteFromMenu}
                    className="flex items-center gap-4 w-full text-left text-base text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-md p-2 -ml-2"
                >
                    <CommandIcon className="w-5 h-5" />
                    <span>{t('command_palette.title')}</span>
                </button>
              </div>

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
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/project/:projectSlug" element={<CaseStudyPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <footer className="py-8 px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto text-center text-xs text-slate-500 dark:text-slate-500 tracking-widest uppercase">
          © {new Date().getFullYear()} Kittisak Phanngeam. All Rights Reserved.
        </div>
      </footer>

      <BackToTopButton />
    </div>
  );
};

export default App;
