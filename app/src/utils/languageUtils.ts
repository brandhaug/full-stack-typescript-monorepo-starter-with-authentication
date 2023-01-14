import { Language } from '@fstmswa/types'

export const languageToIso = {
  [Language.Norwegian]: 'no',
  [Language.English]: 'en'
}

export const languageIsoToLanguage: Record<string, Language> = {
  no: Language.Norwegian,
  en: Language.English
}
