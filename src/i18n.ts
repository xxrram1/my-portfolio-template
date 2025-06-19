import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    // บังคับให้ภาษาเริ่มต้นเป็นภาษาไทยเสมอ
    lng: 'th', 
    
    // หากไม่เจอภาษาที่เลือก หรือไม่มีภาษานั้น ให้ใช้ภาษาไทยแทน
    fallbackLng: 'th', 

    // ภาษาที่รองรับ
    supportedLngs: ['th', 'en'], 

    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false, // React safes from xss
    },
  });

export default i18n;