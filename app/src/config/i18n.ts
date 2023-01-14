import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import norwegianTranslations from '../assets/translations/no.json'
import englishTranslations from '../assets/translations/en.json'

// https://www.i18next.com/overview/typescript#argument-of-type-defaulttfuncreturn-is-not-assignable-to-parameter-of-type-xyz
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

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
    debug: import.meta.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false
    },
    returnNull: false
  })

export default i18n
