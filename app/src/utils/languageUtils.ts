import { Language } from '../types/graphql'

export const languageToIso = {
  [Language.Norwegian]: 'no',
  [Language.English]: 'en'
}

export const languageIsoToLanguage: { [key: string]: Language } = {
  no: Language.Norwegian,
  en: Language.English
}

export const languageOptions = [{
  value: Language.Norwegian,
  text: 'Norsk'
}, {
  value: Language.English,
  text: 'English'
}]