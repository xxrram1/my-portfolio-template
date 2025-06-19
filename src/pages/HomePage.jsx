import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useVisitor } from '../context/VisitorContext';

// Import Data and Components needed for this page
import { projects, achievements, expertise } from '../data.jsx';
import BlogSection from '../components/BlogSection.jsx';
import { ChevronDown, Mail, Github, Linkedin, FileText, BookOpen, Star } from 'lucide-react';

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};
const skillsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};
const skillItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// --- Component ย่อยสำหรับ Project Card ---
const ProjectCard = ({ project, isHighlighted }) => {
    const { t } = useTranslation();
    return (
        <Link to={`/project/${project.slug}`} key={project.id} className="block h-full">
            <motion.div 
                className={`group relative cursor-pointer h-full transition-all duration-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 flex flex-col overflow-hidden ${isHighlighted ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={skillItemVariants}
            >
                {isHighlighted && 
                    <div className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1">
                        <Star size={12} /> 
                        <span>HIGHLIGHT</span>
                    </div>
                }
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.thumbnail}
                    alt={t(project.titleKey)}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
                    {t(project.categoryKey)}
                  </p>
                  <h3 className="text-xl font-medium text-slate-900 dark:text-slate-50 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
                    {t(project.descriptionKey)}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 font-semibold text-sm flex items-center gap-2">
                    <BookOpen size={16} />
                    {t('portfolio.view_case_study')}
                  </div>
                </div>
            </motion.div>
        </Link>
    );
};


const HomePage = () => {
  const { t } = useTranslation();
  const { visitorType } = useVisitor();

  // --- Logic ในการจัดลำดับ Section ---
  const sectionOrder = useMemo(() => {
    switch (visitorType) {
      case 'recruiter':
        return ['hero', 'portfolio', 'skills', 'about', 'blog', 'contact'];
      case 'tech':
        return ['hero', 'skills', 'portfolio', 'about', 'blog', 'contact'];
      case 'client':
        return ['hero', 'portfolio', 'about', 'skills', 'blog', 'contact'];
      default:
        return ['hero', 'about', 'skills', 'portfolio', 'blog', 'contact'];
    }
  }, [visitorType]);

  // --- Logic ในการจัดลำดับและไฮไลท์โปรเจกต์ ---
  const sortedAndHighlightedProjects = useMemo(() => {
    const getScore = (project) => {
      let score = 0;
      if (visitorType === 'recruiter' && project.tags.includes('business-impact')) score += 10;
      if (visitorType === 'tech' && project.tags.includes('tech-heavy')) score += 10;
      if (visitorType === 'client' && project.tags.includes('visual-design')) score += 10;
      return score;
    };
    
    // ใช้ slice() เพื่อสร้างสำเนาใหม่ก่อน sort เพื่อไม่ให้กระทบ array เดิม
    return projects.slice().sort((a, b) => getScore(b) - getScore(a));
  }, [visitorType, projects]);

  const shouldHighlight = (project) => {
    if (visitorType === 'recruiter') return project.tags.includes('business-impact');
    if (visitorType === 'tech') return project.tags.includes('tech-heavy');
    if (visitorType === 'client') return project.tags.includes('visual-design');
    return false;
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = {
    hero: (
      <section id="hero" className="min-h-screen flex items-center justify-center px-8 relative pt-24 sm:pt-0">
         <div className="absolute inset-0 bg-white dark:bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-16 items-center relative z-10">
          <motion.div className="md:col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
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
          </motion.div>
          <motion.div className="md:col-span-2 flex justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="relative">
              <div className="w-80 h-96 bg-slate-200 dark:bg-slate-800 relative overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                  alt="Professional Portrait of Kittisak Phanngeam"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/10 dark:bg-slate-950/20"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-slate-300 dark:bg-slate-700 opacity-50 rounded"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-slate-300 dark:border-slate-600 rounded"></div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown
              size={24}
              className="text-slate-500 dark:text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
              onClick={() => scrollToSection('about')}
            />
          </motion.div>
        </div>
      </section>
    ),
    about: (
      <motion.section id="about" className="py-24 px-8 bg-slate-50 dark:bg-slate-900/50" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
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
      </motion.section>
    ),
    skills: (
      <motion.section id="skills" className="py-24 px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
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
          <motion.div className="grid md:grid-cols-3 gap-8" variants={skillsContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            {Object.entries(expertise).map(([categoryKey, skillList]) => (
              <motion.div key={categoryKey} className="group" variants={skillItemVariants}>
                <div className="bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-8 h-full hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-300 rounded-lg">
                  <h3 className="text-lg font-medium mb-8 text-slate-900 dark:text-slate-50 uppercase tracking-wide">
                    {t(categoryKey)}
                  </h3>
                  <div className="space-y-4">
                    {skillList.map((skillKey) => (
                      <div key={skillKey} className="flex items-start space-x-4 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                        <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{t(skillKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    ),
    portfolio: (
      <motion.section id="portfolio" className="py-24 px-8 bg-slate-50 dark:bg-slate-900/30" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
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
              {sortedAndHighlightedProjects.map((project) => (
                  <ProjectCard 
                      key={project.id} 
                      project={project} 
                      isHighlighted={shouldHighlight(project)} 
                  />
              ))}
          </div>
        </div>
      </motion.section>
    ),
    blog: <BlogSection />,
    contact: (
      <motion.section id="contact" className="py-24 px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
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
            <a href="/Kittisak_Phanngeam_Resume.pdf" download="Kittisak_Phanngeam_Resume.pdf" className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-10 py-4 font-medium text-sm tracking-wide uppercase hover:border-slate-500 hover:text-slate-900 dark:hover:border-slate-500 dark:hover:text-slate-200 transition-all duration-300 flex items-center justify-center space-x-3 rounded-md">
              <FileText size={18} />
              <span>{t('nav.download_resume')}</span>
            </a>
          </div>
        </div>
      </motion.section>
    ),
  };

  return (
    <>
      <SEO title="Kittisak P. - Portfolio" description={t('hero.description')} />
      {sectionOrder.map(key => (
        <div key={key}>{sections[key]}</div>
      ))}
    </>
  );
};

export default HomePage;
