import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle } from 'lucide-react';

const ContactModal = ({ onClose }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleOpenChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t('contact_modal.validation.nameRequired')),
    email: Yup.string()
      .email(t('contact_modal.validation.emailInvalid'))
      .required(t('contact_modal.validation.emailRequired')),
    message: Yup.string().required(t('contact_modal.validation.messageRequired')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setStatus('submitting');
      try {
        const response = await fetch('https://formspree.io/f/mjkronql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success(t('contact_modal.submission_success'));
          setStatus('success');
          resetForm();
          setTimeout(() => {
            onClose();
          }, 2500); // ปิด modal หลังจากแสดงหน้า success 2.5 วินาที
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        toast.error(t('contact_modal.submission_error'));
        setStatus('error');
        // กลับไปหน้าฟอร์มเพื่อให้ผู้ใช้ลองอีกครั้ง
        setTimeout(() => setStatus('idle'), 2000);
      }
    },
  });

  return (
    <Dialog.Root open onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        {/* --- START: EDIT FOR CENTERING --- */}
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                {/* --- END: EDIT FOR CENTERING --- */}
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center text-center p-8 h-96"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2}}
                      >
                        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-light text-slate-900 dark:text-white mb-2">
                        {t('contact_modal.success_title')}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400">
                        {t('contact_modal.success_message')}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={formik.handleSubmit} 
                      className="flex flex-col p-8"
                    >
                      <Dialog.Title className="text-2xl font-light text-slate-900 dark:text-white mb-2">
                        {t('contact_modal.title')}
                      </Dialog.Title>
                      <Dialog.Description className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                        {t('contact_modal.subtitle')}
                      </Dialog.Description>
                      
                      <div className="flex flex-col space-y-5">
                        {/* Name Input */}
                        <div className="flex flex-col space-y-1">
                          <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('contact_modal.name_label')}
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
                            placeholder={t('contact_modal.name_placeholder')}
                          />
                          {formik.touched.name && formik.errors.name && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
                          )}
                        </div>
                        {/* Email Input */}
                        <div className="flex flex-col space-y-1">
                          <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('contact_modal.email_label')}
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
                            placeholder={t('contact_modal.email_placeholder')}
                          />
                          {formik.touched.email && formik.errors.email && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                          )}
                        </div>
                        {/* Message Textarea */}
                        <div className="flex flex-col space-y-1">
                          <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('contact_modal.message_label')}
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.message}
                            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
                            placeholder={t('contact_modal.message_placeholder')}
                          />
                          {formik.touched.message && formik.errors.message && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="mt-8 w-full flex items-center justify-center rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                      >
                        {status === 'submitting' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {status === 'submitting' ? t('contact_modal.sending') : t('contact_modal.submit_button')}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                    aria-label={t('nav.close_menu')}
                  >
                    <X size={24} />
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </motion.div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ContactModal;
