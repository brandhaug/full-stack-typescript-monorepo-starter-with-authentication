import React from 'react'
import { Language } from '../types/graphql'

export const languageToIso = {
  [Language.Norwegian]: 'no',
  [Language.English]: 'en'
}

export const languageIsoToLanguage: { [key: string]: Language } = {
  no: Language.Norwegian,
  en: Language.English
}

const languageToIcon: { [key in Language]: JSX.Element } = {
  [Language.English]: <span className='fi fi-en' />,
  [Language.Norwegian]: <span className='fi fi-no' />
}

export const languageOptions = [{
  value: Language.Norwegian,
  text: 'Norsk',
  icon: languageToIcon[Language.Norwegian]
}, {
  value: Language.English,
  text: 'English',
  icon: languageToIcon[Language.English]
}]
