import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // ใช้ HttpBackend เพื่อโหลดไฟล์ translation จาก server/public folder
  .use(HttpBackend)
  // **ใช้ LanguageDetector เพื่อตรวจจับและบันทึกภาษาที่ผู้ใช้เลือก**
  .use(LanguageDetector)
  // ส่ง i18n instance ไปให้ react-i18next
  .use(initReactI18next)
  .init({
    // --- ส่วนที่แก้ไข ---
    // ลบการกำหนดค่า lng: 'th' ออก เพื่อให้ LanguageDetector ทำงาน
    
    // กำหนดภาษาสำรอง (Fallback) หากไม่สามารถตรวจจับภาษาได้ หรือภาษาที่ตรวจจับได้ไม่มีในรายการ supportedLngs
    fallbackLng: 'en',
    
    // ภาษาที่รองรับในโปรเจกต์
    supportedLngs: ['th', 'en', 'zh'],

    // เปิด debug mode เพื่อดู log ใน console
    debug: true,

    interpolation: {
      escapeValue: false, // React ป้องกัน XSS อยู่แล้ว
    },
    
    // ตั้งค่าสำหรับ LanguageDetector
    detection: {
      // กำหนดลำดับการตรวจหาภาษา:
      // 1. localStorage: ผู้ใช้เคยเลือกภาษาไว้หรือไม่?
      // 2. navigator: ภาษาของเบราว์เซอร์คืออะไร?
      // 3. cookie: มีการเก็บภาษาไว้ในคุกกี้หรือไม่?
      order: ['localStorage', 'navigator', 'cookie', 'htmlTag'],
      
      // กำหนดว่าจะให้บันทึกภาษาที่ผู้ใช้เลือกด้วยตนเองลงที่ไหน
      caches: ['localStorage'], 
    },
    // -------------------

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    react: {
      useSuspense: true,
    }
  });

export default i18n;
