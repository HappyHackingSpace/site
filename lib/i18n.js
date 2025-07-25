import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enTranslations from '../public/locales/en/translation.json'
import trTranslations from '../public/locales/tr/translation.json'

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    debug: process.env.NODE_ENV === 'development',
    
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // Language resources
    resources: {
      en: {
        translation: enTranslations
      },
      tr: {
        translation: trTranslations
      }
    },

    // Language detection options
    detection: {
      // Order of language detection
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      
      // Keys or params to lookup language from
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      
      // Cache user language
      caches: ['localStorage', 'cookie'],
      
      // Optional expire and domain for set cookie
      cookieMinutes: 10080, // 7 days
    },

    // React options
    react: {
      useSuspense: false
    }
  })

export default i18n
