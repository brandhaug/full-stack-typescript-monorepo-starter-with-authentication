import React from 'react'
import { useCurrentUser } from '../utils/currentUserUtils'
import { useDecodedAccessToken } from '../utils/authenticationUtils'
import { useTranslation } from 'react-i18next'

export const MainView = (): JSX.Element | null => {
  const { t } = useTranslation()
  const decodedAccessToken = useDecodedAccessToken()
  const currentUser = useCurrentUser()

  if ((!currentUser) || (!decodedAccessToken)) return null

  return (
    <div className='p-20'>
      <h1 className='text-2xl'>
        {t('Welcome')} {currentUser.email} ({currentUser.id})
      </h1>
      <p>Token expiration: {new Date(decodedAccessToken.exp * 1000).toISOString()}</p>
    </div>
  )
}
