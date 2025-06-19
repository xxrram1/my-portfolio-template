import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useVisitor } from '../context/VisitorContext';
import { Briefcase, Code, UserCheck, Eye, X } from 'lucide-react';

const WelcomeModal = () => {
  const { t } = useTranslation();
  const { isModalOpen, setVisitorType, setIsModalOpen } = useVisitor();

  const roles = [
    { key: 'recruiter', icon: <UserCheck className="w-6 h-6 mx-auto mb-2" /> },
    { key: 'tech', icon: <Code className="w-6 h-6 mx-auto mb-2" /> },
    { key: 'client', icon: <Briefcase className="w-6 h-6 mx-auto mb-2" /> },
    { key: 'guest', icon: <Eye className="w-6 h-6 mx-auto mb-2" /> },
  ];

  const handleClose = () => {
     // ตั้งค่าเป็น default เมื่อผู้ใช้กดปิด
     setVisitorType('default');
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-lg shadow-2xl p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-full"
              aria-label={t('nav.close_menu')}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl md:text-3xl font-light text-slate-900 dark:text-white mb-4">
              {t('persona_modal.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              {t('persona_modal.subtitle')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {roles.map((role) => (
                <button
                  key={role.key}
                  onClick={() => setVisitorType(role.key)}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-center focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus:ring-offset-slate-900"
                >
                  {role.icon}
                  <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                    {t(`persona_modal.roles.${role.key}`)}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
