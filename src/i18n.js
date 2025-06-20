import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// --- START: EDIT - นำเข้าไฟล์ภาษาโดยตรง ---
import enTranslation from '/public/locales/en/translation.json';
import thTranslation from '/public/locales/th/translation.json';
import zhTranslation from '/public/locales/zh/translation.json';
// --- END: EDIT ---

i18n
  // --- EDIT: ไม่ต้องใช้ HttpBackend แล้ว ---
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // --- START: EDIT - ตั้งค่า resources โดยตรง ---
    resources: {
      en: {
        translation: enTranslation,
      },
      th: {
        translation: thTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    // --- END: EDIT ---

    lng: 'th', // กำหนดภาษาเริ่มต้นเป็นไทยก่อน
    fallbackLng: 'en',
    
    supportedLngs: ['th', 'en', 'zh'],

    debug: true,

    interpolation: {
      escapeValue: false, 
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'cookie', 'htmlTag'],
      caches: ['localStorage'], 
    },

    react: {
      useSuspense: false, // ปิดการใช้งาน Suspense เนื่องจากเราโหลดข้อมูลมาโดยตรงแล้ว
    }
  });

export default i18n;