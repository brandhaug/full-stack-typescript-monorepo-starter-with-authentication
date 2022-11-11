import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import norwegianTranslations from '../assets/translations/no.json'
import englishTranslations from '../assets/translations/en.json'

console.log('nor', norwegianTranslations)

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'no'],
    fallbackLng: 'en',
    resources: {
      en: {
        translation: englishTranslations
      },
      no: {
        translation: norwegianTranslations
      }
    },
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
