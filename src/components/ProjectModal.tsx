import { ExternalLink, X } from 'lucide-react';
import React from 'react';
import { Project } from '../data.tsx';
import { useTranslation } from 'react-i18next';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t } = useTranslation();
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-slate-500 bg-white/50 dark:bg-black/50 rounded-full hover:text-slate-800 dark:hover:text-slate-200 p-2 transition-colors"
            aria-label="Close project details"
          >
            <X size={24} />
          </button>
          <img
            src={project.thumbnail}
            alt={t(project.titleKey)}
            className="w-full h-60 md:h-80 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-8 md:p-12">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-8">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
                {t(project.categoryKey)}
              </div>
              <h3 className="text-2xl font-light text-slate-900 dark:text-slate-50 mb-3">
                {t(project.titleKey)}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">{t(project.typeKey)}</p>
            </div>
            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex mt-4 sm:mt-0 items-center space-x-2 bg-slate-800 text-white px-6 py-3 text-sm font-medium tracking-wide uppercase hover:bg-slate-700 transition-colors rounded-md"
              >
                <ExternalLink size={16} />
                <span>{t('modal.view_project')}</span>
              </a>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
                {t('modal.duration')}
              </div>
              <div className="text-slate-700 dark:text-slate-300">{project.duration}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
                {t('modal.team_size')}
              </div>
              <div className="text-slate-700 dark:text-slate-300">{project.team}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
                {t('modal.tech')}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-3">
                {t('modal.overview')}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{t(project.descriptionKey)}</p>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-3">
                {t('modal.details')}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{t(project.detailsKey)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;