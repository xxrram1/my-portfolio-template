import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useVisitor } from '../context/VisitorContext';
import { Eye } from 'lucide-react';

const ViewSwitcher = () => {
  const { t } = useTranslation();
  const { visitorType, openChangeViewModal, hasVisited } = useVisitor();

  // ไม่ต้องแสดงแถบนี้ถ้าผู้ใช้ยังไม่เคยเข้าเว็บ (Modal กำลังจะเปิด)
  if (!hasVisited || visitorType === 'default') {
    return null;
  }
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl px-4 py-2 flex items-center justify-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Eye size={16} className="text-indigo-500" />
              <span className="text-slate-600 dark:text-slate-300">{t('view_switcher.viewing_as')}:</span>
              <strong className="text-slate-900 dark:text-white">{t(`persona_modal.roles.${visitorType}`)}</strong>
            </div>
            <button 
              onClick={openChangeViewModal}
              className="hidden sm:inline-block ml-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-md"
            >
              {t('view_switcher.change_view')}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ViewSwitcher;
