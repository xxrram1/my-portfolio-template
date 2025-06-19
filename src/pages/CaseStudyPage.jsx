import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '../data';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
// --- ส่วนที่แก้ไข: เพิ่ม FileText เข้ามาใน import ---
import { ArrowLeft, Clock, Users, Wrench, Target, UserSquare, ListChecks, Lightbulb, TrendingUp, Image as ImageIcon, Video, Figma, FileText } from 'lucide-react';

const icons = {
  problem: <Target className="w-8 h-8 text-indigo-400" />,
  role: <UserSquare className="w-8 h-8 text-indigo-400" />,
  process: <ListChecks className="w-8 h-8 text-indigo-400" />,
  solution: <Lightbulb className="w-8 h-8 text-indigo-400" />,
  results: <TrendingUp className="w-8 h-8 text-indigo-400" />,
  gallery: <ImageIcon className="w-8 h-8 text-indigo-400" />,
  video: <Video className="w-8 h-8 text-indigo-400" />,
  figma: <Figma className="w-8 h-8 text-indigo-400" />,
};

const SectionWrapper = ({ title, icon, children }) => (
  <motion.div 
    className="mb-16"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center gap-4 mb-6">
      {icon}
      <h3 className="text-3xl font-light text-slate-800 dark:text-slate-100">{title}</h3>
    </div>
    <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed pl-12 border-l-2 border-slate-200 dark:border-slate-700">
      {children}
    </div>
  </motion.div>
);

const ProcessStep = ({ number, text }) => (
  <div className="flex items-start gap-4 mb-4">
    <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <p className="pt-1">{text}</p>
  </div>
);

const EmbedWrapper = ({ src, title }) => (
  <div className="aspect-video w-full mt-4 not-prose">
    <iframe
      className="w-full h-full rounded-lg shadow-md border border-slate-200 dark:border-slate-700"
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

const CaseStudyPage = () => {
  const { projectSlug } = useParams();
  const { t } = useTranslation();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = projects.find(p => p.slug === projectSlug);
    setProject(foundProject);
    window.scrollTo(0, 0);
  }, [projectSlug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Project not found.</p>
      </div>
    );
  }

  const renderContentBlock = (block, index) => {
    const title = block.title || t(`case_study.${block.type}`);
    const icon = icons[block.type];

    switch (block.type) {
      case 'process':
        return (
          <SectionWrapper key={index} title={title} icon={icon}>
            {t(block.contentKey, { returnObjects: true }).map((step, i) => (
              <ProcessStep key={i} number={i + 1} text={step} />
            ))}
          </SectionWrapper>
        );
      case 'results':
        return (
          <SectionWrapper key={index} title={title} icon={icon}>
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-8 rounded-lg shadow-inner mt-4 not-prose">
              <blockquote className="text-2xl font-light text-indigo-600 dark:text-indigo-400 text-center italic border-none p-0 m-0">
                "{t(block.quoteKey)}"
              </blockquote>
            </div>
            <p className="mt-6">{t(block.contentKey)}</p>
          </SectionWrapper>
        );
      case 'gallery':
        return (
          <SectionWrapper key={index} title={t(block.titleKey)} icon={icon}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              {block.content.map((img, i) => (
                <img key={i} src={img} alt={`${t(project.titleKey)} - ${i + 1}`} className="rounded-lg shadow-md w-full h-auto object-cover"/>
              ))}
            </div>
          </SectionWrapper>
        );
      case 'video':
      case 'figma':
        return (
           <SectionWrapper key={index} title={title} icon={icon}>
            <EmbedWrapper src={block.url} title={title} />
           </SectionWrapper>
        );
      default:
        return (
          <SectionWrapper key={index} title={title} icon={icon}>
            <p className="whitespace-pre-line">{t(block.contentKey)}</p>
          </SectionWrapper>
        );
    }
  };

  return (
    <>
      <SEO 
        title={`${t(project.titleKey)} | Case Study`}
        description={t(project.descriptionKey)}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="pt-32 pb-16 px-8 bg-slate-50 dark:bg-slate-900/50">
           <div className="max-w-5xl mx-auto">
              <Link to="/#portfolio" className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-6 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-md">
                <ArrowLeft size={16} />
                {t('case_study.back_to_projects')}
              </Link>
              <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="flex-grow">
                     <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
                        {t(project.categoryKey)}
                     </p>
                     <h1 className="text-4xl md:text-6xl font-light text-slate-900 dark:text-slate-50 leading-tight">
                        {t(project.titleKey)}
                     </h1>
                  </div>
                  <div className="flex-shrink-0 pt-2">
                      <a 
                        href="/Kittisak_Phanngeam_Resume.pdf" 
                        download="Kittisak_Phanngeam_Resume.pdf" 
                        className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-indigo-700 transition-colors rounded-md shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
                      >
                          <FileText size={16} />
                          <span>{t('nav.download_resume')}</span>
                      </a>
                  </div>
              </div>
              <div className="mt-12 grid md:grid-cols-3 gap-x-8 gap-y-4 text-sm border-t border-slate-200 dark:border-slate-800 pt-8">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><Clock size={18} className="text-slate-400 flex-shrink-0"/> <div><strong>{t('modal.duration')}:</strong> {project.duration}</div></div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><Users size={18} className="text-slate-400 flex-shrink-0"/> <div><strong>{t('modal.team_size')}:</strong> {project.team}</div></div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><Wrench size={18} className="text-slate-400 flex-shrink-0"/> <div><strong>{t('modal.tech')}:</strong> {project.technologies.join(', ')}</div></div>
              </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto -mt-8 px-8 mb-20">
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src={project.thumbnail} alt={t(project.titleKey)} className="w-full aspect-video object-cover rounded-lg shadow-2xl"/>
        </div>
        <div className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            {project.contentBlocks.map(renderContentBlock)}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CaseStudyPage;
