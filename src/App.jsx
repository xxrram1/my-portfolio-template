import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Github, Linkedin, FileText, Menu, X } from 'lucide-react';
import { projects, achievements, expertise } from './data.jsx'; // <--- แก้ไขจาก .js เป็น .jsx
import ProjectModal from './components/ProjectModal.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import { useTranslation } from 'react-i18next';

// ... โค้ดที่เหลือเหมือนเดิม
const Portfolio = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { labelKey: 'nav.overview', sectionId: 'hero' },
    { labelKey: 'nav.profile', sectionId: 'about' },
    { labelKey: 'nav.expertise', sectionId: 'skills' },
    { labelKey: 'nav.projects', sectionId: 'portfolio' },
    { labelKey: 'nav.contact', sectionId: 'contact' },
  ];

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
      setIsScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);
  
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleMobileMenuLinkClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };


  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-50 font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-wider text-slate-900 dark:text-slate-50">
            KITTISAK P.
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-sm font-medium tracking-wide text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors duration-200 uppercase"
              >
                {t(link.labelKey)}
              </button>
            ))}
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            <LanguageSwitcher />
          </div>
          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-300"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-slate-600 dark:text-slate-300"
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>
            <nav className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => handleMobileMenuLinkClick(link.sectionId)}
                  className="text-xl text-left text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t(link.labelKey)}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <button className="w-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-3 font-medium text-sm tracking-wide uppercase hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 flex items-center justify-center space-x-3 rounded-md">
                <FileText size={18} />
                <span>{t('nav.download_resume')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-8 relative pt-24 sm:pt-0">
         <div className="absolute inset-0 bg-white dark:bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-16 items-center relative z-10">
          <div className="md:col-span-3">
            <div className="mb-6">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
                {t('hero.role')}
              </div>
              <h1 className="text-4xl md:text-6xl font-light mb-4 text-slate-900 dark:text-slate-50 leading-tight">
                {t('hero.name_line1')}
                <div className="font-normal text-slate-700 dark:text-slate-300">{t('hero.name_line2')}</div>
              </h1>
              <div className="w-24 h-0.5 bg-slate-400 dark:bg-slate-600 mb-8"></div>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
              {t('hero.description')}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-slate-500 dark:text-slate-400 mb-2 flex justify-center">
                    {achievement.icon}
                  </div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t(achievement.titleKey)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">
                    {t(achievement.descriptionKey)}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('portfolio')}
              className="bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950 px-10 py-4 font-medium text-sm tracking-wide uppercase hover:bg-slate-700 dark:hover:bg-slate-200 transition-all duration-300 rounded"
            >
              {t('hero.view_portfolio')}
            </button>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-96 bg-slate-200 dark:bg-slate-800 relative overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                  alt="Professional Portrait of Kittisak Phanngeam"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/10 dark:bg-slate-950/20"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-slate-300 dark:bg-slate-700 opacity-50 rounded"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-slate-300 dark:border-slate-600 rounded"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown
            size={24}
            className="text-slate-500 dark:text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300 transition-colors animate-pulse"
            onClick={() => scrollToSection('about')}
          />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        data-animate
        className={`py-24 px-8 bg-slate-50 dark:bg-slate-900/50 transition-all duration-1000 ${
          visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-4">
                {t('about.title')}
              </div>
              <h2 className="text-3xl font-light mb-8 text-slate-900 dark:text-slate-50">
                {t('about.heading')}
              </h2>
              <div className="w-16 h-0.5 bg-slate-300 dark:bg-slate-600 mb-8"></div>
            </div>

            <div className="space-y-6 text-slate-600 dark:text-slate-300">
              <p className="leading-relaxed">{t('about.p1')}</p>
              <p className="leading-relaxed">{t('about.p2')}</p>
              <p className="leading-relaxed">{t('about.p3')}</p>
            </div>
          </div>
        </div>
      </section>

       {/* Skills Section */}
      <section 
        id="skills" 
        data-animate
        className={`py-24 px-8 transition-all duration-1000 ${
          visibleSections.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-4">
              {t('skills.title')}
            </div>
            <h2 className="text-3xl font-light text-slate-900 dark:text-slate-50">
              {t('skills.heading')}
            </h2>
            <div className="w-16 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(expertise).map(([categoryKey, skillList], index) => (
              <div 
                key={categoryKey}
                className="group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-8 h-full hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-300 rounded-lg">
                  <h3 className="text-lg font-medium mb-8 text-slate-900 dark:text-slate-50 uppercase tracking-wide">
                    {t(categoryKey)}
                  </h3>
                  <div className="space-y-4">
                    {skillList.map((skillKey) => (
                      <div 
                        key={skillKey}
                        className="flex items-start space-x-4 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors"
                      >
                        <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{t(skillKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section 
        id="portfolio" 
        data-animate
        className={`py-24 px-8 bg-slate-50 dark:bg-slate-900/30 transition-all duration-1000 ${
          visibleSections.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-4">
              {t('portfolio.title')}
            </div>
            <h2 className="text-3xl font-light text-slate-900 dark:text-slate-50">
              {t('portfolio.heading')}
            </h2>
            <div className="w-16 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-500 rounded-lg">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.thumbnail}
                      alt={t(project.titleKey)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
                      {t(project.categoryKey)}
                    </div>
                    <h3 className="text-xl font-medium text-slate-900 dark:text-slate-50 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {t(project.titleKey)}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      {t(project.typeKey)}
                    </p>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>{t('modal.duration')}: {project.duration}</span>
                      <span>{t('modal.team_size')}: {project.team}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        data-animate
        className={`py-24 px-8 transition-all duration-1000 ${
          visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-4">
            {t('contact.title')}
          </div>
          <h2 className="text-3xl font-light text-slate-900 dark:text-slate-50 mb-8">
            {t('contact.heading')}
          </h2>
          <div className="w-16 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mb-12"></div>
          
          <p className="text-slate-600 dark:text-slate-300 mb-16 leading-relaxed max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
          
          <div className="flex justify-center gap-8 mb-16">
              <a href="mailto:kittisak.phanngeam@example.com" aria-label="Email" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Mail size={28} /></a>
              <a href="#" aria-label="LinkedIn" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Linkedin size={28} /></a>
              <a href="#" aria-label="GitHub" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Github size={28} /></a>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="mailto:kittisak.phanngeam@example.com" className="bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950 px-10 py-4 font-medium text-sm tracking-wide uppercase hover:bg-slate-700 dark:hover:bg-slate-200 transition-all duration-300 flex items-center justify-center space-x-3 rounded-md">
              <Mail size={18} />
              <span>{t('contact.send_message')}</span>
            </a>
            <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-10 py-4 font-medium text-sm tracking-wide uppercase hover:border-slate-500 hover:text-slate-900 dark:hover:border-slate-500 dark:hover:text-slate-200 transition-all duration-300 flex items-center justify-center space-x-3 rounded-md">
              <FileText size={18} />
              <span>{t('nav.download_resume')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs text-slate-500 dark:text-slate-500 tracking-widest uppercase">
            © 2025 Kittisak Phanngeam. All Rights Reserved.
          </div>
        </div>
      </footer>
      
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default Portfolio;