import i18n from '../config/i18n'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import { useCurrentUser } from '../utils/currentUserUtils'
import { languageToIso } from '../utils/languageUtils'

export const LanguageContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const currentUser = useCurrentUser()
  React.useEffect(() => {
    if (!currentUser) return

    i18n.changeLanguage(languageToIso[currentUser.language])
  }, [currentUser?.language])

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}