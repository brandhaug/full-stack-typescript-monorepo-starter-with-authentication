import { Language } from '@fstmswa/types'

export const languageToIso = {
  [Language.Norwegian]: 'no',
  [Language.English]: 'en'
}

export const languageIsoToLanguage: { [key: string]: Language } = {
  no: Language.Norwegian,
  en: Language.English
}
